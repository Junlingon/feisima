'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Award,
  Shield,
  Clock,
  Users
} from 'lucide-react'

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: '品牌介绍', href: '#about' },
    { name: '产品中心', href: '#products' },
    { name: '定制服务', href: '#services' },
    { name: '案例展示', href: '#cases' },
    { name: '联系我们', href: '#contact' }
  ]

  const productCategories = [
    { name: '不锈钢浴室柜', href: '#products' },
    { name: '木制浴室柜', href: '#products' },
    { name: '淋浴房定制', href: '#products' },
    { name: '智能镜柜', href: '#products' },
    { name: '浴室配件', href: '#products' }
  ]

  const services = [
    { name: '免费设计', href: '#services' },
    { name: '上门测量', href: '#services' },
    { name: '专业安装', href: '#services' },
    { name: '售后保修', href: '#services' },
    { name: '维护服务', href: '#services' }
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Instagram, name: 'Instagram', href: '#' },
    { icon: Linkedin, name: 'LinkedIn', href: '#' },
    { icon: Youtube, name: 'YouTube', href: '#' }
  ]

  const certifications = [
    { name: 'ISO9001质量认证', icon: Award },
    { name: '环保材料认证', icon: Shield },
    { name: '5年质保承诺', icon: Clock },
    { name: '10万+客户信赖', icon: Users }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* 主要内容区域 */}
      <div className="section-padding">
        <div className="container-custom">
          <motion.div
            ref={ref}
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* 品牌信息 */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">VIESMAR</div>
                    <div className="text-sm text-gray-400">菲斯玛</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  英国诺利尔集团旗下品牌，50+年专注高端卫浴定制，
                  以非凡的艺术沉淀和历久弥新的工艺品质，为您创造臻美舒适的家居生活空间。
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-gold-400" />
                    <span className="text-sm">400-888-8888</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-gold-400" />
                    <span className="text-sm">info@viesmar.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin size={16} className="text-gold-400 mt-1" />
                    <span className="text-sm">广州市番禺区市桥街繁华路1号友谊中心1808房D101</span>
                  </div>
                </div>
              </div>

              {/* 社交媒体 */}
              <div>
                <h4 className="text-lg font-semibold mb-4">关注我们</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 快速链接 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">快速导航</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-gold-400 transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 产品分类 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6">产品系列</h4>
              <ul className="space-y-3">
                {productCategories.map((category, index) => (
                  <motion.li
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <a
                      href={category.href}
                      className="text-gray-300 hover:text-gold-400 transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      <span>{category.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 服务支持 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-6">服务支持</h4>
              <ul className="space-y-3 mb-8">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-gold-400 transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      <span>{service.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* 资质认证 */}
              <div>
                <h5 className="text-sm font-semibold mb-4 text-gray-400">资质认证</h5>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      className="flex items-center space-x-2 text-xs text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    >
                      <cert.icon size={14} className="text-gold-400" />
                      <span>{cert.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 分隔线 */}
          <motion.div
            className="border-t border-gray-800 my-12"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* 底部信息 */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>© 2024 朗林环境科技(广州)有限公司. 保留所有权利.</p>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-gold-400 transition-colors duration-200">
                  隐私政策
                </a>
                <span>|</span>
                <a href="#" className="hover:text-gold-400 transition-colors duration-200">
                  服务条款
                </a>
                <span>|</span>
                <a href="#" className="hover:text-gold-400 transition-colors duration-200">
                  网站地图
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Globe size={16} />
                <span>粤ICP备xxxxxxxx号</span>
              </div>
              <span>|</span>
              <span>英国诺利尔集团旗下品牌</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 回到顶部按钮 */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gold-500 text-white rounded-full shadow-lg hover:bg-gold-600 transition-all duration-300 z-40 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* 浮动联系按钮 */}
      <motion.div
        className="fixed bottom-24 right-8 space-y-3 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        <motion.a
          href="tel:400-888-8888"
          className="block w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Phone size={20} />
        </motion.a>
        <motion.a
          href="mailto:info@viesmar.com"
          className="block w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mail size={20} />
        </motion.a>
      </motion.div>
    </footer>
  )
}

export default Footer