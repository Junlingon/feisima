"use client"

import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductDetailSection } from "@/components/product-detail-section"

// 产品数据
const products = [
  {
    id: "1",
    name: "VIESMAR 英伦淋浴房",
    price: "¥12,890",
    originalPrice: "¥15,890",
    category: "淋浴房系列",
    description: "采用英国设计理念，融合现代简约风格与传统工艺精髓。精选安全钢化玻璃配合304不锈钢框架，为您打造安全舒适的淋浴空间。",
    longDescription: "VIESMAR英伦淋浴房系列，源自英国皇室御用工艺传承，每一件产品都经过严格的品质检验。采用8mm安全钢化玻璃，通过3C认证，抗冲击性能是普通玻璃的5倍以上。304不锈钢框架经过特殊防腐处理，即使在潮湿环境中也能保持光亮如新。",
    features: [
      "8mm安全钢化玻璃，防爆防裂",
      "304不锈钢框架，防锈耐腐蚀", 
      "德国进口五金配件，开合顺滑",
      "防水胶条密封，滴水不漏",
      "可定制尺寸，适配各种空间"
    ],
    specifications: {
      "尺寸": "W: 120cm × D: 90cm × H: 200cm",
      "材质": "8mm钢化玻璃 + 304不锈钢",
      "开启方式": "推拉门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "5年质保"
    },
    images: [
      "/images/products/shower/shower-00.jpg",
      "/images/products/shower/shower-01.jpg", 
      "/images/products/shower/shower-02.jpg",
      "/images/products/shower/shower-03.jpg",
      "/images/products/shower/shower-04.jpg"
    ],
    badge: "New",
    materials: ["安全钢化玻璃", "304不锈钢框架"],
  },
  {
    id: "2", 
    name: "VIESMAR 不锈钢浴室柜",
    price: "¥8,250",
    originalPrice: "¥9,980",
    category: "浴室柜系列",
    description: "采用304食品级不锈钢材质，一体成型工艺，搭配高品质陶瓷盆。防水防潮，经久耐用，是现代家庭的理想选择。",
    longDescription: "VIESMAR不锈钢浴室柜系列，采用食品级304不锈钢材质，通过SGS认证，安全环保无甲醛。一体成型工艺确保产品的整体性和耐用性，搭配高品质陶瓷盆，易清洁不变色。多层收纳设计，充分利用空间，让您的浴室整洁有序。",
    features: [
      "304食品级不锈钢，安全环保",
      "一体陶瓷盆，易清洁不变色",
      "多层收纳设计，空间利用率高",
      "静音导轨，开合无声",
      "防水LED镜前灯"
    ],
    specifications: {
      "尺寸": "W: 80cm × D: 45cm × H: 85cm",
      "材质": "304不锈钢 + 陶瓷",
      "台面": "一体陶瓷盆",
      "收纳": "双门柜 + 抽屉",
      "保修期": "3年质保"
    },
    images: [
      "/images/products/stainless/stainless-00.jpg",
      "/images/products/stainless/stainless-01.jpg",
      "/images/products/stainless/stainless-02.jpg",
      "/images/products/stainless/stainless-03.jpg",
      "/images/products/stainless/stainless-04.jpg"
    ],
    badge: "Hot",
    materials: ["304食品级不锈钢", "一体陶瓷盆"],
  },
  {
    id: "3",
    name: "VIESMAR 实木浴室柜", 
    price: "¥15,675",
    originalPrice: "¥18,900",
    category: "实木系列",
    description: "精选进口橡木，经过多道工艺处理，具有天然木纹质感。配备德国进口五金配件，展现自然与工艺的完美结合。",
    longDescription: "VIESMAR实木浴室柜系列，精选北美进口橡木，每一块木材都经过严格筛选。经过12道工艺处理，包括烘干、防腐、防潮等，确保产品在潮湿环境中也能保持稳定。天然木纹质感，每一件都是独一无二的艺术品。",
    features: [
      "进口橡木材质，天然环保",
      "多层防水处理，防潮防霉",
      "德国进口铰链，承重力强",
      "天然木纹，每件独一无二",
      "专业安装服务"
    ],
    specifications: {
      "尺寸": "W: 100cm × D: 50cm × H: 85cm",
      "材质": "进口橡木 + 陶瓷",
      "表面处理": "环保清漆",
      "台面": "人造石台面",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/wood/wood-00.jpg",
      "/images/products/wood/wood-01.jpg",
      "/images/products/wood/wood-02.jpg",
      "/images/products/wood/wood-03.jpg",
      "/images/products/wood/wood-00.jpg"
    ],
    badge: "Limited",
    materials: ["进口橡木", "人造石台面"],
  }
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />
      <ProductDetailSection product={product} />
      <Footer />
    </main>
  )
}