"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SimpleProductCard } from "@/components/simple-product-card"
import { Reveal } from "@/components/reveal"

// 产品数据
const allProducts = [
  {
    id: "1",
    name: "VIESMAR 英伦淋浴房",
    image: "/images/products/shower/shower-15.webp",
    badge: "New" as const,
  },
  {
    id: "2",
    name: "VIESMAR 不锈钢浴室柜",
    image: "/images/products/stainless/stainless-00.webp",
    badge: "Hot" as const,
  },
  {
    id: "3",
    name: "VIESMAR 实木浴室柜",
    image: "/images/products/shower/shower-10.webp",
    badge: "Limited" as const,
  },
  {
    id: "4",
    name: "VIESMAR 智能马桶",
    image: "/images/products/shower/shower-11.webp",
    badge: "New" as const,
  },
  {
    id: "5",
    name: "VIESMAR 花洒套装",
    image: "/images/products/stainless/stainless-01.webp",
    badge: "Hot" as const,
  },
  {
    id: "6",
    name: "VIESMAR 浴室镜柜",
    image: "/images/products/shower/shower-12.webp",
    badge: "New" as const,
  },
  {
    id: "7",
    name: "VIESMAR 浴缸",
    image: "/images/products/shower/shower-16.webp",
    badge: "Limited" as const,
  },
  {
    id: "8",
    name: "VIESMAR 洗手台",
    image: "/images/products/stainless/stainless-02.webp",
    badge: "Hot" as const,
  },
  {
    id: "9",
    name: "VIESMAR 浴室配件",
    image: "/images/products/shower/shower-17.webp",
    badge: "New" as const,
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />
      
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <Reveal>
            <div className="text-left mb-16">
              <h1 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
                全部 <span className="italic font-light">产品</span>
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl">
                探索我们完整的卫浴产品系列，从淋浴房到浴室柜，每一件都体现了精湛工艺和永恒设计理念。
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
            {allProducts.map((product, index) => (
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