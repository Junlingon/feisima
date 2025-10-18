# 菲斯玛官网 - 购买和部署完整指南

## 🛒 第一步：购买服务器和域名

### 🖥️ 服务器购买（三选一）

#### 1. 阿里云 ECS（推荐）
**配置推荐：**
- **实例规格**: ecs.t5-lc2m1.small (2核2GB)
- **带宽**: 5Mbps
- **存储**: 40GB ESSD云盘
- **地域**: 华东1（杭州）或华北2（北京）
- **操作系统**: Ubuntu 20.04 64位

**价格**: 约 200-300元/月
**购买链接**: https://ecs.console.aliyun.com

#### 2. 腾讯云 CVM
**配置推荐：**
- **实例类型**: 标准型S5 (2核4GB)
- **带宽**: 5Mbps
- **存储**: 50GB高性能云硬盘
- **地域**: 北京/上海/广州
- **操作系统**: Ubuntu Server 20.04 LTS 64位

**价格**: 约 180-280元/月
**购买链接**: https://console.cloud.tencent.com/cvm

#### 3. 华为云 ECS
**配置推荐：**
- **规格**: s6.large.2 (2核4GB)
- **带宽**: 5Mbps
- **存储**: 40GB高IO云硬盘
- **区域**: 华北-北京四/华东-上海一
- **操作系统**: Ubuntu 20.04 server 64bit

**价格**: 约 190-290元/月
**购买链接**: https://console.huaweicloud.com/ecm

### 🌐 域名购买

#### 推荐域名：
1. **viesmar.com.cn** - 55元/年 ⭐推荐
2. **viesmar.cn** - 29元/年
3. **viesmar.com** - 65元/年

#### 购买渠道：
- **阿里云万网**: https://wanwang.aliyun.com
- **腾讯云**: https://dnspod.cloud.tencent.com
- **华为云**: https://domain.huaweicloud.com

## 📋 第二步：备案申请

### ICP备案（必需）
**时间**: 15-30天
**费用**: 免费
**流程**:
1. 在云服务商控制台申请备案
2. 填写网站信息和企业资料
3. 上传证件照片
4. 等待审核通过

### 公安备案（备案后30天内）
**时间**: 5-10天
**费用**: 免费
**网址**: http://www.beian.gov.cn

## 🚀 第三步：部署网站

### 1. 连接服务器
```bash
# 使用SSH连接（替换为您的服务器IP）
ssh root@your-server-ip
```

### 2. 运行自动部署脚本
```bash
# 下载部署脚本
wget https://raw.githubusercontent.com/your-repo/viesmar/main/server-setup.sh

# 给脚本执行权限
chmod +x server-setup.sh

# 运行部署脚本
./server-setup.sh
```

### 3. 上传网站代码
```bash
# 方法1: 使用SCP上传
scp -r ./viesmar-website root@your-server-ip:/var/www/viesmar/

# 方法2: 使用Git
cd /var/www/viesmar
git clone https://github.com/your-username/viesmar-website.git .
```

### 4. 部署网站
```bash
# 运行部署脚本
/var/www/deploy-viesmar.sh
```

### 5. 配置SSL证书
```bash
# 运行SSL配置脚本（替换为您的域名）
./ssl-setup.sh viesmar.com.cn
```

## 💰 总成本预算

### 第一年费用：
- **服务器**: 2400-3600元/年
- **域名**: 29-65元/年
- **SSL证书**: 0元（Let's Encrypt免费）
- **备案**: 0元

**总计**: 约 2500-3700元/年

### 后续年费：
- **服务器续费**: 2400-3600元/年
- **域名续费**: 29-65元/年

## 📞 技术支持

### 遇到问题时：
1. **服务器问题**: 联系云服务商客服
2. **域名问题**: 联系域名注册商
3. **网站问题**: 查看部署日志
4. **备案问题**: 联系云服务商备案专员

## ✅ 部署检查清单

- [ ] 服务器购买完成
- [ ] 域名购买完成
- [ ] 域名解析配置
- [ ] 服务器环境部署
- [ ] 网站代码上传
- [ ] 网站部署成功
- [ ] SSL证书配置
- [ ] 备案申请提交
- [ ] 网站正常访问

## 🎯 上线后优化

### SEO提交：
1. **百度站长平台**: https://ziyuan.baidu.com
2. **Google Search Console**: https://search.google.com/search-console
3. **360站长平台**: https://zhanzhang.so.com
4. **搜狗站长平台**: https://zhanzhang.sogou.com

### 监控工具：
- **网站监控**: 阿里云云监控
- **性能分析**: Google Analytics
- **错误监控**: Sentry

## 🔧 维护建议

1. **定期备份**: 每周备份网站数据
2. **安全更新**: 及时更新系统补丁
3. **性能监控**: 关注网站访问速度
4. **内容更新**: 定期更新产品信息

---

**准备好开始了吗？** 按照这个指南，您的菲斯玛官网很快就能上线了！🚀