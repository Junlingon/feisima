"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SimpleProductCardProps {
  product: {
    id: string
    name: string
    image: string
    badge?: "New" | "Back in stock" | "Limited" | "Hot"
  }
}

export function SimpleProductCard({ product }: SimpleProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative bg-white overflow-hidden cursor-pointer"
        style={{
          borderRadius: "24px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
        }}
        whileHover={{ y: -5, boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 60px" }}
        transition={{ duration: 0.3 }}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
          <div className="relative w-full h-full">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        </div>

        {/* Product Name */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{product.name}</h3>
        </div>
      </motion.div>
    </Link>
  )
}