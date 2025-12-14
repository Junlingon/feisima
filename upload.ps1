# Windows PowerShell Upload Script
# Server IP: 43.136.88.79

$SERVER_IP = "43.136.88.79"
$SERVER_USER = "root"
$PROJECT_PATH = "/var/www/feisima"

Write-Host "Preparing to upload Feisima project to server..." -ForegroundColor Green

# Check SSH connection
Write-Host "Checking server connection..." -ForegroundColor Yellow
$sshCommand = "ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_IP 'echo Connection_OK'"
$connectionTest = Invoke-Expression $sshCommand 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Cannot connect to server $SERVER_IP" -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Red
    Write-Host "1. Server IP is correct" -ForegroundColor Red
    Write-Host "2. SSH service is running" -ForegroundColor Red
    Write-Host "3. Firewall allows SSH connection" -ForegroundColor Red
    exit 1
}

Write-Host "Server connection successful" -ForegroundColor Green

# Check if OpenSSH is installed
$hasOpenSSH = Get-Command ssh -ErrorAction SilentlyContinue
if (-not $hasOpenSSH) {
    Write-Host "OpenSSH client not found, please install OpenSSH" -ForegroundColor Red
    Write-Host "Download from: https://github.com/PowerShell/Win32-OpenSSH/releases" -ForegroundColor Red
    exit 1
}

Write-Host "Starting project file upload..." -ForegroundColor Yellow

# Create temporary directory
$tempDir = Join-Path $env:TEMP "feisima-upload"
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files to temp directory (excluding unnecessary files)
$excludePatterns = @(
    "node_modules",
    ".next",
    ".git",
    ".vercel",
    ".codebuddy",
    "*.log",
    ".env.local",
    ".DS_Store"
)

Get-ChildItem -Path "." | ForEach-Object {
    $shouldExclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($_.Name -like $pattern) {
            $shouldExclude = $true
            break
        }
    }
    
    if (-not $shouldExclude) {
        Write-Host "Copying $($_.Name)..." -ForegroundColor Gray
        Copy-Item -Path $_.FullName -Destination $tempDir -Recurse -Force
    }
}

# Use SCP to upload to server
$scpCommand = "scp -r `"$tempDir\*`" ${SERVER_USER}@${SERVER_IP}:${PROJECT_PATH}/"
Write-Host "Executing upload command..." -ForegroundColor Gray
Invoke-Expression $scpCommand

# Clean up temp directory
Remove-Item -Path $tempDir -Recurse -Force

if ($LASTEXITCODE -eq 0) {
    Write-Host "Project upload successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next, please execute on the server:" -ForegroundColor Cyan
    Write-Host "   ssh $SERVER_USER@$SERVER_IP" -ForegroundColor White
    Write-Host "   /root/deploy-app.sh" -ForegroundColor White
    Write-Host ""
    Write-Host "After deployment, visit: http://$SERVER_IP" -ForegroundColor Cyan
} else {
    Write-Host "Upload failed, please check network connection and permissions" -ForegroundColor Red
    exit 1
}