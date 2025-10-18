"use client"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CollectionStrip } from "@/components/collection-strip"
import { MaterialsSection } from "@/components/materials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
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
