import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "VIESMAR菲斯玛 — 高端不锈钢卫浴 | 不锈钢浴室柜 | 实木浴室柜 | 淋浴房",
    template: "%s | VIESMAR菲斯玛",
  },
  description: "VIESMAR菲斯玛专业高端卫浴品牌，主营304不锈钢浴室柜、实木浴室柜、不锈钢淋浴房、淋浴花洒、面盆龙头等卫浴产品。食品级不锈钢材质，环保0甲醛，为您打造舒适优雅的浴室空间。",
  keywords: ["菲斯玛", "VIESMAR", "卫浴", "不锈钢浴室柜", "实木浴室柜", "淋浴房", "浴室柜", "卫浴品牌", "高端卫浴", "304不锈钢浴室柜", "淋浴花洒", "面盆龙头"],
  alternates: {
    canonical: "http://viesmar.cn/",
  },
  openGraph: {
    siteName: "VIESMAR菲斯玛",
    title: "VIESMAR菲斯玛 — 高端不锈钢卫浴品牌",
    description: "VIESMAR菲斯玛专业高端卫浴品牌，主营304不锈钢浴室柜、实木浴室柜、不锈钢淋浴房等卫浴产品。",
    type: "website",
    url: "http://viesmar.cn/",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">{children}</body>
    </html>
  )
}
