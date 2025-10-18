#!/bin/bash

# SSL证书自动申请脚本（使用Let's Encrypt）

echo "🔒 开始配置SSL证书..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 检查域名参数
if [ -z "$1" ]; then
    echo -e "${RED}请提供域名参数${NC}"
    echo "使用方法: ./ssl-setup.sh viesmar.com.cn"
    exit 1
fi

DOMAIN=$1

echo -e "${YELLOW}步骤1: 安装Certbot...${NC}"
apt update
apt install -y certbot python3-certbot-nginx

echo -e "${YELLOW}步骤2: 申请SSL证书...${NC}"
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL证书申请成功！${NC}"
    
    echo -e "${YELLOW}步骤3: 设置自动续期...${NC}"
    # 添加自动续期任务
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    echo -e "${GREEN}✅ SSL自动续期已配置${NC}"
    
    # 重启Nginx
    systemctl reload nginx
    
    echo -e "${GREEN}🎉 HTTPS配置完成！${NC}"
    echo -e "${GREEN}网站现在可以通过 https://$DOMAIN 访问${NC}"
else
    echo -e "${RED}❌ SSL证书申请失败${NC}"
    echo "请检查："
    echo "1. 域名是否已正确解析到服务器IP"
    echo "2. 防火墙是否开放80和443端口"
    echo "3. Nginx是否正常运行"
fi