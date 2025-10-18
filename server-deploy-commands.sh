#!/bin/bash

# 菲斯玛网站服务器端部署命令
# 在腾讯云服务器 43.136.88.79 上执行

echo "🚀 开始在腾讯云服务器上部署菲斯玛网站..."

# 1. 更新系统并安装基础软件
echo "📦 更新系统并安装基础软件..."
apt update && apt upgrade -y
apt install -y curl wget git nginx ufw

# 2. 安装Node.js 18
echo "📦 安装Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# 3. 安装PM2进程管理器
echo "📦 安装PM2..."
npm install -g pm2

# 4. 配置防火墙
echo "🔒 配置防火墙..."
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable

# 5. 创建项目目录
echo "📁 创建项目目录..."
mkdir -p /var/www/feisima
chown -R www-data:www-data /var/www/feisima

# 6. 配置Nginx
echo "⚙️ 配置Nginx..."
cat > /etc/nginx/sites-available/feisima << 'EOF'
server {
    listen 80;
    server_name 43.136.88.79 _;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript;
    
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
    
    # 静态文件缓存
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # 图片缓存
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000";
    }
}
EOF

# 启用站点配置
ln -sf /etc/nginx/sites-available/feisima /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试并启动Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# 7. 创建PM2配置文件
echo "⚙️ 创建PM2配置..."
cat > /var/www/feisima/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'feisima',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/feisima',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# 8. 创建部署脚本
echo "📝 创建部署脚本..."
cat > /root/deploy.sh << 'EOF'
#!/bin/bash
echo "🔄 部署菲斯玛网站..."

cd /var/www/feisima

# 停止应用
pm2 stop feisima 2>/dev/null || true

# 安装依赖
echo "📥 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 启动应用
echo "🚀 启动应用..."
pm2 start ecosystem.config.js

# 保存PM2配置
pm2 save
pm2 startup

echo "✅ 部署完成！"
echo "🌐 访问地址: http://43.136.88.79"
EOF

chmod +x /root/deploy.sh

echo ""
echo "✅ 服务器环境配置完成！"
echo ""
echo "📋 接下来的步骤："
echo "1️⃣  上传项目代码到 /var/www/feisima/"
echo "2️⃣  运行部署脚本: /root/deploy.sh"
echo "3️⃣  访问网站: http://43.136.88.79"
echo ""
echo "🔧 常用命令："
echo "   查看应用状态: pm2 status"
echo "   查看日志: pm2 logs feisima"
echo "   重启应用: pm2 restart feisima"
echo ""