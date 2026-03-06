import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://viesmar.cn'
  
  // 产品ID列表
  const productIds = Array.from({ length: 17 }, (_, i) => i + 1)
  
  // 产品系列
  const seriesCategories = ['stainless', 'wood', 'shower']
  
  // 产品分类
  const productCategories = ['stainless', 'wood', 'shower']

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 产品详情页
    ...productIds.map((id) => ({
      url: `${baseUrl}/products/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // 产品系列展示页
    ...seriesCategories.map((category) => ({
      url: `${baseUrl}/products/series/${category}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // 产品分类列表页
    ...productCategories.map((category) => ({
      url: `${baseUrl}/products/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ]
}
