#!/bin/bash

# 菲斯玛官网 - 腾讯云一键部署脚本
# 使用方法: chmod +x quick-deploy.sh && ./quick-deploy.sh

set -e

echo "🚀 菲斯玛官网腾讯云一键部署开始..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置变量
PROJECT_NAME="feisima"
PROJECT_DIR="/var/www/$PROJECT_NAME"
DOMAIN="your-domain.com"  # 请替换为你的域名

print_step() {
    echo -e "\n${BLUE}==== $1 ====${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查系统
check_system() {
    print_step "检查系统环境"
    
    if [[ $EUID -ne 0 ]]; then
        print_error "请使用root用户运行此脚本"
        exit 1
    fi
    
    if ! command -v curl &> /dev/null; then
        apt update && apt install -y curl
    fi
    
    print_success "系统检查完成"
}

# 安装基础环境
install_environment() {
    print_step "安装基础环境"
    
    # 更新系统
    apt update && apt upgrade -y
    
    # 安装Node.js 18
    if ! command -v node &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        apt-get install -y nodejs
    fi
    
    # 安装其他必要软件
    apt install -y nginx git ufw zip unzip
    
    # 安装PM2
    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
    fi
    
    print_success "基础环境安装完成"
}

# 配置防火墙
setup_firewall() {
    print_step "配置防火墙"
    
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP  
    ufw allow 443/tcp   # HTTPS
    ufw --force enable
    
    print_success "防火墙配置完成"
}

# 创建项目目录
create_project() {
    print_step "创建项目目录"
    
    mkdir -p $PROJECT_DIR
    chown -R www-data:www-data $PROJECT_DIR
    
    print_success "项目目录创建完成: $PROJECT_DIR"
}

# 配置Nginx
setup_nginx() {
    print_step "配置Nginx"
    
    # 创建Nginx配置
    cat > /etc/nginx/sites-available/$PROJECT_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN _;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
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

    # 启用站点
    ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # 测试并重启Nginx
    nginx -t && systemctl restart nginx && systemctl enable nginx
    
    print_success "Nginx配置完成"
}

# 创建PM2配置
setup_pm2() {
    print_step "创建PM2配置"
    
    cat > $PROJECT_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$PROJECT_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$PROJECT_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/$PROJECT_NAME-error.log',
    out_file: '/var/log/pm2/$PROJECT_NAME-out.log',
    log_file: '/var/log/pm2/$PROJECT_NAME.log',
    time: true
  }]
};
EOF

    mkdir -p /var/log/pm2
    chown -R www-data:www-data /var/log/pm2
    
    print_success "PM2配置完成"
}

# 创建部署脚本
create_deploy_script() {
    print_step "创建部署脚本"
    
    cat > /root/deploy-feisima.sh << 'EOF'
#!/bin/bash

echo "🔄 开始部署菲斯玛网站..."

PROJECT_DIR="/var/www/feisima"
cd $PROJECT_DIR

# 停止应用
pm2 stop feisima 2>/dev/null || true

# 备份
if [ -d ".next" ]; then
    echo "📦 备份当前版本..."
    tar -czf ../backup-$(date +%Y%m%d-%H%M%S).tar.gz . 2>/dev/null || true
fi

# 安装依赖
echo "📥 安装依赖..."
npm install --production

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
echo "🌐 访问地址: http://$(curl -s ifconfig.me)"
EOF

    chmod +x /root/deploy-feisima.sh
    
    print_success "部署脚本创建完成"
}

# 显示完成信息
show_completion() {
    print_step "部署完成"
    
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "获取IP失败")
    
    echo -e "\n${GREEN}🎉 腾讯云服务器环境配置完成！${NC}\n"
    
    echo "📋 服务器信息："
    echo "   服务器IP: $SERVER_IP"
    echo "   项目目录: $PROJECT_DIR"
    echo "   Nginx配置: /etc/nginx/sites-available/$PROJECT_NAME"
    echo ""
    
    echo "🚀 接下来的步骤："
    echo "   1️⃣  上传项目代码到服务器："
    echo "      scp -r . root@$SERVER_IP:$PROJECT_DIR/"
    echo ""
    echo "   2️⃣  在服务器上运行部署脚本："
    echo "      /root/deploy-feisima.sh"
    echo ""
    echo "   3️⃣  访问网站："
    echo "      http://$SERVER_IP"
    echo ""
    
    echo "🔧 常用管理命令："
    echo "   查看应用状态: pm2 status"
    echo "   查看应用日志: pm2 logs $PROJECT_NAME"
    echo "   重启应用: pm2 restart $PROJECT_NAME"
    echo "   重新部署: /root/deploy-feisima.sh"
    echo ""
    
    echo "📝 域名配置（可选）："
    echo "   1. 在腾讯云控制台配置域名解析"
    echo "   2. 修改 /etc/nginx/sites-available/$PROJECT_NAME 中的 server_name"
    echo "   3. 重启Nginx: systemctl restart nginx"
    echo ""
}

# 主函数
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════╗"
    echo "║        菲斯玛官网腾讯云部署          ║"
    echo "║     VIESMAR Website Deployment       ║"
    echo "╚══════════════════════════════════════╝"
    echo -e "${NC}\n"
    
    check_system
    install_environment
    setup_firewall
    create_project
    setup_nginx
    setup_pm2
    create_deploy_script
    show_completion
}

# 执行主函数
main "$@"