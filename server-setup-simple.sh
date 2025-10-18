#!/bin/bash

echo "🚀 开始配置菲斯玛官网服务器环境..."

# 更新系统
echo "📦 更新系统包..."
apt update && apt upgrade -y

# 安装Node.js
echo "📦 安装Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs

# 验证安装
echo "✅ Node.js版本: $(node --version)"
echo "✅ NPM版本: $(npm --version)"

# 安装PM2
echo "📦 安装PM2..."
npm install -g pm2

# 安装Nginx
echo "📦 安装Nginx..."
apt install -y nginx
systemctl enable nginx
systemctl start nginx

# 安装Git
echo "📦 安装Git..."
apt install -y git

# 创建项目目录
echo "📁 创建项目目录..."
mkdir -p /var/www/feisima
cd /var/www/feisima

# 配置Nginx
echo "⚙️ 配置Nginx..."
cat > /etc/nginx/sites-available/feisima << 'EOF'
server {
    listen 80;
    server_name 43.136.88.79 _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

# 启用站点
ln -sf /etc/nginx/sites-available/feisima /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试并重启Nginx
nginx -t && systemctl reload nginx

echo ""
echo "🎉 服务器环境配置完成！"
echo "📋 配置信息："
echo "   - Node.js: $(node --version)"
echo "   - NPM: $(npm --version)"
echo "   - PM2: 已安装"
echo "   - Nginx: 已配置"
echo "   - 项目目录: /var/www/feisima"
echo ""
echo "🚀 下一步：上传菲斯玛项目代码"
echo "   访问地址: http://43.136.88.79"
echo ""