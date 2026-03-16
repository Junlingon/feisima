import { Header } from "@/components/Header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CollectionStrip } from "@/components/collection-strip"
import { MaterialsSection } from "@/components/materials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/Footer"

// 组织（品牌）结构化数据 - 帮助搜索引擎识别品牌信息
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VIESMAR菲斯玛",
  url: "https://viesmar.cn",
  logo: "https://viesmar.cn/logo.png",
  description: "VIESMAR菲斯玛专业高端卫浴品牌，主营304不锈钢浴室柜、实木浴室柜、不锈钢淋浴房等卫浴产品。",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Chinese",
  },
  sameAs: [],
}

// 网站结构化数据 - 帮助搜索引擎理解网站结构
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VIESMAR菲斯玛",
  url: "https://viesmar.cn",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://viesmar.cn/products?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

// 本地商户结构化数据 - 如果有实体店/展厅可展示地址等信息
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "VIESMAR菲斯玛卫浴",
  url: "https://viesmar.cn",
  description: "高端不锈钢卫浴品牌，提供浴室柜、淋浴房等卫浴产品。",
  priceRange: "$$$$",
  image: "https://viesmar.cn/og-image.jpg",
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CollectionStrip />
      <MaterialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
