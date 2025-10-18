# 菲斯玛官网部署指南

## 部署方案选择

### 1. Vercel 部署（推荐 - 最简单）

**优势：**
- 自动CI/CD
- 全球CDN加速
- 免费SSL证书
- 零配置部署

**步骤：**
```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署
vercel --prod
```

**自定义域名配置：**
1. 在Vercel控制台添加域名
2. 配置DNS记录指向Vercel
3. 自动获取SSL证书

### 2. 阿里云/腾讯云服务器部署

**环境要求：**
- Ubuntu 20.04+ / CentOS 8+
- Node.js 18+
- Docker & Docker Compose
- Nginx

**部署步骤：**

```bash
# 1. 服务器环境准备
sudo apt update
sudo apt install -y docker.io docker-compose nginx

# 2. 克隆项目
git clone <your-repo-url>
cd 菲斯玛

# 3. 配置环境变量
cp .env.example .env
# 编辑.env文件，填入实际配置

# 4. Docker部署
chmod +x deploy.sh
./deploy.sh

# 5. 配置Nginx
sudo cp nginx.conf /etc/nginx/sites-available/viesmar
sudo ln -s /etc/nginx/sites-available/viesmar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. 静态导出部署

**适用场景：** CDN托管、对象存储

```bash
# 1. 修改next.config.js
echo "/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig" > next.config.js

# 2. 构建静态文件
npm run build

# 3. 上传out目录到CDN/对象存储
```

## 域名和SSL配置

### 域名注册建议
- **国内：** 阿里云、腾讯云、华为云
- **国外：** Namecheap、GoDaddy、Cloudflare

### SSL证书获取
```bash
# 使用Let's Encrypt免费证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d viesmar.com.cn -d www.viesmar.com.cn
```

## SEO优化部署

### 1. 搜索引擎提交
- **百度站长平台：** https://ziyuan.baidu.com/
- **Google Search Console：** https://search.google.com/search-console/
- **360站长平台：** http://zhanzhang.so.com/
- **搜狗站长平台：** http://zhanzhang.sogou.com/

### 2. 网站地图提交
```bash
# 网站地图地址
https://viesmar.com.cn/sitemap.xml
```

### 3. 百度收录加速
```bash
# 主动推送API（需要在百度站长平台获取token）
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=viesmar.com.cn&token=YOUR_TOKEN"
```

## 监控和维护

### 1. 性能监控
- **Google Analytics**
- **百度统计**
- **Vercel Analytics**

### 2. 错误监控
- **Sentry**
- **LogRocket**

### 3. 备份策略
```bash
# 定期备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec viesmar-app npm run build
tar -czf backup_$DATE.tar.gz out/
```

## 国内部署特殊要求

### ICP备案
1. 购买国内服务器
2. 准备备案材料
3. 提交ICP备案申请
4. 等待审核通过（通常7-20个工作日）

### 公安备案
1. ICP备案通过后30日内
2. 登录全国公安机关互联网站安全管理服务平台
3. 提交公安备案申请

## 部署检查清单

- [ ] 域名解析配置正确
- [ ] SSL证书安装成功
- [ ] 网站正常访问
- [ ] 移动端适配正常
- [ ] SEO标签完整
- [ ] 网站地图生成
- [ ] 搜索引擎提交
- [ ] 性能监控配置
- [ ] 备案完成（国内）

## 常见问题

### Q: 部署后网站无法访问
A: 检查域名解析、防火墙设置、Nginx配置

### Q: SSL证书错误
A: 确认证书路径正确，检查证书有效期

### Q: 网站加载慢
A: 启用CDN、优化图片、开启Gzip压缩

### Q: 搜索引擎不收录
A: 检查robots.txt、提交网站地图、优化SEO标签

## 技术支持

如需技术支持，请联系开发团队或查看项目文档。