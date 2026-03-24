'use client'

import { Navbar } from '@/components/navbar'
import { AnimatedBackground } from '@/components/animated-background'
import { CustomCursor } from '@/components/custom-cursor'
import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { StatsSection } from '@/components/landing/stats-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050d1f]">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
