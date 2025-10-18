# 菲斯玛官网 - 中国服务器部署指南

## 🇨🇳 方案二：阿里云/腾讯云部署

### 📋 部署准备清单

#### 1. 服务器购买
**推荐配置：**
- **CPU**: 2核
- **内存**: 4GB
- **带宽**: 5Mbps
- **存储**: 40GB SSD
- **操作系统**: Ubuntu 20.04 LTS

**价格参考：**
- 阿里云：约 200-300元/月
- 腾讯云：约 180-280元/月
- 华为云：约 190-290元/月

#### 2. 域名购买与备案
**域名建议：**
- `viesmar.com.cn` (55元/年)
- `viesmar.cn` (29元/年)

**备案流程：**
1. 在云服务商处购买域名
2. 申请ICP备案（15-30天）
3. 公安备案（备案后30天内）

### 🚀 服务器部署步骤

#### 步骤1: 连接服务器
```bash
# 使用SSH连接服务器
ssh root@your-server-ip
```

#### 步骤2: 安装基础环境
```bash
# 更新系统
apt update && apt upgrade -y

# 安装Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# 安装PM2（进程管理器）
npm install -g pm2

# 安装Nginx
apt install nginx -y

# 安装Git
apt install git -y
```

#### 步骤3: 部署网站代码
```bash
# 创建网站目录
mkdir -p /var/www/viesmar
cd /var/www/viesmar

# 克隆代码（需要先上传到Git仓库）
# git clone https://github.com/your-username/viesmar-website.git .

# 或者直接上传文件到服务器
# 可以使用scp命令或FTP工具上传

# 安装依赖
npm install

# 构建项目
npm run build

# 启动应用
pm2 start npm --name "viesmar" -- start
pm2 save
pm2 startup
```

#### 步骤4: 配置Nginx
```bash
# 创建Nginx配置文件
nano /etc/nginx/sites-available/viesmar
```

### 📁 上传代码到服务器

#### 方法1: 使用SCP上传
```bash
# 在本地执行（打包项目）
npm run build

# 压缩项目文件
tar -czf viesmar-website.tar.gz .

# 上传到服务器
scp viesmar-website.tar.gz root@your-server-ip:/var/www/

# 在服务器上解压
ssh root@your-server-ip
cd /var/www
tar -xzf viesmar-website.tar.gz -C viesmar/
```

#### 方法2: 使用Git仓库
1. 将代码推送到GitHub/Gitee
2. 在服务器上克隆仓库

### 🔧 自动部署脚本

我来为您创建一个完整的服务器部署脚本：