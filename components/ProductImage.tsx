'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImageProps {
  images: string[]
  alt: string
  className?: string
}

const ProductImage = ({ images, alt, className = '' }: ProductImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState<boolean[]>(new Array(images.length).fill(false))

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageError = (index: number) => {
    setImageError(prev => {
      const newErrors = [...prev]
      newErrors[index] = true
      return newErrors
    })
  }

  // 获取产品类别用于占位符
  const getProductCategory = (imagePath: string) => {
    if (imagePath.includes('stainless')) return '钢'
    if (imagePath.includes('wood')) return '木'
    if (imagePath.includes('shower')) return '浴'
    return '产品'
  }

  const getProductColor = (imagePath: string) => {
    if (imagePath.includes('stainless')) return 'from-blue-100 to-blue-200'
    if (imagePath.includes('wood')) return 'from-amber-100 to-amber-200'
    if (imagePath.includes('shower')) return 'from-cyan-100 to-cyan-200'
    return 'from-gray-100 to-gray-200'
  }

  const getIconColor = (imagePath: string) => {
    if (imagePath.includes('stainless')) return 'text-blue-600 bg-blue-100'
    if (imagePath.includes('wood')) return 'text-amber-600 bg-amber-100'
    if (imagePath.includes('shower')) return 'text-cyan-600 bg-cyan-100'
    return 'text-gold-600 bg-gold-100'
  }

  const renderPlaceholder = () => (
    <div className={`w-full h-full bg-gradient-to-br ${getProductColor(images[currentImageIndex] || '')} flex items-center justify-center`}>
      <div className="text-center text-gray-600">
        <div className={`w-16 h-16 ${getIconColor(images[currentImageIndex] || '')} rounded-lg flex items-center justify-center mx-auto mb-3`}>
          <span className="font-bold text-lg">
            {getProductCategory(images[currentImageIndex] || '')}
          </span>
        </div>
        <p className="font-medium text-sm px-4">{alt}</p>
        <p className="text-xs text-gray-500 mt-1">产品图片</p>
      </div>
    </div>
  )

  const currentImage = images[currentImageIndex]
  const hasError = imageError[currentImageIndex]

  return (
    <div className={`relative group ${className}`}>
      {hasError || !currentImage ? (
        renderPlaceholder()
      ) : (
        <img
          src={currentImage}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => handleImageError(currentImageIndex)}
        />
      )}

      {/* 图片导航按钮 - 只在有多张图片时显示 */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
          >
            <ChevronRight size={16} />
          </button>

          {/* 图片指示器 */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'bg-white'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductImage