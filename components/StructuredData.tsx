'use client'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "菲斯玛卫浴",
    "alternateName": "Viesmar",
    "url": "https://viesmar.com.cn",
    "logo": "https://viesmar.com.cn/logo.png",
    "description": "英国NOLLIR集团旗下菲斯玛品牌，专注高端浴室柜和淋浴房定制，提供优质的卫浴解决方案",
    "foundingDate": "1967",
    "parentOrganization": {
      "@type": "Organization",
      "name": "英国NOLLIR集团"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressLocality": "中国"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-400-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Chinese", "English"]
    },
    "sameAs": [
      "https://weibo.com/viesmar",
      "https://www.xiaohongshu.com/viesmar"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "卫浴产品",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "高端浴室柜",
            "category": "浴室家具",
            "description": "定制化高端浴室柜，包括不锈钢和实木材质"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "淋浴房",
            "category": "卫浴设备",
            "description": "玻璃淋浴房定制，提供多种尺寸和设计方案"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}