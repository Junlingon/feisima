# Windows PowerShell Upload Script for Feisima Project
# Usage: powershell -ExecutionPolicy Bypass -File upload.ps1
# Server IP: 43.136.88.79

param(
    [switch]$Force  # 强制全量上传
)

$SERVER_IP = "43.136.88.79"
$SERVER_USER = "root"
$PROJECT_PATH = "/var/www/feisima"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Feisima Project Upload Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if OpenSSH is available
$hasSSH = Get-Command ssh -ErrorAction SilentlyContinue
if (-not $hasSSH) {
    Write-Host "[ERROR] OpenSSH not found." -ForegroundColor Red
    Write-Host "Please enable OpenSSH Client in Windows Settings > Apps > Optional Features" -ForegroundColor Yellow
    exit 1
}

# Check SSH connection
Write-Host "[1/4] Checking server connection..." -ForegroundColor Yellow
try {
    $result = ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" "echo OK" 2>&1
    if ($result -notmatch "OK") {
        throw "Connection failed"
    }
    Write-Host "  Server connection OK" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Cannot connect to server ${SERVER_IP}" -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Red
    Write-Host "  1. Server IP is correct" -ForegroundColor Red
    Write-Host "  2. SSH key is configured (ssh-copy-id)" -ForegroundColor Red
    Write-Host "  3. Firewall allows SSH (port 22)" -ForegroundColor Red
    exit 1
}

# Ensure remote directory exists
Write-Host "[2/4] Preparing remote directory..." -ForegroundColor Yellow
ssh "${SERVER_USER}@${SERVER_IP}" "mkdir -p ${PROJECT_PATH}"
Write-Host "  Remote directory ready" -ForegroundColor Green

# Build exclude patterns for tar
$excludePatterns = @(
    "node_modules",
    ".next",
    ".git",
    ".vercel",
    ".codebuddy",
    "deploy-temp",
    "temp",
    "*.log",
    ".env.local",
    ".DS_Store"
)

# Create tar archive locally, transfer, extract remotely
# This is much more reliable than scp -r and handles incremental-like behavior
Write-Host "[3/4] Packing and uploading project files..." -ForegroundColor Yellow

# Check if tar is available (Windows 10 1803+ has built-in tar)
$hasTar = Get-Command tar -ErrorAction SilentlyContinue
if ($hasTar) {
    Write-Host "  Using tar + ssh pipeline (fast & reliable)..." -ForegroundColor Gray
    
    # Build tar exclude arguments
    $tarExcludes = ($excludePatterns | ForEach-Object { "--exclude=`"$_`"" }) -join " "
    
    # Create tar archive, pipe through ssh, extract on server
    # This avoids the temp directory issue and is much faster
    $tarCmd = "tar cf - $tarExcludes -C `"$(Get-Location)`" ."
    $sshCmd = "ssh `"${SERVER_USER}@${SERVER_IP}`" `"cd ${PROJECT_PATH} && tar xf - --overwrite`""
    $fullCmd = "$tarCmd | $sshCmd"
    
    Write-Host "  Transferring files..." -ForegroundColor Gray
    $startTime = Get-Date
    
    # Execute the pipeline
    cmd /c "$tarCmd | $sshCmd" 2>&1
    
    $elapsed = (Get-Date) - $startTime
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Transfer completed in $([math]::Round($elapsed.TotalSeconds, 1))s" -ForegroundColor Green
    } else {
        Write-Host "  tar pipeline failed, falling back to scp method..." -ForegroundColor Yellow
        $hasTar = $null
    }
}

if (-not $hasTar) {
    Write-Host "  Using scp method (slower)..." -ForegroundColor Gray
    
    # Get all files recursively, excluding patterns
    $allItems = Get-ChildItem -Path "." -Recurse -Force -ErrorAction SilentlyContinue | Where-Object {
        $item = $_
        $relativePath = $item.FullName.Substring((Get-Location).Path.Length + 1)
        $shouldExclude = $false
        foreach ($pattern in $excludePatterns) {
            if ($relativePath -like "*$pattern*") {
                $shouldExclude = $true
                break
            }
        }
        -not $shouldExclude
    }
    
    # Upload directories first, then files
    $dirs = $allItems | Where-Object { $_.PSIsContainer } | Sort-Object FullName
    $files = $allItems | Where-Object { -not $_.PSIsContainer }
    
    # Create all directories on remote
    $dirPaths = $dirs | ForEach-Object {
        $_.FullName.Substring((Get-Location).Path.Length + 1).Replace("\", "/")
    }
    if ($dirPaths.Count -gt 0) {
        $mkdirCmd = ($dirPaths | ForEach-Object { "${PROJECT_PATH}/$_" }) -join " "
        ssh "${SERVER_USER}@${SERVER_IP}" "mkdir -p $mkdirCmd"
    }
    
    # Upload files using scp
    $totalFiles = $files.Count
    $uploaded = 0
    $failed = 0
    
    foreach ($file in $files) {
        $uploaded++
        $relativePath = $file.FullName.Substring((Get-Location).Path.Length + 1).Replace("\", "/")
        $remotePath = "${PROJECT_PATH}/${relativePath}"
        $percent = [math]::Round(($uploaded / $totalFiles) * 100)
        
        Write-Host "`r  [$percent%] Uploading: $relativePath" -ForegroundColor Gray -NoNewline
        
        scp -q "$($file.FullName)" "${SERVER_USER}@${SERVER_IP}:${remotePath}" 2>$null
        if ($LASTEXITCODE -ne 0) {
            $failed++
        }
    }
    Write-Host ""
    
    if ($failed -gt 0) {
        Write-Host "  Warning: $failed file(s) failed to upload" -ForegroundColor Yellow
    }
}

# Trigger rebuild on server
Write-Host "[4/4] Triggering rebuild on server..." -ForegroundColor Yellow
ssh "${SERVER_USER}@${SERVER_IP}" @"
cd ${PROJECT_PATH}
if [ -f /root/deploy-app.sh ]; then
    echo 'Found deploy script, executing...'
    bash /root/deploy-app.sh
else
    echo 'Installing dependencies...'
    npm install --production 2>&1 | tail -5
    echo 'Building project...'
    npm run build 2>&1 | tail -10
    echo 'Restarting service...'
    if command -v pm2 >/dev/null 2>&1; then
        pm2 restart feisima 2>/dev/null || pm2 start npm --name feisima -- start
    fi
fi
"@

if ($LASTEXITCODE -eq 0) {
    Write-Host "" 
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Upload & Deploy Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Visit: http://${SERVER_IP}" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[WARNING] Upload completed but deploy may have issues." -ForegroundColor Yellow
    Write-Host "Please SSH to server and check:" -ForegroundColor Yellow
    Write-Host "  ssh ${SERVER_USER}@${SERVER_IP}" -ForegroundColor White
    Write-Host "  cd ${PROJECT_PATH}" -ForegroundColor White
    Write-Host "  bash /root/deploy-app.sh" -ForegroundColor White
}
