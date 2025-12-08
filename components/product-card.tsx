"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: string
    image: string
    badge?: "New" | "Back in stock" | "Limited" | "Hot"
    materials: string[]
    swatches: { name: string; color: string }[]
    quickLookImages: string[]
    dimensions: string
    hidePrice?: boolean
  }
  onQuickLook: (product: any) => void
}

export function ProductCard({ product, onQuickLook }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative bg-white overflow-hidden cursor-pointer"
        style={{
          borderRadius: "24px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
        }}
        layout
        whileHover={{ y: -5, boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 60px" }}
        transition={{ duration: 0.3 }}
      >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
              product.badge === "New" && "bg-green-500/90 text-white",
              product.badge === "Back in stock" && "bg-blue-500/90 text-white",
              product.badge === "Limited" && "bg-amber-500/90 text-white",
              product.badge === "Hot" && "bg-red-500/90 text-white",
            )}
          >
            {product.badge}
          </span>
        </div>
      )}

        {/* Product Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "25/36" }}>
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

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-lg shadow-black/50">{product.name}</h3>
              <p className="text-sm text-white/95 mb-2 drop-shadow-md shadow-black/50">{product.materials.join(", ")}</p>
              {!product.hidePrice && (
                <span className="text-xl font-bold text-white drop-shadow-lg shadow-black/50">{product.price}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
