#!/bin/bash

# 菲斯玛网站安全漏洞修复脚本
# Security Fix Script for Viesmar Website

echo "🔒 开始安全漏洞修复..."

# 1. 更新系统包
echo "📦 更新系统包..."
sudo apt update && sudo apt upgrade -y

# 2. 检查并更新Redis
echo "🔧 检查Redis版本..."
if command -v redis-server &> /dev/null; then
    echo "发现Redis，正在更新..."
    sudo apt install redis-server=7:7.0.* -y
    
    # 配置Redis安全设置
    sudo tee -a /etc/redis/redis.conf << EOF

# 安全配置
bind 127.0.0.1
protected-mode yes
requirepass $(openssl rand -base64 32)
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command KEYS ""
rename-command CONFIG ""
rename-command SHUTDOWN SHUTDOWN_$(openssl rand -hex 8)
EOF
    
    sudo systemctl restart redis-server
    echo "✅ Redis安全配置完成"
fi

# 3. 检查并移除不必要的服务
echo "🧹 检查系统服务..."

# 检查并处理FlowiseAI
if systemctl is-active --quiet flowise; then
    echo "发现FlowiseAI服务，建议停止..."
    sudo systemctl stop flowise
    sudo systemctl disable flowise
fi

# 检查并处理Gitblit
if systemctl is-active --quiet gitblit; then
    echo "发现Gitblit服务，建议停止..."
    sudo systemctl stop gitblit
    sudo systemctl disable gitblit
fi

# 检查并处理1Panel
if systemctl is-active --quiet 1panel; then
    echo "发现1Panel服务，建议更新..."
    # 这里需要根据实际情况更新1Panel
fi

# 4. 更新Docker镜像
echo "🐳 更新Docker镜像..."
docker pull node:18-alpine
docker pull nginx:alpine
docker pull redis:7-alpine

# 5. 重建容器
echo "🔄 重建应用容器..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "✅ 安全修复完成！"
echo "📋 建议执行以下额外检查："
echo "   1. 检查防火墙配置"
echo "   2. 更新SSL证书"
echo "   3. 定期更新依赖包"