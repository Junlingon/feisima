"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/reveal"

const seriesData: Record<string, {
  title: string
  description: string
  images: string[]
}> = {
  stainless: {
    title: "不锈钢浴室柜系列",
    description: "高品质304食品级不锈钢材质，防水防潮不变形，安全环保0甲醛，为现代浴室提供时尚实用的储物解决方案。",
    images: Array.from({ length: 11 }, (_, i) =>
      `/images/series/stainless/stainless-series-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  wood: {
    title: "实木浴室柜系列",
    description: "多层实木烤漆，环保板材，进口五金配件，品质油漆多道工序，为您的浴室增添温暖自然的氛围。",
    images: Array.from({ length: 15 }, (_, i) =>
      `/images/series/wood/wood-series-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  shower: {
    title: "不锈钢淋浴房系列",
    description: "304不锈钢型材，超白玻璃纯净透彻，极窄型材CNC高精密加工，精密窄刚磁条超精密滑轮。",
    images: Array.from({ length: 10 }, (_, i) =>
      `/images/series/shower/shower-series-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
}

interface SeriesPageProps {
  params: {
    category: string
  }
}

export default function SeriesPage({ params }: SeriesPageProps) {
  const data = seriesData[params.category]

  if (!data) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* 面包屑 + 返回 */}
      <div className="bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-100">
        <div className="container-custom py-4 lg:py-5">
          <div className="flex items-center justify-between">
            <nav className="flex items-center text-sm">
              <Link
                href="/"
                className="text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
              >
                首页
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-300 mx-2" />
              <span className="text-neutral-900 font-semibold">{data.title}</span>
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

      {/* 标题区 */}
      <section className="pt-16 lg:pt-24 pb-8 lg:pb-12">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                {data.title}
              </h1>
              <div className="w-24 h-1 bg-neutral-900 mx-auto mb-8" />
              <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed">
                {data.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 大图瀑布流 */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-4">
            {data.images.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className="relative w-full overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={`${data.title} - 展示图 ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    quality={90}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-20 lg:py-32 bg-neutral-900">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              了解更多产品详情
            </h2>
            <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
              我们的专业团队将为您提供一对一的产品咨询和定制方案服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/products/category/${params.category}`}
                className="bg-white text-neutral-900 px-10 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors text-lg"
              >
                查看全部产品
              </Link>
              <button className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg">
                400-123-4567
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
