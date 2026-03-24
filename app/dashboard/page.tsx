'use client'

import { motion } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ClientTable } from '@/components/dashboard/client-table'
import { CalendarWidget } from '@/components/dashboard/calendar-widget'
import { AIAnalysisPanel } from '@/components/dashboard/ai-analysis-panel'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050d1f] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#f0f4ff] mb-2">
                Welcome back, Rahul
              </h1>
              <p className="text-[#8892a4]">
                Here&apos;s an overview of your practice this month.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
              <StatsCards />
            </div>

            {/* Main Grid - Table and Right Panels */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Client Table - Takes 2 columns on xl */}
              <div className="xl:col-span-2">
                <ClientTable />
              </div>

              {/* Right Column - Calendar and AI Panel */}
              <div className="space-y-6">
                <CalendarWidget />
                <AIAnalysisPanel />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
