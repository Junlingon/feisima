'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart, Filter, Grid, List } from 'lucide-react'

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = [
    { id: 'all', name: '全部产品', count: 48 },
    { id: 'stainless', name: '不锈钢浴室柜', count: 24 },
    { id: 'wood', name: '木制浴室柜', count: 18 },
    { id: 'shower', name: '淋浴房', count: 6 }
  ]

  const products = [
    // 不锈钢浴室柜系列
    {
      id: 'VSMS-7423',
      name: 'VSMS-7423 现代简约浴室柜',
      category: 'stainless',
      price: '¥8,800 - ¥12,800',
      images: ['/images/stainless-1.jpg', '/images/stainless-1-2.jpg'],
      features: ['304不锈钢材质', '防水防潮', '现代简约设计', '多种尺寸可选'],
      description: '采用优质304不锈钢材质，表面经过精细拉丝处理，防水防潮性能卓越，适合现代简约风格浴室。'
    },
    {
      id: 'VSMS-8018',
      name: 'VSMS-8018 轻奢系列浴室柜',
      category: 'stainless',
      price: '¥10,800 - ¥15,800',
      images: ['/images/stainless-2.jpg', '/images/stainless-2-2.jpg'],
      features: ['316L不锈钢', '抗菌涂层', '轻奢设计', '智能收纳'],
      description: '316L医用级不锈钢打造，配备抗菌涂层，轻奢设计风格，智能收纳系统，提升使用体验。'
    },
    {
      id: 'VSMS-9020',
      name: 'VSMS-9020 大师系列浴室柜',
      category: 'stainless',
      price: '¥15,800 - ¥22,800',
      images: ['/images/stainless-3.jpg', '/images/stainless-3-2.jpg'],
      features: ['手工拉丝工艺', '大师级设计', '定制尺寸', '终身保修'],
      description: '大师级手工拉丝工艺，独特的设计美学，支持完全定制尺寸，提供终身保修服务。'
    },
    // 木制浴室柜系列
    {
      id: 'VSMW-15118',
      name: 'VSMW-15118 北欧风情浴室柜',
      category: 'wood',
      price: '¥6,800 - ¥9,800',
      images: ['/images/wood-1.jpg', '/images/wood-1-2.jpg'],
      features: ['进口橡木', '环保漆面', '北欧设计', '防水处理'],
      description: '精选进口橡木，环保水性漆面处理，北欧简约设计风格，经过专业防水处理工艺。'
    },
    {
      id: 'VSMW-17920',
      name: 'VSMW-17920 新中式浴室柜',
      category: 'wood',
      price: '¥9,800 - ¥14,800',
      images: ['/images/wood-2.jpg', '/images/wood-2-2.jpg'],
      features: ['胡桃木材质', '新中式设计', '榫卯工艺', '文化内涵'],
      description: '优质胡桃木材质，融合传统榫卯工艺与现代设计理念，体现深厚的文化内涵。'
    },
    {
      id: 'VSMW-20513',
      name: 'VSMW-20513 奢华定制浴室柜',
      category: 'wood',
      price: '¥18,800 - ¥28,800',
      images: ['/images/wood-3.jpg', '/images/wood-3-2.jpg'],
      features: ['红木材质', '手工雕刻', '奢华定制', '艺术收藏'],
      description: '珍贵红木材质，大师级手工雕刻工艺，奢华定制服务，具有艺术收藏价值。'
    },
    // 淋浴房系列
    {
      id: 'VSS-001',
      name: '一字型淋浴房',
      category: 'shower',
      price: '¥4,800 - ¥8,800',
      images: ['/images/shower-1.jpg', '/images/shower-1-2.jpg'],
      features: ['钢化玻璃', '304不锈钢框架', '防爆膜', '定制安装'],
      description: '8mm钢化玻璃配304不锈钢框架，贴防爆膜处理，专业测量定制安装。'
    },
    {
      id: 'VSS-002',
      name: '转角型淋浴房',
      category: 'shower',
      price: '¥6,800 - ¥12,800',
      images: ['/images/shower-2.jpg', '/images/shower-2-2.jpg'],
      features: ['无框设计', '静音滑轮', '防水胶条', '空间优化'],
      description: '无框简约设计，静音滑轮系统，优质防水胶条，最大化利用转角空间。'
    }
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const nextImage = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-custom">
        {/* 标题区域 */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4">
            产品中心
          </span>
          <h2 className="section-title">
            精工制造
            <span className="text-gradient block">品质之选</span>
          </h2>
          <p className="section-subtitle">
            专注高端浴室柜与淋浴房定制，每一件产品都承载着50+年的工艺传承与创新精神，
            为您的浴室空间带来无与伦比的品质体验。
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 mb-6 lg:mb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gold-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-600">视图模式:</span>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Grid size={18} className={viewMode === 'grid' ? 'text-gold-600' : 'text-gray-500'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <List size={18} className={viewMode === 'list' ? 'text-gold-600' : 'text-gray-500'} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 产品网格 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden card-hover group ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* 产品图片 */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'md:w-1/2' : 'aspect-[4/3]'
                }`}>
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-gold-600 font-bold text-lg">
                          {product.category === 'stainless' ? '钢' : 
                           product.category === 'wood' ? '木' : '浴'}
                        </span>
                      </div>
                      <p className="font-medium">{product.name}</p>
                    </div>
                  </div>
                  
                  {/* 悬停操作按钮 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <button className="p-3 bg-white rounded-full text-gray-700 hover:text-gold-600 transition-colors duration-200">
                        <Eye size={20} />
                      </button>
                      <button className="p-3 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors duration-200">
                        <Heart size={20} />
                      </button>
                      <button className="p-3 bg-white rounded-full text-gray-700 hover:text-gold-600 transition-colors duration-200">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>

                  {/* 产品标签 */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold-500 text-white text-xs font-medium rounded-full">
                      {product.category === 'stainless' ? '不锈钢系列' : 
                       product.category === 'wood' ? '木制系列' : '淋浴房系列'}
                    </span>
                  </div>
                </div>

                {/* 产品信息 */}
                <div className={`p-6 ${viewMode === 'list' ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* 产品特性 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{product.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 价格和操作 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gold-600">
                        {product.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        定制价格
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-gold-500 text-gold-600 rounded-lg hover:bg-gold-50 transition-colors duration-200">
                        了解详情
                      </button>
                      <button className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors duration-200">
                        立即定制
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 查看更多按钮 */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="btn-primary text-lg px-12 py-4">
            查看全部产品
          </button>
          <p className="text-gray-500 mt-4">
            更多精品等您发现，支持个性化定制服务
          </p>
        </motion.div>

        {/* 产品优势 */}
        <motion.div
          className="mt-20 bg-gray-50 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择菲斯玛？
            </h3>
            <p className="text-lg text-gray-600">
              50+年专业积淀，只为给您最好的产品体验
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '材质优选',
                description: '精选优质原材料，确保产品耐用性和安全性',
                icon: '🏆'
              },
              {
                title: '工艺精湛',
                description: '50+年工艺传承，每个细节都精益求精',
                icon: '⚡'
              },
              {
                title: '设计创新',
                description: '融合国际设计理念，满足现代家居需求',
                icon: '🎨'
              },
              {
                title: '服务完善',
                description: '从设计到安装，提供全程专业服务保障',
                icon: '🛡️'
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h4>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Products