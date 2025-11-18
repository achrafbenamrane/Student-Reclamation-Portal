'use client'

import { HeroSection } from '@/components/HeroSection'
import { ReclamationForm } from '@/components/ReclamationForm'
import { InfoCards } from '@/components/InfoCards'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackgroundAnimation } from '@/components/BackgroundAnimation'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      
      <Header />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <HeroSection />
        
        <div className="max-w-4xl mx-auto mt-16">
          <ReclamationForm />
          <InfoCards />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
