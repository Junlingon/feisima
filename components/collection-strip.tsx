"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "luxury-shower",
    name: "豪华淋浴系列",
    image: "/images/products/shower/shower-00.webp",
    count: "12 件产品",
  },
  {
    id: "modern-stainless",
    name: "现代不锈钢系列",
    image: "/images/products/stainless/stainless-00.webp",
    count: "15 件产品",
  },
  {
    id: "minimalist-design",
    name: "简约设计系列",
    image: "/images/products/shower/shower-10.webp",
    count: "8 件产品",
  },
  {
    id: "premium-fixtures",
    name: "高端五金系列",
    image: "/images/products/stainless/stainless-20.webp",
    count: "10 件产品",
  },
  {
    id: "smart-bathroom",
    name: "智能卫浴系列",
    image: "/images/products/shower/shower-30.webp",
    count: "6 件产品",
  },
  {
    id: "classic-elegance",
    name: "经典优雅系列",
    image: "/images/products/stainless/stainless-40.webp",
    count: "9 件产品",
  },
  {
    id: "contemporary-style",
    name: "当代风格系列",
    image: "/images/products/shower/shower-40.webp",
    count: "11 件产品",
  },
  {
    id: "professional-grade",
    name: "专业级系列",
    image: "/images/products/stainless/stainless-60.webp",
    count: "7 件产品",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const itemWidth = 320 // 320px (w-80) + 32px gap = 352px per item
  const totalWidth = collections.length * (itemWidth + 32) - 32 // subtract last gap
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48) // add padding

  // 拖拽时防止页面滚动的温和方式
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        // 只阻止垂直滚动，允许水平滑动
        const touch = e.touches[0]
        const target = e.target as Element
        
        // 检查是否在拖拽容器内
        if (target.closest('.drag-container')) {
          e.preventDefault()
        }
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isDragging) {
        e.preventDefault()
      }
    }

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('wheel', handleWheel)
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden no-scroll-bounce">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">产品系列</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              探索我们精心策划的产品系列，每个系列都诠释着独特的工艺故事和设计理念。
            </p>
          </div>
        </Reveal>
      </div>

      <div className={`relative drag-container ${isDragging ? 'dragging' : ''}`}>
        <motion.div
          className="flex gap-8 px-6"
          style={{ 
            touchAction: 'pan-x pinch-zoom'
          }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          whileDrag={{ cursor: 'grabbing' }}
          onDragStart={() => {
            setIsDragging(true)
          }}
          onDragEnd={() => {
            setIsDragging(false)
          }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: "blur(1px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.count}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← 拖拽浏览产品系列 →</p>
      </div>
    </section>
  )
}