'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MessageCircle, 
  Ruler, 
  Palette, 
  CheckCircle, 
  Wrench, 
  Shield,
  Clock,
  Users,
  Award,
  Headphones,
  Truck,
  Settings
} from 'lucide-react'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const processSteps = [
    {
      id: 1,
      icon: MessageCircle,
      title: '需求咨询',
      description: '专业顾问一对一沟通，了解您的具体需求和预算',
      details: ['免费上门咨询', '专业需求分析', '预算方案制定', '风格建议']
    },
    {
      id: 2,
      icon: Ruler,
      title: '精准测量',
      description: '专业技师上门测量，确保尺寸精准无误',
      details: ['3D激光测量', '现场勘察评估', '管道位置确认', '安装条件检查']
    },
    {
      id: 3,
      icon: Palette,
      title: '方案设计',
      description: '资深设计师量身定制，提供3D效果图展示',
      details: ['个性化设计', '3D效果图', '材质选择建议', '功能配置优化']
    },
    {
      id: 4,
      icon: CheckCircle,
      title: '方案确认',
      description: '详细沟通确认最终方案，签订定制合同',
      details: ['方案详细讲解', '价格透明公开', '合同条款明确', '交期时间确定']
    },
    {
      id: 5,
      icon: Settings,
      title: '精工制作',
      description: '工厂按图纸精工制作，严格质量把控',
      details: ['工厂直接生产', '质量严格把控', '进度实时跟踪', '出厂检验合格']
    },
    {
      id: 6,
      icon: Truck,
      title: '专业安装',
      description: '专业安装团队上门安装，确保完美呈现',
      details: ['专业安装团队', '现场保护措施', '安装质量检查', '使用指导培训']
    }
  ]

  const serviceFeatures = [
    {
      icon: Clock,
      title: '快速响应',
      description: '24小时内响应咨询，48小时内安排上门服务',
      highlight: '24H响应'
    },
    {
      icon: Users,
      title: '专业团队',
      description: '拥有10年以上经验的设计师和安装师傅',
      highlight: '10年+经验'
    },
    {
      icon: Award,
      title: '品质保证',
      description: '产品质量终身保修，安装工艺5年质保',
      highlight: '终身保修'
    },
    {
      icon: Headphones,
      title: '贴心服务',
      description: '专属客服跟进，定期回访维护服务',
      highlight: '专属服务'
    }
  ]

  const customizationOptions = [
    {
      category: '材质选择',
      options: [
        { name: '304不锈钢', description: '防腐耐用，易清洁' },
        { name: '316L不锈钢', description: '医用级材质，抗菌性强' },
        { name: '进口橡木', description: '天然纹理，环保健康' },
        { name: '胡桃木', description: '质感温润，档次高雅' }
      ]
    },
    {
      category: '风格设计',
      options: [
        { name: '现代简约', description: '线条简洁，功能实用' },
        { name: '北欧风情', description: '自然清新，温馨舒适' },
        { name: '新中式', description: '传统与现代的完美融合' },
        { name: '轻奢风格', description: '精致优雅，品质生活' }
      ]
    },
    {
      category: '功能配置',
      options: [
        { name: '智能镜柜', description: 'LED照明，防雾功能' },
        { name: '收纳系统', description: '分类收纳，空间优化' },
        { name: '台盆选择', description: '多种材质，个性定制' },
        { name: '五金配件', description: '进口品牌，品质保证' }
      ]
    }
  ]

  return (
    <section id="services" className="section-padding bg-gray-50">
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
            定制服务
          </span>
          <h2 className="section-title">
            专业定制
            <span className="text-gradient block">贴心服务</span>
          </h2>
          <p className="section-subtitle">
            从需求咨询到安装完成，我们提供全程专业服务，
            让每一位客户都能享受到量身定制的高品质浴室空间。
          </p>
        </motion.div>

        {/* 定制流程 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              定制流程
            </h3>
            <p className="text-lg text-gray-600">
              6步专业流程，确保每个细节都完美呈现
            </p>
          </div>

          <div className="relative">
            {/* 流程连接线 */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gold-200 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative bg-white p-8 rounded-2xl shadow-lg card-hover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  {/* 步骤编号 */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.id}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 服务特色 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              服务特色
            </h3>
            <p className="text-lg text-gray-600">
              专业、高效、贴心的全方位服务体验
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {feature.highlight}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 定制选项 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              定制选项
            </h3>
            <p className="text-lg text-gray-600">
              丰富的定制选项，满足您的个性化需求
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {customizationOptions.map((category, index) => (
              <motion.div
                key={category.category}
                className="bg-white p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
              >
                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {category.category}
                </h4>
                <div className="space-y-4">
                  {category.options.map((option, idx) => (
                    <div
                      key={option.name}
                      className="p-4 border border-gray-200 rounded-lg hover:border-gold-300 hover:bg-gold-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">
                          {option.name}
                        </h5>
                        <div className="w-4 h-4 border-2 border-gold-400 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA区域 */}
        <motion.div
          className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-3xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            开始您的定制之旅
          </h3>
          <p className="text-xl mb-8 opacity-90">
            专业团队为您提供一对一定制服务，让理想浴室成为现实
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-gold-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              免费咨询设计
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gold-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              预约上门测量
            </motion.button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>质量保证</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>按时交付</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones size={16} />
              <span>贴心服务</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services