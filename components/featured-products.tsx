"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
  {
    id: "1",
    name: "VIESMAR 英伦淋浴房",
    category: "shower",
    price: "¥12,890",
    image: "/images/products/shower/shower-15.webp",
    badge: "New" as const,
    materials: ["安全钢化玻璃", "304不锈钢框架"],
    swatches: [
      { name: "超白玻璃", color: "#F8F8FF" },
      { name: "磨砂玻璃", color: "#E6E6FA" },
      { name: "拉丝不锈钢", color: "#C0C0C0" },
    ],
    quickLookImages: [
      "/images/products/shower/shower-15.webp",
      "/images/products/shower/shower-16.webp",
      "/images/products/shower/shower-17.webp",
    ],
    dimensions: "W: 120cm × D: 90cm × H: 200cm",
    hidePrice: true,
  },
  {
    id: "2",
    name: "VIESMAR 不锈钢浴室柜1",
    category: "stainless",
    price: "¥8,250",
    image: "/images/products/stainless/stainless-prod-0-0.png",
    badge: "Hot" as const,
    materials: ["304食品级不锈钢", "一体陶瓷盆"],
    swatches: [
      { name: "拉丝银", color: "#C0C0C0" },
      { name: "镜面抛光", color: "#E8E8E8" },
      { name: "黑钛金", color: "#2F2F2F" },
    ],
    quickLookImages: [
      "/images/products/stainless/stainless-prod-0-0.png",
      "/images/products/stainless/stainless-prod-0-1.png",
      "/images/products/stainless/stainless-prod-0-2.jpg",
    ],
    dimensions: "W: 80cm × D: 45cm × H: 85cm",
    hidePrice: true,
  },
  {
    id: "3",
    name: "VIESMAR 实木浴室柜1",
    category: "wood",
    price: "¥15,675",
    image: "/images/products/wood/wood-prod-0-0.jpg",
    badge: "Limited" as const,
    materials: ["精铜花洒头", "德国恒温阀芯"],
    swatches: [
      { name: "香槟金", color: "#F7E7CE" },
      { name: "哑光黑", color: "#2F2F2F" },
      { name: "抛光铬", color: "#C0C0C0" },
    ],
    quickLookImages: [
      "/images/products/wood/wood-prod-0-0.jpg",
      "/images/products/wood/wood-prod-0-1.jpg",
      "/images/products/wood/wood-prod-0-2.jpg",
    ],
    dimensions: "W: 25cm × D: 25cm × H: 40cm",
    hidePrice: true,
  },
]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              精选 <span className="italic font-light">产品</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              探索我们最受欢迎的卫浴产品，每一件都体现了精湛工艺和永恒设计理念。
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
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
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
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
