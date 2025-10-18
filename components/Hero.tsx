'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Award, Globe, Users, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const slides = [
    {
      id: 1,
      title: '隐藏的美丽',
      subtitle: '历久弥新',
      description: 'Hidden beauty always remains fresh over time',
      image: '/images/hero-1.jpg',
      cta: '探索产品'
    },
    {
      id: 2,
      title: '高端定制',
      subtitle: '臻美空间',
      description: '50+年工艺传承，打造专属浴室空间',
      image: '/images/hero-2.jpg',
      cta: '定制咨询'
    },
    {
      id: 3,
      title: '英国品质',
      subtitle: '全球信赖',
      description: '诺利尔集团旗下，4个国际生产基地',
      image: '/images/hero-3.jpg',
      cta: '了解品牌'
    }
  ]

  const stats = [
    { icon: Award, number: '50+', label: '年工艺传承' },
    { icon: Globe, number: '4', label: '国际生产基地' },
    { icon: Users, number: '10万+', label: '满意客户' },
    { icon: Sparkles, number: '100%', label: '定制服务' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* 背景轮播 */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%), url('/images/bathroom-luxury-${currentSlide + 1}.jpg')`
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧内容 */}
            <motion.div
              className="text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-gold-500 text-white text-sm font-medium rounded-full mb-4">
                      VIESMAR 菲斯玛
                    </span>
                    <h1 className="hero-text text-shadow mb-4">
                      {slides[currentSlide].title}
                      <span className="block text-gold-400">
                        {slides[currentSlide].subtitle}
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 text-shadow">
                      {slides[currentSlide].description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <motion.button
                      className="btn-primary text-lg px-10 py-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {slides[currentSlide].cta}
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center space-x-2 glass-effect text-white px-10 py-4 rounded-lg font-medium hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play size={20} />
                      <span>观看视频</span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 统计数据 */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center glass-effect p-4 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* 右侧产品展示 */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <motion.div
                  className="glass-effect p-8 rounded-2xl"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    精选产品系列
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-16 h-16 bg-gold-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">不锈钢</span>
                      </div>
                      <div className="text-white">
                        <div className="font-semibold">VSMS系列浴室柜</div>
                        <div className="text-sm text-gray-300">现代简约 · 防水耐用</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-16 h-16 bg-gold-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">木制</span>
                      </div>
                      <div className="text-white">
                        <div className="font-semibold">VSMW系列浴室柜</div>
                        <div className="text-sm text-gray-300">温馨自然 · 工艺精湛</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-16 h-16 bg-gold-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">淋浴房</span>
                      </div>
                      <div className="text-white">
                        <div className="font-semibold">玻璃淋浴隔断</div>
                        <div className="text-sm text-gray-300">通透明亮 · 定制安装</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 轮播控制 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 glass-effect text-white rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-gold-500' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 glass-effect text-white rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 视频弹窗 */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-300"
              >
                <X size={24} />
              </button>
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto mb-4 text-gold-500" />
                  <p className="text-xl">品牌宣传视频</p>
                  <p className="text-gray-400 mt-2">展示菲斯玛的工艺传承与产品魅力</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero