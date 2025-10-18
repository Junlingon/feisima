'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Globe, Factory, Users, Target, Heart, Zap, Shield } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: Award,
      title: '50+年工艺传承',
      description: '自1967年创立以来，始终坚持匠心工艺，传承英国制造精神'
    },
    {
      icon: Globe,
      title: '4个国际基地',
      description: '中国、英国、瑞士、波兰四地生产研发，全球化品质保障'
    },
    {
      icon: Factory,
      title: '专业制造',
      description: '专业从事住宅设备、建筑材料、卫浴产品的研发和生产'
    },
    {
      icon: Users,
      title: '定制专家',
      description: '提供整体家居的高端定制方案，满足个性化需求'
    }
  ]

  const values = [
    {
      icon: Target,
      title: '精准定制',
      description: '每一件产品都根据客户需求精心定制，确保完美契合'
    },
    {
      icon: Heart,
      title: '匠心工艺',
      description: '传承50+年工艺精髓，每个细节都体现匠人精神'
    },
    {
      icon: Zap,
      title: '科技创新',
      description: '运用先进科技，不断创新产品设计和制造工艺'
    },
    {
      icon: Shield,
      title: '品质保障',
      description: '严格的质量控制体系，为每位客户提供可靠保障'
    }
  ]

  const timeline = [
    {
      year: '1967',
      title: '品牌创立',
      description: '在英国伯明翰市创立，开始卫浴产品制造之路'
    },
    {
      year: '1980s',
      title: '工艺革新',
      description: '引入先进制造技术，建立现代化生产线'
    },
    {
      year: '2000s',
      title: '全球布局',
      description: '在瑞士、波兰建立生产基地，开启国际化进程'
    },
    {
      year: '2018',
      title: '进军中国',
      description: '在广州成立独资公司，专注中国市场高端定制'
    }
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
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
            关于菲斯玛
          </span>
          <h2 className="section-title">
            隐藏的美丽
            <span className="text-gradient block">历久弥新</span>
          </h2>
          <p className="section-subtitle">
            菲斯玛VIESMAR，英国诺利尔集团旗下品牌，50+年专注高端卫浴定制，
            以非凡的艺术沉淀和历久弥新的工艺品质，为您创造臻美舒适的家居生活空间。
          </p>
        </motion.div>

        {/* 品牌亮点 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 品牌故事 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              英国血统，全球品质
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                菲斯玛VIESMAR诞生于1967年的英国伯明翰，作为英国诺利尔（NOLLIR）集团旗下的高端卫浴品牌，
                我们传承了英国制造的严谨工艺和创新精神。
              </p>
              <p>
                经过50多年的发展，菲斯玛已在中国、英国、瑞士、波兰等地建立了4个现代化生产基地和研发中心，
                形成了完整的全球化产业布局。
              </p>
              <p>
                2018年，我们在中国广州成立独资公司，专业从事住宅设备、建筑材料、卫浴产品的研发和生产，
                致力于为中国消费者提供更贴合本土需求的高端定制解决方案。
              </p>
            </div>
            <motion.button
              className="btn-primary mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              了解更多
            </motion.button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Factory size={64} className="mx-auto mb-4" />
                  <p className="text-lg font-medium">品牌形象展示</p>
                  <p className="text-sm">现代化生产基地</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* 装饰元素 */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-500 rounded-full opacity-10"></div>
          </motion.div>
        </div>

        {/* 发展历程 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              发展历程
            </h3>
            <p className="text-lg text-gray-600">
              见证菲斯玛50+年的品牌发展之路
            </p>
          </div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-gold-600 mb-2">
                        {item.year}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* 时间点 */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gold-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 核心价值 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              核心价值
            </h3>
            <p className="text-lg text-gray-600">
              我们的承诺与坚持
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About