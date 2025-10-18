'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  User, 
  Star,
  Eye,
  Heart,
  Share2,
  Filter,
  Grid3X3,
  List
} from 'lucide-react'

const Cases = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedCase, setSelectedCase] = useState(null)
  const [viewMode, setViewMode] = useState('grid')

  const filterOptions = [
    { id: 'all', name: '全部案例', count: 12 },
    { id: 'modern', name: '现代简约', count: 5 },
    { id: 'luxury', name: '轻奢风格', count: 4 },
    { id: 'chinese', name: '新中式', count: 3 }
  ]

  const cases = [
    {
      id: 1,
      title: '上海浦东别墅浴室改造',
      category: 'luxury',
      location: '上海浦东新区',
      date: '2024年3月',
      client: '王先生',
      area: '25㎡',
      budget: '15-20万',
      rating: 5,
      description: '将传统浴室改造为现代轻奢风格，采用菲斯玛VSMS-8018系列不锈钢浴室柜配合定制淋浴房，营造出高端大气的浴室空间。',
      images: ['/images/case-1-1.jpg', '/images/case-1-2.jpg', '/images/case-1-3.jpg'],
      products: ['VSMS-8018浴室柜', '定制淋浴房', '智能镜柜'],
      highlights: ['316L不锈钢材质', '智能照明系统', '干湿分离设计', '收纳空间优化'],
      clientReview: '菲斯玛的产品质量和服务都超出了我的预期，安装师傅非常专业，整个过程很愉快。',
      beforeAfter: {
        before: '/images/case-1-before.jpg',
        after: '/images/case-1-after.jpg'
      }
    },
    {
      id: 2,
      title: '北京朝阳公寓现代简约设计',
      category: 'modern',
      location: '北京朝阳区',
      date: '2024年2月',
      client: '李女士',
      area: '12㎡',
      budget: '8-12万',
      rating: 5,
      description: '小户型浴室的现代简约设计，通过合理布局和菲斯玛木制浴室柜，实现了功能性与美观性的完美结合。',
      images: ['/images/case-2-1.jpg', '/images/case-2-2.jpg'],
      products: ['VSMW-15118浴室柜', '一字型淋浴房', '北欧风镜柜'],
      highlights: ['进口橡木材质', '空间优化设计', '环保水性漆', '多功能收纳'],
      clientReview: '设计师很用心，在有限的空间里做出了超出预期的效果，非常满意！',
      beforeAfter: {
        before: '/images/case-2-before.jpg',
        after: '/images/case-2-after.jpg'
      }
    },
    {
      id: 3,
      title: '广州天河新中式风格浴室',
      category: 'chinese',
      location: '广州天河区',
      date: '2024年1月',
      client: '陈先生',
      area: '18㎡',
      budget: '12-18万',
      rating: 5,
      description: '融合传统文化元素的新中式浴室设计，采用菲斯玛胡桃木浴室柜，展现东方美学的独特魅力。',
      images: ['/images/case-3-1.jpg', '/images/case-3-2.jpg', '/images/case-3-3.jpg'],
      products: ['VSMW-17920浴室柜', '转角型淋浴房', '中式镜柜'],
      highlights: ['胡桃木材质', '榫卯工艺', '文化内涵', '定制雕花'],
      clientReview: '完美诠释了新中式的韵味，工艺精湛，每个细节都很到位。',
      beforeAfter: {
        before: '/images/case-3-before.jpg',
        after: '/images/case-3-after.jpg'
      }
    },
    {
      id: 4,
      title: '深圳南山现代轻奢公寓',
      category: 'luxury',
      location: '深圳南山区',
      date: '2023年12月',
      client: '张女士',
      area: '20㎡',
      budget: '18-25万',
      rating: 5,
      description: '现代轻奢风格的浴室设计，采用菲斯玛高端不锈钢系列，打造精致优雅的私人空间。',
      images: ['/images/case-4-1.jpg', '/images/case-4-2.jpg'],
      products: ['VSMS-9020浴室柜', '豪华淋浴房', '智能镜柜系统'],
      highlights: ['大师级工艺', '智能化配置', '奢华材质', '个性定制'],
      clientReview: '品质超乎想象，每天使用都是一种享受，值得推荐！',
      beforeAfter: {
        before: '/images/case-4-before.jpg',
        after: '/images/case-4-after.jpg'
      }
    }
  ]

  const filteredCases = activeFilter === 'all' 
    ? cases 
    : cases.filter(caseItem => caseItem.category === activeFilter)

  const CaseModal = ({ case: caseData, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {caseData.title}
              </h3>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{caseData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{caseData.date}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">案例图片展示</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {caseData.images.map((_, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">项目详情</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">客户:</span>
                    <span>{caseData.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">面积:</span>
                    <span>{caseData.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">预算:</span>
                    <span>{caseData.budget}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">使用产品</h4>
                <div className="flex flex-wrap gap-2">
                  {caseData.products.map((product, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">项目亮点</h4>
                <div className="space-y-2">
                  {caseData.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">客户评价</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    {[...Array(caseData.rating)].map((_, idx) => (
                      <Star key={idx} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{caseData.clientReview}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section id="cases" className="section-padding bg-white">
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
            案例展示
          </span>
          <h2 className="section-title">
            精品案例
            <span className="text-gradient block">见证品质</span>
          </h2>
          <p className="section-subtitle">
            每一个成功案例都是我们专业实力的体现，
            从设计到安装，我们用心打造每一个完美的浴室空间。
          </p>
        </motion.div>

        {/* 筛选和视图控制 */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 mb-6 lg:mb-0">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === option.id
                    ? 'bg-gold-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.name}
                <span className="ml-2 text-sm opacity-75">({option.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-600">视图:</span>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Grid3X3 size={18} className={viewMode === 'grid' ? 'text-gold-600' : 'text-gray-500'} />
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

        {/* 案例网格 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
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
            {filteredCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden card-hover group cursor-pointer ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCase(caseItem)}
              >
                {/* 案例图片 */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'md:w-1/2' : 'aspect-[4/3]'
                }`}>
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-gold-600 font-bold text-lg">案例</span>
                      </div>
                      <p className="font-medium">{caseItem.title}</p>
                    </div>
                  </div>
                  
                  {/* 悬停操作 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <button className="p-3 bg-white rounded-full text-gray-700 hover:text-gold-600 transition-colors duration-200">
                        <Eye size={20} />
                      </button>
                      <button className="p-3 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors duration-200">
                        <Heart size={20} />
                      </button>
                      <button className="p-3 bg-white rounded-full text-gray-700 hover:text-blue-500 transition-colors duration-200">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* 案例标签 */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold-500 text-white text-xs font-medium rounded-full">
                      {filterOptions.find(f => f.id === caseItem.category)?.name}
                    </span>
                  </div>

                  {/* 评分 */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{caseItem.rating}</span>
                  </div>
                </div>

                {/* 案例信息 */}
                <div className={`p-6 ${viewMode === 'list' ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors duration-200">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {caseItem.description}
                    </p>
                  </div>

                  {/* 项目信息 */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <MapPin size={14} />
                      <span>{caseItem.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar size={14} />
                      <span>{caseItem.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <User size={14} />
                      <span>{caseItem.client}</span>
                    </div>
                    <div className="text-gold-600 font-semibold">
                      {caseItem.budget}
                    </div>
                  </div>

                  {/* 产品标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseItem.products.slice(0, 2).map((product, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {product}
                      </span>
                    ))}
                    {caseItem.products.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{caseItem.products.length - 2}
                      </span>
                    )}
                  </div>

                  {/* 查看详情按钮 */}
                  <button className="w-full py-2 border border-gold-500 text-gold-600 rounded-lg hover:bg-gold-50 transition-colors duration-200 font-medium">
                    查看详情
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 统计数据 */}
        <motion.div
          className="mt-20 bg-gray-50 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              客户满意度
            </h3>
            <p className="text-lg text-gray-600">
              用数据说话，用品质赢得信赖
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: '成功案例', icon: '🏆' },
              { number: '98%', label: '客户满意度', icon: '😊' },
              { number: '4.9', label: '平均评分', icon: '⭐' },
              { number: '95%', label: '推荐率', icon: '👍' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gold-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 查看更多按钮 */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button className="btn-primary text-lg px-12 py-4">
            查看更多案例
          </button>
          <p className="text-gray-500 mt-4">
            更多精彩案例等您发现，每一个都是品质的见证
          </p>
        </motion.div>
      </div>

      {/* 案例详情弹窗 */}
      <AnimatePresence>
        {selectedCase && (
          <CaseModal 
            case={selectedCase} 
            onClose={() => setSelectedCase(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Cases