# 菲斯玛VIESMAR品牌官网

## 项目简介

菲斯玛VIESMAR是英国诺利尔集团旗下的高端卫浴品牌，专业从事浴室柜和淋浴房定制。本项目是其官方品牌网站，采用现代化技术栈开发。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **部署**: Vercel / 阿里云 / 腾讯云

## 功能特性

### 🏠 首页展示
- 高端品牌形象展示
- 动态产品轮播
- 品牌理念传达

### 🏢 品牌介绍
- 50+年历史传承
- 4个国际生产基地
- 企业实力展示

### 🛁 产品中心
- 浴室柜系列（不锈钢/木制）
- 淋浴房系列（玻璃隔断/定制）
- 产品筛选和详情

### 🔧 定制服务
- 专业设计流程
- 个性化定制方案
- 完善售后服务

### 📸 案例展示
- 成功项目案例
- 效果对比展示
- 客户评价反馈

### 📞 联系我们
- 在线询价表单
- 多渠道联系方式
- 地理位置信息

## 开发环境

### 环境要求
- Node.js 18+ 
- npm 或 yarn
- Git

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd viesmar-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 部署方案

### 1. Vercel部署（推荐）

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署到Vercel
vercel

# 生产部署
vercel --prod
```

### 2. 阿里云/腾讯云部署

#### 服务器配置
- **CPU**: 2核心
- **内存**: 4GB
- **存储**: 40GB SSD
- **带宽**: 5Mbps
- **系统**: Ubuntu 20.04 LTS

#### 部署步骤

```bash
# 1. 服务器环境准备
sudo apt update
sudo apt install nginx nodejs npm git

# 2. 安装PM2
npm install -g pm2

# 3. 克隆项目
git clone <repository-url>
cd viesmar-website

# 4. 安装依赖并构建
npm install
npm run build

# 5. 启动应用
pm2 start npm --name "viesmar" -- start

# 6. 配置Nginx
sudo nano /etc/nginx/sites-available/viesmar
```

#### Nginx配置

```nginx
server {
    listen 80;
    server_name viesmar.com.cn www.viesmar.com.cn;

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

### 3. Docker部署

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## SEO优化

### 已实现的SEO功能
- ✅ 完整的meta标签
- ✅ 结构化数据标记
- ✅ 语义化HTML结构
- ✅ 图片alt属性
- ✅ 内部链接优化
- ✅ 移动端友好

### SEO检查清单
- [ ] 提交网站地图到搜索引擎
- [ ] 配置Google Analytics
- [ ] 设置百度统计
- [ ] 添加百度站长验证
- [ ] 配置robots.txt
- [ ] 设置301重定向

## 域名和SSL

### 推荐域名
- 主域名: `viesmar.com.cn`
- 备选: `feisima.cn`

### SSL证书
- 免费证书: Let's Encrypt
- 付费证书: 阿里云SSL证书

## 性能优化

### 已实现的优化
- ✅ Next.js自动代码分割
- ✅ 图片懒加载
- ✅ CSS压缩
- ✅ 静态资源缓存

### 进一步优化建议
- [ ] 配置CDN加速
- [ ] 启用Gzip压缩
- [ ] 优化图片格式（WebP）
- [ ] 配置浏览器缓存

## 监控和维护

### 推荐工具
- **性能监控**: Vercel Analytics / 阿里云监控
- **错误追踪**: Sentry
- **用户行为**: Google Analytics
- **SEO监控**: Google Search Console

## 备案和合规

### ICP备案
- 域名备案（必需）
- 网站备案（必需）
- 公安备案（推荐）

### 法律声明
- 隐私政策
- 使用条款
- 免责声明

## 联系方式

- **开发团队**: [您的联系方式]
- **技术支持**: [技术支持邮箱]
- **项目地址**: [Git仓库地址]

## 更新日志

### v1.0.0 (2024-10-17)
- ✅ 完成网站基础功能开发
- ✅ 实现响应式设计
- ✅ 完成SEO优化
- ✅ 准备部署配置

---

© 2024 菲斯玛VIESMAR. All rights reserved.