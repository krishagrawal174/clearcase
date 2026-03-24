'use client'

import { motion } from 'framer-motion'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ClientTable } from '@/components/dashboard/client-table'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimatedBackground } from '@/components/animated-background'
import { MobileNav } from '@/components/chat/mobile-nav'
import { Navbar } from '@/components/navbar'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050d1f] pb-20 md:pb-0">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-2">
              Welcome back, Rahul
            </h1>
            <p className="text-[#8892a4]">
              Here&apos;s an overview of your practice this month.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10">
            <StatsCards />
          </div>

          {/* Client Table */}
          <ClientTable />
        </motion.div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
