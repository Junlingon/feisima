# 🔒 菲斯玛网站安全检查清单
# Viesmar Website Security Checklist

## 📋 漏洞修复状态

### ✅ 已修复的漏洞
- [x] **Next.js版本升级** - 从14.0.0升级到14.2.15
- [x] **Docker镜像安全加固** - 添加安全限制和用户权限控制
- [x] **Nginx安全配置** - 添加安全头部和速率限制
- [x] **Redis安全配置** - 禁用危险命令，添加认证

### 🔧 需要在服务器上执行的修复

#### 1. 立即执行安全修复脚本
```bash
chmod +x security-fix.sh
sudo ./security-fix.sh
```

#### 2. 更新应用依赖
```bash
npm install
npm audit fix
```

#### 3. 使用安全加固版Docker配置
```bash
# 停止当前服务
docker-compose down

# 使用安全版本重新部署
docker-compose -f docker-compose.security.yml up -d
```

#### 4. 系统级安全检查

##### Redis安全检查
```bash
# 检查Redis版本
redis-server --version

# 检查Redis配置
redis-cli CONFIG GET "*"

# 如果发现Redis，立即执行：
sudo systemctl stop redis-server
sudo apt update && sudo apt install redis-server=7:7.0.*
```

##### 移除不必要的服务
```bash
# 检查并停止FlowiseAI
sudo systemctl status flowise
sudo systemctl stop flowise
sudo systemctl disable flowise

# 检查并停止Gitblit
sudo systemctl status gitblit
sudo systemctl stop gitblit
sudo systemctl disable gitblit

# 检查1Panel状态
sudo systemctl status 1panel
# 如果存在，更新到最新版本
```

##### GeoServer检查
```bash
# 检查是否安装了GeoServer
ps aux | grep geoserver
sudo systemctl status geoserver

# 如果存在，更新到最新版本或停止服务
```

#### 5. 防火墙配置
```bash
# 启用防火墙
sudo ufw enable

# 设置默认规则
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许必要端口
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 检查防火墙状态
sudo ufw status verbose
```

#### 6. SSL证书更新
```bash
# 检查证书有效期
openssl x509 -in /path/to/certificate.crt -text -noout

# 如果需要更新证书，使用Let's Encrypt
sudo certbot renew
```

## 🛡️ 持续安全监控

### 定期检查项目
- [ ] 每周检查依赖包更新：`npm audit`
- [ ] 每月更新系统包：`sudo apt update && sudo apt upgrade`
- [ ] 每季度检查SSL证书有效期
- [ ] 定期查看访问日志异常

### 监控命令
```bash
# 检查异常登录
sudo journalctl -u ssh -f

# 监控Nginx访问日志
sudo tail -f /var/log/nginx/access.log

# 检查系统资源使用
htop
```

## 🚨 紧急响应

如果发现入侵迹象：
1. 立即断开网络连接
2. 备份重要数据
3. 重新部署干净的系统
4. 更改所有密码和密钥

## 📞 联系信息
- 技术支持：[您的联系方式]
- 紧急响应：[紧急联系方式]