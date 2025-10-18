#!/bin/bash

# 快速上传脚本 - 将项目上传到服务器
# 服务器IP: 43.136.88.79

SERVER_IP="43.136.88.79"
SERVER_USER="root"
PROJECT_PATH="/var/www/feisima"

echo "📤 准备上传菲斯玛项目到服务器..."

# 检查SSH连接
echo "🔍 检查服务器连接..."
if ! ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_IP "echo '连接成功'" 2>/dev/null; then
    echo "❌ 无法连接到服务器 $SERVER_IP"
    echo "请检查："
    echo "1. 服务器IP是否正确"
    echo "2. SSH服务是否启动"
    echo "3. 防火墙是否允许SSH连接"
    exit 1
fi

# 创建要排除的文件列表
cat > .upload-exclude << 'EOF'
node_modules/
.next/
.git/
.vercel/
.codebuddy/
*.log
.env.local
.DS_Store
EOF

echo "📦 开始上传项目文件..."

# 使用rsync上传文件（更高效）
if command -v rsync >/dev/null 2>&1; then
    echo "使用rsync上传..."
    rsync -avz --progress --exclude-from=.upload-exclude \
          ./ $SERVER_USER@$SERVER_IP:$PROJECT_PATH/
else
    echo "使用scp上传..."
    # 创建临时目录
    TEMP_DIR=$(mktemp -d)
    
    # 复制文件到临时目录（排除不需要的文件）
    rsync -av --exclude-from=.upload-exclude ./ $TEMP_DIR/
    
    # 上传到服务器
    scp -r $TEMP_DIR/* $SERVER_USER@$SERVER_IP:$PROJECT_PATH/
    
    # 清理临时目录
    rm -rf $TEMP_DIR
fi

# 清理排除文件列表
rm -f .upload-exclude

if [ $? -eq 0 ]; then
    echo "✅ 项目上传成功！"
    echo ""
    echo "📋 接下来请在服务器上执行："
    echo "   ssh $SERVER_USER@$SERVER_IP"
    echo "   /root/deploy-app.sh"
    echo ""
    echo "🌐 部署完成后访问: http://$SERVER_IP"
else
    echo "❌ 上传失败，请检查网络连接和权限"
    exit 1
fi