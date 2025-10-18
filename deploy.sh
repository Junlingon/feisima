#!/bin/bash

# 菲斯玛VIESMAR官网部署脚本

set -e

echo "🚀 开始部署菲斯玛VIESMAR官网..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
PROJECT_NAME="viesmar-website"
DOMAIN="viesmar.com.cn"
BACKUP_DIR="/backup/viesmar"
LOG_FILE="/var/log/viesmar-deploy.log"

# 日志函数
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a $LOG_FILE
}

# 检查运行权限
check_permissions() {
    if [[ $EUID -ne 0 ]]; then
        error "此脚本需要root权限运行，请使用 sudo ./deploy.sh"
    fi
}

# 检查系统环境
check_environment() {
    log "检查系统环境..."
    
    # 检查Docker
    if ! command -v docker &> /dev/null; then
        error "Docker未安装，请先安装Docker"
    fi
    
    # 检查Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose未安装，请先安装Docker Compose"
    fi
    
    # 检查Nginx
    if ! command -v nginx &> /dev/null; then
        warning "Nginx未安装，将使用Docker中的Nginx"
    fi
    
    log "系统环境检查完成 ✅"
}

# 备份现有部署
backup_existing() {
    if [ -d "/opt/$PROJECT_NAME" ]; then
        log "备份现有部署..."
        mkdir -p $BACKUP_DIR
        cp -r /opt/$PROJECT_NAME $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S)
        log "备份完成 ✅"
    fi
}

# 部署应用
deploy_app() {
    log "开始部署应用..."
    
    # 创建项目目录
    mkdir -p /opt/$PROJECT_NAME
    cd /opt/$PROJECT_NAME
    
    # 如果是Git部署
    if [ "$1" = "git" ]; then
        log "从Git仓库拉取代码..."
        if [ -d ".git" ]; then
            git pull origin main
        else
            git clone $2 .
        fi
    fi
    
    # 构建和启动容器
    log "构建Docker镜像..."
    docker-compose build --no-cache
    
    log "启动服务..."
    docker-compose up -d
    
    log "应用部署完成 ✅"
}

# 配置SSL证书
setup_ssl() {
    log "配置SSL证书..."
    
    # 创建SSL目录
    mkdir -p /opt/$PROJECT_NAME/ssl
    
    # 如果使用Let's Encrypt
    if [ "$1" = "letsencrypt" ]; then
        log "使用Let's Encrypt获取SSL证书..."
        
        # 安装certbot
        if ! command -v certbot &> /dev/null; then
            apt update
            apt install -y certbot python3-certbot-nginx
        fi
        
        # 获取证书
        certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
        
        # 复制证书到项目目录
        cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /opt/$PROJECT_NAME/ssl/viesmar.crt
        cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /opt/$PROJECT_NAME/ssl/viesmar.key
        
        # 设置自动续期
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
        
    else
        warning "请手动配置SSL证书到 /opt/$PROJECT_NAME/ssl/ 目录"
        warning "需要文件: viesmar.crt 和 viesmar.key"
    fi
    
    log "SSL配置完成 ✅"
}

# 配置防火墙
setup_firewall() {
    log "配置防火墙..."
    
    # 启用UFW
    ufw --force enable
    
    # 允许SSH
    ufw allow ssh
    
    # 允许HTTP和HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # 显示状态
    ufw status
    
    log "防火墙配置完成 ✅"
}

# 性能优化
optimize_performance() {
    log "进行性能优化..."
    
    # 设置系统参数
    echo 'net.core.somaxconn = 65535' >> /etc/sysctl.conf
    echo 'net.ipv4.tcp_max_syn_backlog = 65535' >> /etc/sysctl.conf
    echo 'net.core.netdev_max_backlog = 32768' >> /etc/sysctl.conf
    
    # 应用设置
    sysctl -p
    
    log "性能优化完成 ✅"
}

# 设置监控
setup_monitoring() {
    log "设置监控..."
    
    # 创建监控脚本
    cat > /opt/$PROJECT_NAME/monitor.sh << 'EOF'
#!/bin/bash

# 检查服务状态
check_service() {
    if ! docker-compose ps | grep -q "Up"; then
        echo "$(date): 服务异常，尝试重启..." >> /var/log/viesmar-monitor.log
        docker-compose restart
    fi
}

# 检查磁盘空间
check_disk() {
    DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ $DISK_USAGE -gt 80 ]; then
        echo "$(date): 磁盘空间不足: ${DISK_USAGE}%" >> /var/log/viesmar-monitor.log
    fi
}

check_service
check_disk
EOF

    chmod +x /opt/$PROJECT_NAME/monitor.sh
    
    # 添加到crontab
    (crontab -l 2>/dev/null; echo "*/5 * * * * /opt/$PROJECT_NAME/monitor.sh") | crontab -
    
    log "监控设置完成 ✅"
}

# 健康检查
health_check() {
    log "进行健康检查..."
    
    # 等待服务启动
    sleep 30
    
    # 检查HTTP响应
    if curl -f -s http://localhost:3000 > /dev/null; then
        log "应用健康检查通过 ✅"
    else
        error "应用健康检查失败 ❌"
    fi
    
    # 检查HTTPS响应（如果配置了SSL）
    if [ -f "/opt/$PROJECT_NAME/ssl/viesmar.crt" ]; then
        if curl -f -s -k https://localhost > /dev/null; then
            log "HTTPS健康检查通过 ✅"
        else
            warning "HTTPS健康检查失败 ⚠️"
        fi
    fi
}

# 显示部署信息
show_info() {
    log "部署完成！"
    echo ""
    echo "=========================================="
    echo "🎉 菲斯玛VIESMAR官网部署成功！"
    echo "=========================================="
    echo "网站地址: https://$DOMAIN"
    echo "本地测试: http://localhost:3000"
    echo "项目目录: /opt/$PROJECT_NAME"
    echo "日志文件: $LOG_FILE"
    echo "监控日志: /var/log/viesmar-monitor.log"
    echo ""
    echo "常用命令:"
    echo "  查看服务状态: docker-compose ps"
    echo "  查看日志: docker-compose logs -f"
    echo "  重启服务: docker-compose restart"
    echo "  停止服务: docker-compose down"
    echo "=========================================="
}

# 主函数
main() {
    log "开始执行部署脚本..."
    
    check_permissions
    check_environment
    backup_existing
    
    # 根据参数选择部署方式
    case "$1" in
        "git")
            deploy_app "git" "$2"
            ;;
        "local")
            deploy_app "local"
            ;;
        *)
            deploy_app "local"
            ;;
    esac
    
    setup_ssl "$3"
    setup_firewall
    optimize_performance
    setup_monitoring
    health_check
    show_info
    
    log "部署脚本执行完成 🎉"
}

# 显示使用说明
usage() {
    echo "使用方法:"
    echo "  $0 [local|git] [git-url] [ssl-type]"
    echo ""
    echo "参数说明:"
    echo "  local     - 使用本地代码部署"
    echo "  git       - 从Git仓库部署，需要提供仓库URL"
    echo "  ssl-type  - SSL证书类型 (letsencrypt|manual)"
    echo ""
    echo "示例:"
    echo "  $0 local letsencrypt"
    echo "  $0 git https://github.com/user/viesmar-website.git letsencrypt"
}

# 检查参数
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    usage
    exit 0
fi

# 执行主函数
main "$@"