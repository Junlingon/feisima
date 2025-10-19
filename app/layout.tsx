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
  title: "Viesmar菲斯玛 — 高端卫浴，品质生活",
  description: "专业卫浴品牌，为您打造舒适优雅的浴室空间",
  generator: "v0.app",
  alternates: {
    canonical: "https://viesmar.example/",
  },
  openGraph: {
    siteName: "Viesmar菲斯玛",
    title: "高端卫浴，品质生活 | Viesmar菲斯玛",
    description: "专业卫浴品牌，为您打造舒适优雅的浴室空间",
    type: "website",
    url: "https://viesmar.example/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-viesmar.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "Viesmar菲斯玛卫浴 — 高端品质，舒适生活",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "高端卫浴，品质生活 | Viesmar菲斯玛",
    description: "专业卫浴品牌，为您打造舒适优雅的浴室空间",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-viesmar.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "Viesmar菲斯玛卫浴 — 高端品质，舒适生活",
      },
    ],
    site: "@viesmar",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">{children}</body>
    </html>
  )
}
