"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SimpleProductCard } from "@/components/simple-product-card"
import { Reveal } from "@/components/reveal"

// 产品数据
const productsByCategory = {
  "shower": {
    title: "淋浴房系列",
    description: "探索我们精选的淋浴房系列，从简约现代到经典英伦风格，每一件都体现了精湛工艺和卓越品质。",
    products: [
      {
        id: "1",
        name: "VIESMAR 英伦淋浴房",
        image: "/images/products/shower/shower-15.webp",
        badge: "New" as const,
      },
      {
        id: "4",
        name: "VIESMAR 简约淋浴房",
        image: "/images/products/shower/shower-16.webp",
        badge: "Hot" as const,
      },
      {
        id: "7",
        name: "VIESMAT 推拉淋浴房",
        image: "/images/products/shower/shower-17.webp",
        badge: "Limited" as const,
      },
      {
        id: "10",
        name: "VIESMAR 智能淋浴房",
        image: "/images/products/shower/shower-10.webp",
        badge: "New" as const,
      },
      {
        id: "13",
        name: "VIESMAR 方形淋浴房",
        image: "/images/products/shower/shower-11.webp",
        badge: "Hot" as const,
      },
      {
        id: "16",
        name: "VIESMAR 弧形淋浴房",
        image: "/images/products/shower/shower-12.webp",
        badge: "New" as const,
      },
    ]
  },
  "stainless": {
    title: "不锈钢浴室柜系列",
    description: "高品质304不锈钢材质，防水防潮，经久耐用，为现代浴室提供时尚实用的储物解决方案。",
    products: [
      {
        id: "2",
        name: "VIESMAR 不锈钢浴室柜",
        image: "/images/products/stainless/stainless-00.webp",
        badge: "Hot" as const,
      },
      {
        id: "5",
        name: "VIESMAR 不锈钢镜柜",
        image: "/images/products/stainless/stainless-01.webp",
        badge: "New" as const,
      },
      {
        id: "8",
        name: "VIESMAR 不锈钢洗手台",
        image: "/images/products/stainless/stainless-02.webp",
        badge: "Limited" as const,
      },
      {
        id: "11",
        name: "VIESMAR 不锈钢吊柜",
        image: "/images/products/stainless/stainless-00.webp",
        badge: "Hot" as const,
      },
      {
        id: "14",
        name: "VIESMAR 不锈钢置物架",
        image: "/images/products/stainless/stainless-01.webp",
        badge: "New" as const,
      },
      {
        id: "17",
        name: "VIESMAR 不锈钢毛巾架",
        image: "/images/products/stainless/stainless-02.webp",
        badge: "Hot" as const,
      },
    ]
  },
  "wood": {
    title: "实木浴室柜系列",
    description: "精选进口实木材质，天然木纹质感，为您的浴室增添温暖自然的氛围。",
    products: [
      {
        id: "3",
        name: "VIESMAR 实木浴室柜",
        image: "/images/products/shower/shower-10.webp",
        badge: "Limited" as const,
      },
      {
        id: "6",
        name: "VIESMAR 实木镜柜",
        image: "/images/products/shower/shower-11.webp",
        badge: "Hot" as const,
      },
      {
        id: "9",
        name: "VIESMAR 实木洗手台",
        image: "/images/products/shower/shower-12.webp",
        badge: "New" as const,
      },
      {
        id: "12",
        name: "VIESMAR 实木吊柜",
        image: "/images/products/shower/shower-15.webp",
        badge: "Limited" as const,
      },
      {
        id: "15",
        name: "VIESMAR 实木置物架",
        image: "/images/products/shower/shower-16.webp",
        badge: "Hot" as const,
      },
      {
        id: "18",
        name: "VIESMAR 实木储物柜",
        image: "/images/products/shower/shower-17.webp",
        badge: "New" as const,
      },
    ]
  }
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = productsByCategory[params.category as keyof typeof productsByCategory]

  if (!categoryData) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />
      
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <Reveal>
            <div className="text-left mb-16">
              <h1 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
                {categoryData.title}
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl">
                {categoryData.description}
              </p>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {categoryData.products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  },
                }}
              >
                <Reveal delay={index * 0.1}>
                  <SimpleProductCard product={product} />
                </Reveal>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}