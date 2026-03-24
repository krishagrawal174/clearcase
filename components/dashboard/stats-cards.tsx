'use client'

import { motion } from 'framer-motion'
import { Users, Briefcase, Calendar, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  {
    icon: Users,
    value: 24,
    label: 'Total Clients',
    trend: '+3 this month',
    trendUp: true,
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
    bgGlow: 'rgba(99,102,241,0.1)',
  },
  {
    icon: Briefcase,
    value: 18,
    label: 'Active Cases',
    trend: '5 hearings pending',
    trendUp: true,
    gradient: 'from-[#3b82f6] to-[#60a5fa]',
    bgGlow: 'rgba(59,130,246,0.1)',
  },
  {
    icon: Calendar,
    value: 7,
    label: 'Hearings This Week',
    trend: '2 tomorrow',
    trendUp: false,
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
    bgGlow: 'rgba(139,92,246,0.1)',
  },
  {
    icon: IndianRupee,
    value: 1.85,
    suffix: 'L',
    label: 'Earnings This Month',
    trend: '+12% vs last month',
    trendUp: true,
    gradient: 'from-[#10b981] to-[#34d399]',
    bgGlow: 'rgba(16,185,129,0.1)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function StatsCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -4 }}
          className="relative p-5 rounded-2xl bg-[#111118] border border-[#1e1e2e] transition-all duration-300 hover:border-[rgba(99,102,241,0.3)] overflow-hidden group"
        >
          {/* Background Glow */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: stat.bgGlow }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>

            {/* Value */}
            <div className="font-serif text-3xl font-bold text-white mb-1">
              <AnimatedCounter 
                end={stat.value} 
                suffix={stat.suffix || ''} 
                duration={1.5}
                decimals={stat.suffix === 'L' ? 2 : 0}
              />
            </div>

            {/* Label */}
            <div className="text-sm text-[#94a3b8] mb-3">{stat.label}</div>

            {/* Trend */}
            <div className={`flex items-center gap-1 text-xs ${stat.trendUp ? 'text-[#10b981]' : 'text-[#6366f1]'}`}>
              {stat.trendUp ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {stat.trend}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
