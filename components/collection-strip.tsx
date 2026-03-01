"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "stainless",
    name: "不锈钢浴室柜系列",
    image: "/images/series/stainless/stainless-series-01.webp",
    count: "11 款产品展示",
    href: "/products/series/stainless",
  },
  {
    id: "wood",
    name: "实木浴室柜系列",
    image: "/images/series/wood/wood-series-02.webp",
    count: "15 款产品展示",
    href: "/products/series/wood",
  },
  {
    id: "shower",
    name: "不锈钢淋浴房系列",
    image: "/images/series/shower/shower-series-01.webp",
    count: "10 款产品展示",
    href: "/products/series/shower",
  },
  {
    id: "faucet-shower",
    name: "淋浴花洒系列",
    image: "/images/series/shower/shower-series-05.webp",
    count: "敬请期待",
    href: "#",
  },
  {
    id: "basin-faucet",
    name: "面盆龙头系列",
    image: "/images/series/stainless/stainless-series-06.webp",
    count: "敬请期待",
    href: "#",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const itemWidth = 320 // 320px (w-80) + 32px gap = 352px per item
  const totalWidth = collections.length * (itemWidth + 32) - 32 // subtract last gap
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48) // add padding

  // 拖拽结束后确保状态重置
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none'
    }
    return () => {
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  // 安全重置：鼠标/触摸离开窗口时也要重置拖拽状态
  useEffect(() => {
    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false)
    }
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [isDragging])

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
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
            touchAction: 'pan-y'
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
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Link
                href={collection.href}
                onClick={(e) => { if (isDragging) e.preventDefault() }}
                draggable={false}
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
              </Link>
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