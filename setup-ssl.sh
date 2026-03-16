#!/bin/bash
# 为 viesmar.cn 申请 Let's Encrypt 免费 SSL 证书
# 使用前确保: 1) docker-compose 已运行  2) 域名已解析到服务器IP  3) 80端口可访问

set -e

DOMAIN="viesmar.cn"
EMAIL="913756523@qq.com"  

echo "=== 1. 创建必要目录 ==="
mkdir -p certbot/www ssl

echo "=== 2. 启动 Nginx（HTTP模式）==="
docker compose up -d nginx

echo "=== 3. 申请 SSL 证书 ==="
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

echo "=== 4. 复制证书到 ssl 目录 ==="
# Let's Encrypt 证书会保存在 ssl/live/$DOMAIN/ 下
cp ssl/live/$DOMAIN/fullchain.pem ssl/fullchain.pem
cp ssl/live/$DOMAIN/privkey.pem ssl/privkey.pem

echo "=== 5. 完成！==="
echo ""
echo "证书已申请成功。现在需要："
echo "1. 编辑 nginx.conf，取消 HTTPS server 块的注释"
echo "2. 将 HTTP server 的 location / 改为: return 301 https://\$server_name\$request_uri;"
echo "3. 运行: docker compose restart nginx"
echo ""
echo "证书有效期90天，续期命令："
echo "docker compose run --rm certbot renew && docker compose restart nginx"
