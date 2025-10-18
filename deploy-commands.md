# 菲斯玛官网 - 腾讯云部署指南

## 🚀 服务器信息
- **公网IP**: 43.136.88.79
- **内网IP**: 10.1.20.17

## 📋 部署步骤

### 第一步：SSH连接服务器
```bash
ssh root@43.136.88.79
```
如果提示输入密码，请输入您购买服务器时设置的密码。

### 第二步：创建部署脚本
连接成功后，在服务器上运行：

```bash
# 创建部署脚本
cat > tencent-deploy.sh << 'EOF'
#!/bin/bash

# 菲斯玛官网 - 腾讯云服务器部署脚本
set -e

echo "🚀 开始部署菲斯玛官网到腾讯云服务器..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# 更新系统
update_system() {
    print_status "更新系统包..."
    apt update && apt upgrade -y
    print_success "系统更新完成"
}

# 安装Node.js
install_nodejs() {
    print_status "安装Node.js..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_warning "Node.js已安装: $NODE_VERSION"
    else
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        apt-get install -y nodejs
    fi
    
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
    
    if command -v ufw &> /dev/null; then
        ufw --force enable
        ufw allow 22/tcp
        ufw allow 80/tcp
        ufw allow 443/tcp
        ufw allow 3000/tcp
        print_success "防火墙配置完成"
    else
        print_warning "UFW防火墙未安装，跳过防火墙配置"
    fi
}

# 创建Nginx配置
create_nginx_config() {
    print_status "创建Nginx配置..."
    
    cat > $NGINX_CONF << 'NGINXEOF'
server {
    listen 80;
    server_name 43.136.88.79 _;
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
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
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript;
}
NGINXEOF

    ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    nginx -t
    systemctl reload nginx
    
    print_success "Nginx配置完成"
}

# 创建PM2配置
create_pm2_config() {
    print_status "创建PM2配置..."
    
    cat > $PROJECT_DIR/ecosystem.config.js << 'PM2EOF'
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
      PORT: 3000
    }
  }]
};
PM2EOF

    print_success "PM2配置完成"
}

# 显示部署信息
show_deployment_info() {
    print_success "🎉 服务器环境配置完成！"
    echo ""
    echo "📋 部署信息："
    echo "   服务器IP: 43.136.88.79"
    echo "   项目目录: $PROJECT_DIR"
    echo "   PM2应用名: $PM2_APP_NAME"
    echo ""
    echo "🚀 下一步操作："
    echo "   1. 上传菲斯玛项目代码到: $PROJECT_DIR"
    echo "   2. 在项目目录运行: npm install"
    echo "   3. 构建项目: npm run build"
    echo "   4. 启动应用: pm2 start ecosystem.config.js"
    echo ""
    echo "🌐 访问方式："
    echo "   HTTP: http://43.136.88.79"
    echo ""
}

# 主函数
main() {
    print_status "开始配置腾讯云服务器环境..."
    
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

main "$@"
EOF

# 给脚本执行权限
chmod +x tencent-deploy.sh

# 运行脚本
./tencent-deploy.sh
```

### 第三步：上传项目代码
环境配置完成后，运行：

```bash
# 进入项目目录
cd /var/www/feisima

# 初始化Git仓库并添加项目文件
# 这里我们需要将本地的菲斯玛项目上传到服务器
```

## 🎯 下一步
请先SSH连接到服务器，然后运行上面的脚本！