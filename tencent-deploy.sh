#!/bin/bash

# 菲斯玛官网 - 腾讯云服务器部署脚本
# 使用方法: chmod +x tencent-deploy.sh && ./tencent-deploy.sh

set -e

echo "🚀 开始部署菲斯玛官网到腾讯云服务器..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_NAME="feisima"
PROJECT_DIR="/var/www/$PROJECT_NAME"
NGINX_CONF="/etc/nginx/sites-available/$PROJECT_NAME"
PM2_APP_NAME="feisima-website"

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "请使用root用户运行此脚本"
        exit 1
    fi
}

# 更新系统
update_system() {
    print_status "更新系统包..."
    apt update && apt upgrade -y
    print_success "系统更新完成"
}

# 安装Node.js
install_nodejs() {
    print_status "安装Node.js..."
    
    # 检查Node.js是否已安装
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_warning "Node.js已安装: $NODE_VERSION"
        
        # 检查版本是否满足要求 (需要 >= 18)
        if [[ $(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//') -lt 18 ]]; then
            print_status "升级Node.js到最新LTS版本..."
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            apt-get install -y nodejs
        fi
    else
        # 安装Node.js LTS
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        apt-get install -y nodejs
    fi
    
    # 验证安装
    node --version
    npm --version
    print_success "Node.js安装完成"
}

# 安装PM2
install_pm2() {
    print_status "安装PM2进程管理器..."
    npm install -g pm2
    pm2 --version
    print_success "PM2安装完成"
}

# 安装Nginx
install_nginx() {
    print_status "安装Nginx..."
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
    print_success "Nginx安装完成"
}

# 安装Git
install_git() {
    print_status "安装Git..."
    apt install -y git
    git --version
    print_success "Git安装完成"
}

# 创建项目目录
create_project_dir() {
    print_status "创建项目目录..."
    mkdir -p $PROJECT_DIR
    print_success "项目目录创建完成: $PROJECT_DIR"
}

# 配置防火墙
configure_firewall() {
    print_status "配置防火墙..."
    
    # 检查ufw是否安装
    if command -v ufw &> /dev/null; then
        ufw allow 22/tcp    # SSH
        ufw allow 80/tcp    # HTTP
        ufw allow 443/tcp   # HTTPS
        ufw allow 3000/tcp  # Next.js开发端口
        print_success "防火墙配置完成"
    else
        print_warning "UFW防火墙未安装，跳过防火墙配置"
    fi
}

# 创建Nginx配置
create_nginx_config() {
    print_status "创建Nginx配置..."
    
    cat > $NGINX_CONF << EOF
server {
    listen 80;
    server_name _;  # 临时配置，后续替换为实际域名
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # 反向代理到Next.js应用
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
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
EOF

    # 启用站点
    ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
    
    # 删除默认配置
    rm -f /etc/nginx/sites-enabled/default
    
    # 测试配置
    nginx -t
    systemctl reload nginx
    
    print_success "Nginx配置完成"
}

# 创建PM2生态系统文件
create_pm2_config() {
    print_status "创建PM2配置..."
    
    cat > $PROJECT_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$PM2_APP_NAME',
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
    error_file: '/var/log/pm2/$PM2_APP_NAME-error.log',
    out_file: '/var/log/pm2/$PM2_APP_NAME-out.log',
    log_file: '/var/log/pm2/$PM2_APP_NAME.log',
    time: true
  }]
};
EOF

    # 创建日志目录
    mkdir -p /var/log/pm2
    
    print_success "PM2配置完成"
}

# 显示部署信息
show_deployment_info() {
    print_success "🎉 服务器环境配置完成！"
    echo ""
    echo "📋 部署信息："
    echo "   项目目录: $PROJECT_DIR"
    echo "   Nginx配置: $NGINX_CONF"
    echo "   PM2应用名: $PM2_APP_NAME"
    echo ""
    echo "🚀 下一步操作："
    echo "   1. 上传菲斯玛项目代码到: $PROJECT_DIR"
    echo "   2. 在项目目录运行: npm install"
    echo "   3. 构建项目: npm run build"
    echo "   4. 启动应用: pm2 start ecosystem.config.js"
    echo ""
    echo "🌐 访问方式："
    echo "   HTTP: http://$(curl -s ifconfig.me)"
    echo "   本地: http://localhost"
    echo ""
    echo "📝 常用命令："
    echo "   查看PM2状态: pm2 status"
    echo "   查看应用日志: pm2 logs $PM2_APP_NAME"
    echo "   重启应用: pm2 restart $PM2_APP_NAME"
    echo "   查看Nginx状态: systemctl status nginx"
    echo ""
}

# 主函数
main() {
    print_status "开始配置腾讯云服务器环境..."
    
    check_root
    update_system
    install_git
    install_nodejs
    install_pm2
    install_nginx
    create_project_dir
    configure_firewall
    create_nginx_config
    create_pm2_config
    
    show_deployment_info
}

# 运行主函数
main "$@"