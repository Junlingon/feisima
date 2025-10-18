import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.viesmar.com'),
  title: '菲斯玛VIESMAR - 高端浴室柜与淋浴房定制专家',
  description: '菲斯玛VIESMAR，英国诺利尔集团旗下品牌，专业从事高端浴室柜和淋浴房定制。50+年工艺传承，4个国际生产基地，为您打造臻美舒适的家居生活空间。',
  keywords: '菲斯玛,VIESMAR,高端浴室柜,淋浴房定制,卫浴产品,浴室家具,玻璃隔断',
  authors: [{ name: '菲斯玛VIESMAR' }],

  robots: 'index, follow',
  openGraph: {
    title: '菲斯玛VIESMAR - 高端浴室柜与淋浴房定制专家',
    description: '50+年工艺传承，专业定制高端浴室柜和淋浴房，为您打造臻美舒适的家居生活空间。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '菲斯玛VIESMAR官网',
  },
  twitter: {
    card: 'summary_large_image',
    title: '菲斯玛VIESMAR - 高端浴室柜与淋浴房定制专家',
    description: '50+年工艺传承，专业定制高端浴室柜和淋浴房',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f59e0b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "菲斯玛VIESMAR",
              "url": "https://www.viesmar.com",
              "logo": "https://www.viesmar.com/logo.png",
              "description": "高端浴室柜与淋浴房定制专家",
              "foundingDate": "1967",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "CN",
                "addressRegion": "广东省",
                "addressLocality": "广州市",
                "streetAddress": "番禺区市桥街繁华路1号友谊中心1808房D101"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+86-400-xxx-xxxx"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}