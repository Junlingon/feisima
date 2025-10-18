#!/bin/bash

# 菲斯玛网站生产环境部署脚本
# 服务器IP: 43.136.88.79

echo "🚀 开始部署菲斯玛网站到生产服务器..."

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then 
    echo "❌ 请使用root用户运行此脚本"
    exit 1
fi

# 1. 更新系统并安装基础软件
echo "📦 更新系统并安装基础软件..."
apt update && apt upgrade -y
apt install -y curl wget git nginx ufw htop

# 2. 安装Node.js 18
echo "📦 安装Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# 验证安装
node --version
npm --version

# 3. 安装PM2进程管理器
echo "📦 安装PM2..."
npm install -g pm2

# 4. 配置防火墙
echo "🔒 配置防火墙..."
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP  
ufw allow 443/tcp   # HTTPS
ufw --force enable

# 5. 创建项目目录和用户
echo "📁 创建项目目录..."
useradd -m -s /bin/bash feisima || true
mkdir -p /var/www/feisima
chown -R feisima:feisima /var/www/feisima

# 6. 配置Nginx
echo "⚙️ 配置Nginx..."
cat > /etc/nginx/sites-available/feisima << 'EOF'
server {
    listen 80;
    server_name 43.136.88.79;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types 
        text/plain 
        text/css 
        text/xml 
        text/javascript 
        application/json
        application/javascript 
        application/xml+rss 
        application/atom+xml 
        image/svg+xml;
    
    # 主要代理配置
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
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Next.js静态文件优化
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # 图片和资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot|css|js)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # 网站地图和robots
    location ~ ^/(sitemap\.xml|robots\.txt)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# 启用站点配置
ln -sf /etc/nginx/sites-available/feisima /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试并启动Nginx
nginx -t
if [ $? -eq 0 ]; then
    systemctl restart nginx
    systemctl enable nginx
    echo "✅ Nginx配置成功"
else
    echo "❌ Nginx配置错误"
    exit 1
fi

# 7. 创建PM2配置文件
echo "⚙️ 创建PM2配置..."
cat > /var/www/feisima/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'feisima-website',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/feisima',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    error_file: '/var/log/feisima-error.log',
    out_file: '/var/log/feisima-out.log',
    log_file: '/var/log/feisima-combined.log'
  }]
};
EOF

# 8. 创建应用部署脚本
echo "📝 创建应用部署脚本..."
cat > /root/deploy-app.sh << 'EOF'
#!/bin/bash
echo "🔄 部署菲斯玛网站应用..."

cd /var/www/feisima

# 检查项目文件
if [ ! -f "package.json" ]; then
    echo "❌ 未找到package.json，请先上传项目代码"
    exit 1
fi

# 停止应用
echo "⏹️ 停止现有应用..."
pm2 stop feisima-website 2>/dev/null || true

# 安装依赖
echo "📥 安装依赖..."
npm ci --production

# 构建项目
echo "🔨 构建项目..."
npm run build

# 修改文件权限
chown -R feisima:feisima /var/www/feisima

# 启动应用
echo "🚀 启动应用..."
sudo -u feisima pm2 start ecosystem.config.js

# 保存PM2配置
sudo -u feisima pm2 save
pm2 startup systemd -u feisima --hp /home/feisima

echo "✅ 应用部署完成！"
echo "🌐 访问地址: http://43.136.88.79"
echo ""
echo "📊 检查状态:"
echo "   pm2 status"
echo "   pm2 logs feisima-website"
echo "   systemctl status nginx"
EOF

chmod +x /root/deploy-app.sh

# 9. 创建SSL证书安装脚本（可选）
echo "📝 创建SSL证书安装脚本..."
cat > /root/install-ssl.sh << 'EOF'
#!/bin/bash
echo "🔒 安装SSL证书..."

# 安装Certbot
apt install -y certbot python3-certbot-nginx

# 如果有域名，可以运行以下命令获取免费SSL证书
# certbot --nginx -d yourdomain.com

echo "💡 如果你有域名，请运行："
echo "   certbot --nginx -d yourdomain.com"
EOF

chmod +x /root/install-ssl.sh

# 10. 创建监控脚本
echo "📝 创建监控脚本..."
cat > /root/monitor.sh << 'EOF'
#!/bin/bash
echo "📊 菲斯玛网站运行状态"
echo "========================"
echo ""

echo "🌐 Nginx状态:"
systemctl is-active nginx
echo ""

echo "🚀 PM2应用状态:"
pm2 status
echo ""

echo "💾 系统资源:"
free -h
echo ""
df -h
echo ""

echo "🔗 网络连接测试:"
curl -I http://localhost:3000 2>/dev/null | head -1 || echo "应用未响应"
curl -I http://localhost 2>/dev/null | head -1 || echo "Nginx未响应"
EOF

chmod +x /root/monitor.sh

echo ""
echo "🎉 服务器环境配置完成！"
echo ""
echo "📋 接下来的步骤："
echo "1️⃣  上传项目代码到 /var/www/feisima/"
echo "    方法1: git clone <仓库地址> /var/www/feisima"
echo "    方法2: scp -r ./项目文件 root@43.136.88.79:/var/www/feisima/"
echo ""
echo "2️⃣  运行应用部署: /root/deploy-app.sh"
echo "3️⃣  访问网站: http://43.136.88.79"
echo ""
echo "🔧 常用命令："
echo "   应用状态: pm2 status"
echo "   查看日志: pm2 logs feisima-website"
echo "   重启应用: pm2 restart feisima-website"
echo "   系统监控: /root/monitor.sh"
echo "   SSL安装: /root/install-ssl.sh"
echo ""
echo "📁 重要目录："
echo "   项目目录: /var/www/feisima"
echo "   日志目录: /var/log/"
echo "   Nginx配置: /etc/nginx/sites-available/feisima"
echo ""