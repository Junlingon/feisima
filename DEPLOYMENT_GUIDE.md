# 前端项目上线完整指南

## 📋 开发完成后的准备工作

### 1. 代码优化和配置
```bash
# 生产环境构建测试
npm run build

# 检查构建产物
ls -la .next/

# 本地生产环境测试
npm start
```

**配置检查清单：**
- [ ] 环境变量配置 (`.env.production`)
- [ ] API 接口地址切换到生产环境
- [ ] 静态资源 CDN 配置
- [ ] SEO 优化 (meta 标签、sitemap)
- [ ] 错误页面配置 (404, 500)

### 2. 质量保证
```bash
# 代码质量检查
npm run lint

# 类型检查 (如果使用 TypeScript)
npm run type-check

# 性能测试
npm run lighthouse
```

**测试清单：**
- [ ] 跨浏览器兼容性测试
- [ ] 移动端响应式测试
- [ ] 页面加载速度测试
- [ ] 功能完整性测试

### 3. 安全检查
```bash
# 依赖包安全扫描
npm audit

# 清理敏感信息
grep -r "password\|secret\|key" src/
```

**安全清单：**
- [ ] 移除调试代码和 console.log
- [ ] 清理 API 密钥和敏感信息
- [ ] 检查依赖包漏洞
- [ ] 配置 HTTPS 证书

## 🛒 服务器采购指南

### 1. 服务器配置选择

**小型项目 (个人/展示站):**
- CPU: 1-2 核
- 内存: 1-2GB
- 带宽: 1-3Mbps
- 存储: 20-40GB SSD

**中型项目 (企业官网):**
- CPU: 2-4 核  
- 内存: 4-8GB
- 带宽: 5-10Mbps
- 存储: 40-100GB SSD

**大型项目 (高并发应用):**
- CPU: 4-8 核
- 内存: 8-16GB
- 带宽: 10Mbps+
- 存储: 100GB+ SSD

### 2. 必要采购清单
- [ ] 云服务器实例 (阿里云/腾讯云/AWS)
- [ ] 域名注册 (.com/.cn/.net)
- [ ] SSL 证书 (Let's Encrypt 免费版)
- [ ] CDN 服务 (可选)

## 🚀 部署实施流程

### 1. 服务器环境搭建

```bash
# 连接服务器
ssh root@your-server-ip

# 更新系统
yum update -y  # CentOS/RHEL
# 或
apt update && apt upgrade -y  # Ubuntu/Debian

# 安装 Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# 安装 PM2
npm install -g pm2

# 安装 Nginx
yum install -y nginx
systemctl enable nginx

# 配置防火墙
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --reload
```

### 2. 项目部署

```bash
# 本地打包上传
npm run build
scp -r .next/ package*.json ecosystem.config.js root@server:/var/www/your-project/

# 服务器端操作
cd /var/www/your-project
npm ci --production

# 启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Nginx 反向代理配置

```nginx
# /etc/nginx/conf.d/your-project.conf
server {
    listen 80;
    server_name your-domain.com;

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
}
```

```bash
# 测试配置并重启
nginx -t
systemctl reload nginx
```

### 4. 域名解析配置

```bash
# DNS 记录配置
A 记录: your-domain.com → server-ip
CNAME 记录: www.your-domain.com → your-domain.com
```

### 5. SSL 证书配置

```bash
# 安装 Certbot
yum install -y certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
```

## 📊 监控和运维

### 1. 应用监控

```bash
# PM2 监控
pm2 monit
pm2 logs
pm2 status

# 系统资源监控
htop
df -h
free -m
```

### 2. 日志管理

```bash
# Nginx 日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 应用日志
pm2 logs your-app-name
```

### 3. 备份策略

```bash
# 数据库备份 (如果有)
mysqldump -u user -p database > backup.sql

# 代码备份
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/your-project

# 自动备份脚本
echo "0 2 * * * /path/to/backup-script.sh" | crontab -
```

## 🔧 常见问题解决

### 1. 端口占用
```bash
# 查看端口占用
netstat -tlnp | grep :80
lsof -i :3000

# 杀掉占用进程
kill -9 PID
```

### 2. Nginx 配置错误
```bash
# 测试配置
nginx -t

# 查看错误日志
tail -f /var/log/nginx/error.log
```

### 3. PM2 进程异常
```bash
# 重启应用
pm2 restart app-name

# 查看详细日志
pm2 logs app-name --lines 100
```

## 📝 面试要点总结

**技术栈掌握：**
- 前端构建工具 (Webpack/Vite)
- 服务器管理 (Linux 基础命令)
- 反向代理 (Nginx 配置)
- 进程管理 (PM2)
- 容器化 (Docker - 加分项)

**运维意识：**
- 监控告警机制
- 备份恢复策略  
- 安全防护措施
- 性能优化方案
- CI/CD 自动化部署

**回答模板：**
"前端项目上线需要经历代码优化、服务器采购、环境搭建、应用部署、域名配置、SSL 证书、监控运维等步骤。我会确保每个环节的质量和安全性，建立完善的监控体系，保证项目稳定运行。"

## 🎯 进阶优化

### 1. 性能优化
- CDN 静态资源加速
- Gzip 压缩配置
- 浏览器缓存策略
- 图片懒加载和压缩

### 2. 高可用架构
- 负载均衡配置
- 数据库主从复制
- Redis 缓存集群
- 容器编排 (K8s)

### 3. 自动化部署
- Git Hooks 自动部署
- Jenkins CI/CD 流水线
- Docker 容器化部署
- 蓝绿部署策略