#!/bin/bash

# 上传安全修复文件到服务器
SERVER_IP="43.136.88.79"
SERVER_USER="root"

echo "🔒 上传安全修复文件到服务器..."

# 上传安全修复相关文件
scp security-fix.sh $SERVER_USER@$SERVER_IP:/tmp/
scp redis.conf $SERVER_USER@$SERVER_IP:/tmp/
scp security-hardening.conf $SERVER_USER@$SERVER_IP:/tmp/
scp SECURITY_CHECKLIST.md $SERVER_USER@$SERVER_IP:/tmp/

echo "✅ 安全文件上传完成！"
echo ""
echo "📋 接下来请执行："
echo "1. ./quick-upload.sh  # 上传应用代码"
echo "2. ssh root@43.136.88.79  # 登录服务器"
echo "3. chmod +x /tmp/security-fix.sh && /tmp/security-fix.sh  # 执行安全修复"
echo "4. cd /var/www/feisima && npm run build && pm2 restart feisima-website  # 重启应用"