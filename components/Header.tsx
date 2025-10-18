'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '首页', href: '#home' },
    { name: '品牌介绍', href: '#about' },
    { name: '产品中心', href: '#products' },
    { name: '定制服务', href: '#services' },
    { name: '案例展示', href: '#cases' },
    { name: '联系我们', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* 顶部联系栏 */}


      {/* 主导航栏 */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 tracking-wide">VIESMAR</div>
                <div className="text-sm text-gold-600 font-medium tracking-widest">菲斯玛</div>
              </div>
            </motion.div>

            {/* 桌面导航 */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-gold-600 font-medium transition-colors duration-200 relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
            </nav>

            {/* CTA按钮 */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
              >
                免费咨询
              </motion.button>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
              >
                立即定制
              </motion.button>
            </div>

            {/* 移动端菜单按钮 */}
            <motion.button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-4">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-gray-700 hover:text-gold-600 font-medium py-2 border-b border-gray-100 last:border-b-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <div className="flex flex-col space-y-3 pt-4">
                    <button
                      className="btn-secondary w-full"
                      onClick={() => scrollToSection('#contact')}
                    >
                      免费咨询
                    </button>
                    <button
                      className="btn-primary w-full"
                      onClick={() => scrollToSection('#contact')}
                    >
                      立即定制
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Header