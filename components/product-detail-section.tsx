"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

interface Product {
  id: string
  name: string
  price: string
  originalPrice?: string
  category: string
  description: string
  longDescription: string
  features: string[]
  specifications: Record<string, string>
  images: string[]
  badge?: string
  materials: string[]
}

interface ProductDetailSectionProps {
  product: Product
}

// 分类名称到路径的映射
const getCategoryPath = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "淋浴房系列": "shower",
    "不锈钢浴室柜系列": "stainless", 
    "实木系列": "wood"
  }
  return categoryMap[category] || category
}

// 产品文案数据
const productCopywriting: Record<string, { title: string; subtitle: string; content: string }> = {
  "1": {
    title: "英伦经典",
    subtitle: "源自英国皇室工艺传承",
    content: `VIESMAR英伦淋浴房系列，承载着百年英伦工艺的精髓与现代设计美学的完美融合。每一件产品都经过匠心雕琢，将传统工艺与前沿科技相结合，为您打造极致的沐浴体验。

采用8mm安全钢化玻璃，通过国际3C认证，抗冲击性能是普通玻璃的5倍以上，为您的安全保驾护航。304不锈钢框架经过特殊防腐处理，历经岁月洗礼依然光亮如新。德国进口五金配件，开合顺滑静音，每一次推拉都是一种享受。

防水胶条采用进口硅胶材质，密封性能卓越，滴水不漏。支持尺寸定制，无论您的浴室空间大小，都能找到最适合的解决方案。英伦淋浴房，让每一次沐浴都成为一场优雅的仪式。`
  },
  "2": {
    title: "工业美学",
    subtitle: "金属质感的极致表达",
    content: `VIESMAR不锈钢浴室柜系列，以现代工业美学为设计灵感，将冷峻的金属质感与温暖的居家氛围完美融合。采用食品级304不锈钢材质，通过SGS国际认证，安全环保无甲醛，为您和家人的健康保驾护航。

一体成型工艺确保产品的整体性和耐用性，无缝隙设计杜绝藏污纳垢。搭配高品质陶瓷盆，釉面光滑细腻，易清洁不变色，历久弥新。多层收纳设计充分利用空间，静音导轨让开合无声，细节之处彰显品质。

防水LED镜前灯采用高显色指数光源，还原真实肤色，让您在最佳光线下开启美好的一天。不锈钢浴室柜，以金属的坚韧守护您的精致生活。`
  },
  "3": {
    title: "自然臻品",
    subtitle: "天然木纹的独特韵味",
    content: `VIESMAR实木浴室柜系列，精选北美进口橡木，每一块木材都经过严格筛选，只为呈现最纯粹的自然之美。天然木纹肌理，每一件都是独一无二的艺术品，为您的浴室空间注入温润的生命气息。

经过12道精湛工艺处理，包括烘干、防腐、防潮、打磨、上漆等，确保产品在潮湿环境中也能保持稳定，不变形、不开裂。环保清漆表面处理，保留木材天然质感的同时，提供卓越的防水防污性能。

德国进口铰链，承重力强，开合流畅。人造石台面，纹理细腻，触感温润。专业安装服务，让您安心无忧。实木浴室柜，将大自然的馈赠带入您的生活空间，感受木质带来的温暖与宁静。`
  }
}

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const [detailImageIndex, setDetailImageIndex] = useState(0)
  
  // 获取产品对应的文案
  const copywriting = productCopywriting[product.id] || {
    title: "匠心品质",
    subtitle: "精工细作的卓越之选",
    content: product.longDescription
  }

  // 自动轮播 - 顶部大图
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % product.images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [product.images.length])

  const nextHeroImage = () => {
    setHeroImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevHeroImage = () => {
    setHeroImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const nextDetailImage = () => {
    setDetailImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevDetailImage = () => {
    setDetailImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="pt-12 lg:pt-16">
      {/* 面包屑导航 */}
      <div className="bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-100">
        <div className="container-custom py-4 lg:py-5">
          {/* 移动端布局 */}
          <div className="flex flex-col gap-3 sm:hidden">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-all group w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">返回首页</span>
            </Link>
            <div className="text-sm font-semibold text-neutral-900 truncate">
              {product.name}
            </div>
          </div>
          
          {/* 桌面端布局 */}
          <div className="hidden sm:flex items-center justify-between">
            <nav className="flex items-center text-sm">
              <Link 
                href="/" 
                className="text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
              >
                首页
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-300 mx-2" />
              <Link 
                href={`/products/category/${getCategoryPath(product.category)}`} 
                className="text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-300 mx-2" />
              <span className="text-neutral-900 font-semibold">{product.name}</span>
            </nav>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">返回首页</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 第一部分：全宽轮播图 */}
      <section className="relative w-full h-[50vh] lg:h-[70vh] bg-neutral-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[heroImageIndex]}
              alt={`${product.name} - 展示图 ${heroImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* 轮播控制按钮 */}
        <button
          onClick={prevHeroImage}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all border border-white/30"
          aria-label="上一张图片"
        >
          <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </button>
        <button
          onClick={nextHeroImage}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all border border-white/30"
          aria-label="下一张图片"
        >
          <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </button>

        {/* 轮播指示器 */}
        <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === heroImageIndex 
                  ? "w-8 bg-white" 
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`切换到第 ${index + 1} 张图片`}
            />
          ))}
        </div>
      </section>

      {/* 第二部分：产品名称 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm lg:text-base text-neutral-500 uppercase tracking-[0.2em] mb-4 block">
              {product.category}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-6">
              {product.name}
            </h1>
            <div className="w-24 h-1 bg-neutral-900 mx-auto mb-8" />
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {product.description}
            </p>
            
            {/* 材质标签 */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {product.materials.map((material, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium"
                >
                  {material}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 第三部分：左文右图 */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 左侧：文字介绍 */}
            <motion.div 
              className="space-y-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-sm text-neutral-500 uppercase tracking-[0.15em] mb-3 block">
                  {copywriting.subtitle}
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-8">
                  {copywriting.title}
                </h2>
                <div className="prose prose-lg prose-neutral max-w-none">
                  {copywriting.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-neutral-600 leading-relaxed mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* 产品特点列表 */}
              <div className="pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">核心优势</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-neutral-900 rounded-full flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 右侧：轮播图 */}
            <motion.div
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={detailImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[detailImageIndex]}
                      alt={`${product.name} - 细节图 ${detailImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* 轮播控制 */}
                <button
                  onClick={prevDetailImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="上一张图片"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-700" />
                </button>
                <button
                  onClick={nextDetailImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="下一张图片"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-700" />
                </button>

                {/* 图片计数 */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {detailImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* 缩略图导航 */}
              <div className="flex justify-center gap-2 mt-6">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setDetailImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === detailImageIndex 
                        ? "border-neutral-900 shadow-lg scale-105" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`缩略图 ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-neutral-900 rounded-2xl -z-10 hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 规格参数 */}
      {/* <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12 lg:mb-16">
              <span className="text-sm text-neutral-500 uppercase tracking-[0.15em] mb-3 block">
                Specifications
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                规格参数
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <dl className="divide-y divide-neutral-200">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <motion.div 
                    key={key} 
                    className="flex flex-col sm:flex-row sm:justify-between py-5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <dt className="text-neutral-500 font-medium mb-1 sm:mb-0">{key}</dt>
                    <dd className="text-neutral-900 font-medium">{value}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* 联系咨询区域 */}
      <section className="py-20 lg:py-32 bg-neutral-900">
        <div className="container-custom">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-neutral-400 uppercase tracking-[0.15em] mb-4 block">
              Contact Us
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              预约专属服务
            </h2>
            <p className="text-lg lg:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
              我们的专业团队将为您提供一对一的产品咨询、空间测量及定制方案服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-neutral-900 px-10 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors text-lg">
                在线咨询
              </button>
              <button className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg">
                400-123-4567
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
