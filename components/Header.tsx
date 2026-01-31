"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  // 判断是否在详情页（非首页）
  const isDetailPage = pathname !== "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-md border-b",
        isDetailPage 
          ? "bg-white/95 border-neutral-200" 
          : cn("border-white/[0.02]", isScrolled ? "bg-white/[0.02]" : "bg-white/[0.02]"),
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-center h-12 lg:h-16 relative">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <a
              href="/"
              className="block"
              aria-label="VIESMAR 菲斯玛 Home"
            >
              <Image
                src="/images/logo.png"
                alt="VIESMAR 菲斯玛"
                width={320}
                height={70}
                className={cn(
                  "h-14 lg:h-16 w-auto transition-all",
                  isDetailPage 
                    ? "" 
                    : (isScrolled ? "" : "brightness-0 invert"),
                )}
                priority
              />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}