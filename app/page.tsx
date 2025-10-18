'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Services from '@/components/Services'
import Cases from '@/components/Cases'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Products />
      <Services />
      <Cases />
      <Contact />
      <Footer />
    </main>
  )
}