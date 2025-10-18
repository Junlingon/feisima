#!/bin/bash

# 菲斯玛官网服务器自动部署脚本
# 适用于 Ubuntu 20.04 LTS

echo "🚀 开始部署菲斯玛官网..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}请使用root用户运行此脚本${NC}"
    exit 1
fi

echo -e "${YELLOW}步骤1: 更新系统...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}步骤2: 安装Node.js 20...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

echo -e "${YELLOW}步骤3: 安装必要软件...${NC}"
apt install -y nginx git ufw

echo -e "${YELLOW}步骤4: 安装PM2进程管理器...${NC}"
npm install -g pm2

echo -e "${YELLOW}步骤5: 配置防火墙...${NC}"
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw --force enable

echo -e "${YELLOW}步骤6: 创建网站目录...${NC}"
mkdir -p /var/www/viesmar
chown -R www-data:www-data /var/www/viesmar

echo -e "${YELLOW}步骤7: 配置Nginx...${NC}"
cat > /etc/nginx/sites-available/viesmar << 'EOF'
server {
    listen 80;
    server_name viesmar.com.cn www.viesmar.com.cn;
    
    # 重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name viesmar.com.cn www.viesmar.com.cn;
    
    # SSL配置（需要申请证书后配置）
    # ssl_certificate /etc/ssl/certs/viesmar.crt;
    # ssl_certificate_key /etc/ssl/private/viesmar.key;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
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
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
}
EOF

# 启用网站配置
ln -sf /etc/nginx/sites-available/viesmar /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试Nginx配置
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Nginx配置成功${NC}"
    systemctl restart nginx
    systemctl enable nginx
else
    echo -e "${RED}Nginx配置错误${NC}"
    exit 1
fi

echo -e "${YELLOW}步骤8: 创建部署脚本...${NC}"
cat > /var/www/deploy-viesmar.sh << 'EOF'
#!/bin/bash

echo "🔄 开始部署菲斯玛网站..."

# 进入网站目录
cd /var/www/viesmar

# 备份当前版本
if [ -d "node_modules" ]; then
    echo "📦 备份当前版本..."
    cp -r . ../viesmar-backup-$(date +%Y%m%d-%H%M%S)
fi

# 安装依赖
echo "📥 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 重启应用
echo "🔄 重启应用..."
pm2 restart viesmar || pm2 start npm --name "viesmar" -- start

# 保存PM2配置
pm2 save

echo "✅ 部署完成！"
echo "🌐 网站地址: http://your-domain.com"
EOF

chmod +x /var/www/deploy-viesmar.sh

echo -e "${GREEN}✅ 服务器环境配置完成！${NC}"
echo -e "${YELLOW}接下来需要：${NC}"
echo "1. 上传网站代码到 /var/www/viesmar"
echo "2. 运行部署脚本: /var/www/deploy-viesmar.sh"
echo "3. 申请SSL证书并配置HTTPS"
echo "4. 配置域名解析"

echo -e "${GREEN}🎉 部署脚本执行完成！${NC}"