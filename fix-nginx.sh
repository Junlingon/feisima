#!/bin/bash

echo "=== 修复端口占用和 Nginx 配置 ==="

# 1. 查看端口80被什么占用
echo "检查端口80占用情况："
lsof -i :80
netstat -tlnp | grep :80

# 2. 强制杀掉占用端口80的进程
echo "强制释放端口80..."
fuser -k 80/tcp
pkill -f "nginx"
pkill -f "httpd"
pkill -f "apache"

# 3. 停止所有可能的web服务
systemctl stop nginx 2>/dev/null
systemctl stop httpd 2>/dev/null
systemctl stop apache2 2>/dev/null

# 4. 等待端口释放
sleep 3

# 5. 删除所有nginx配置文件
rm -f /etc/nginx/conf.d/*.conf
rm -f /etc/nginx/sites-enabled/default 2>/dev/null

# 6. 创建新的nginx配置
cat > /etc/nginx/conf.d/feisima.conf << 'EOF'
server {
    listen 80;
    server_name 43.136.88.79 _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# 7. 测试nginx配置
echo "测试nginx配置..."
nginx -t

if [ $? -eq 0 ]; then
    echo "配置文件正确，启动nginx..."
    systemctl start nginx
    systemctl enable nginx
    
    # 8. 检查状态
    echo "=== 服务状态 ==="
    systemctl status nginx --no-pager -l
    
    echo "=== 端口监听状态 ==="
    netstat -tlnp | grep -E ':(80|3000)'
    
    echo "=== 测试连接 ==="
    curl -I http://127.0.0.1:80
    
    echo "=== 配置完成！请访问 http://43.136.88.79 测试 ==="
else
    echo "nginx配置有错误，请检查！"
fi