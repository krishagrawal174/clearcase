'use client'

import { motion } from 'framer-motion'
import { DocumentChecker } from '@/components/documents/document-checker'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimatedBackground } from '@/components/animated-background'
import { MobileNav } from '@/components/chat/mobile-nav'
import { Navbar } from '@/components/navbar'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-20 md:pb-0">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Document Requirements{' '}
              <span className="text-[#6366f1]">
                Checker
              </span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Get the exact documents you need for any government service or legal process. 
              Never be unprepared again.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document Checker */}
      <section className="relative z-10 px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DocumentChecker />
        </motion.div>
      </section>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
