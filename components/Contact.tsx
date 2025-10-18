'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  User,
  MessageSquare,
  Calendar,
  CheckCircle,
  Smartphone,
  Globe,
  Building
} from 'lucide-react'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    area: '',
    budget: '',
    message: '',
    appointmentDate: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const contactInfo = [
    {
      icon: Phone,
      title: '咨询热线',
      content: '400-888-8888',
      subContent: '7×24小时服务热线',
      color: 'text-green-600'
    },
    {
      icon: Smartphone,
      title: '微信咨询',
      content: 'VIESMAR-Official',
      subContent: '扫码添加客服微信',
      color: 'text-green-500'
    },
    {
      icon: Mail,
      title: '邮箱联系',
      content: 'info@viesmar.com',
      subContent: '工作日24小时内回复',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: '公司地址',
      content: '广州市番禺区市桥街繁华路1号',
      subContent: '友谊中心1808房D101',
      color: 'text-red-600'
    }
  ]

  const serviceOptions = [
    '浴室柜定制',
    '淋浴房定制',
    '整体浴室设计',
    '产品咨询',
    '售后服务',
    '其他需求'
  ]

  const budgetRanges = [
    '5万以下',
    '5-10万',
    '10-15万',
    '15-20万',
    '20万以上',
    '待定'
  ]

  const workingHours = [
    { day: '周一至周五', time: '9:00 - 18:00' },
    { day: '周六', time: '9:00 - 17:00' },
    { day: '周日', time: '10:00 - 16:00' },
    { day: '节假日', time: '预约服务' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        area: '',
        budget: '',
        message: '',
        appointmentDate: ''
      })
      
      // 3秒后重置成功状态
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 2000)
  }

  return (
    <section id="contact" className="section-padding bg-gray-50">
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
            联系我们
          </span>
          <h2 className="section-title">
            开启定制
            <span className="text-gradient block">专属服务</span>
          </h2>
          <p className="section-subtitle">
            专业团队随时为您服务，从咨询到安装，我们提供全程贴心支持，
            让您的浴室改造之旅轻松愉快。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* 左侧：联系表单 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  免费咨询预约
                </h3>
                <p className="text-gray-600">
                  填写您的需求信息，我们将在24小时内与您联系，为您提供专业的定制方案。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      手机号 *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                        placeholder="请输入您的手机号"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入您的邮箱地址"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      服务类型 *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">请选择服务类型</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      浴室面积
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                      placeholder="如：15㎡"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      预算范围
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">请选择预算范围</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      预约时间
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细需求
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="请详细描述您的需求，包括风格偏好、功能要求等..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    submitSuccess
                      ? 'bg-green-500 text-white'
                      : isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
                >
                  {submitSuccess ? (
                    <>
                      <CheckCircle size={20} />
                      <span>提交成功！</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5 border-2"></div>
                      <span>提交中...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>立即提交</span>
                    </>
                  )}
                </motion.button>

                <p className="text-sm text-gray-500 text-center">
                  提交后我们将在24小时内与您联系，您的信息将被严格保密
                </p>
              </form>
            </div>
          </motion.div>

          {/* 右侧：联系信息 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-8">
              {/* 联系方式 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  联系方式
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <div className={`p-3 rounded-full bg-gray-100 ${info.color}`}>
                        <info.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h4>
                        <p className="text-gray-700 font-medium">
                          {info.content}
                        </p>
                        <p className="text-sm text-gray-500">
                          {info.subContent}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 工作时间 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <Clock className="text-gold-600" size={24} />
                  <h3 className="text-2xl font-bold text-gray-900">
                    工作时间
                  </h3>
                </div>
                <div className="space-y-4">
                  {workingHours.map((schedule, index) => (
                    <motion.div
                      key={schedule.day}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    >
                      <span className="text-gray-700 font-medium">
                        {schedule.day}
                      </span>
                      <span className="text-gold-600 font-semibold">
                        {schedule.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gold-50 rounded-lg">
                  <p className="text-sm text-gold-700">
                    <strong>温馨提示：</strong>节假日期间可通过微信或邮箱预约服务，我们会尽快安排专业顾问与您联系。
                  </p>
                </div>
              </div>

              {/* 公司信息 */}
              <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-8 rounded-2xl text-white">
                <div className="flex items-center space-x-2 mb-6">
                  <Building className="text-white" size={24} />
                  <h3 className="text-2xl font-bold">
                    朗林环境科技(广州)有限公司
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe size={20} className="mt-1 opacity-80" />
                    <div>
                      <p className="font-medium">英国诺利尔集团旗下品牌</p>
                      <p className="text-sm opacity-80">50+年专业卫浴制造经验</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="mt-1 opacity-80" />
                    <div>
                      <p className="font-medium">广州市番禺区市桥街繁华路1号</p>
                      <p className="text-sm opacity-80">友谊中心1808房D101</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                  <p className="text-sm opacity-90">
                    专业从事住宅设备、建筑材料、卫浴产品的研发和生产，
                    为广大用户创造臻美舒适的家居生活空间。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 地图区域 */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              公司位置
            </h3>
            <div className="aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="text-lg font-medium">地图位置展示</p>
                <p className="text-sm">广州市番禺区市桥街繁华路1号友谊中心1808房D101</p>
                <p className="text-sm mt-2">交通便利，欢迎莅临参观</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact