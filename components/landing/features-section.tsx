'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Heart, FileText, Car, Briefcase, ArrowRight, Users, FileCheck, MapPin, Gavel } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Divorce & Separation',
    description: 'Complete guidance under Hindu Marriage Act & Special Marriage Act. Understand alimony, custody & property rights.',
    stat: '2,500+',
    statLabel: 'Cases Guided',
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
    href: '/chat?topic=divorce',
    iconBg: 'bg-[#6366f1]/10',
  },
  {
    icon: FileText,
    title: 'Document Checker',
    description: 'Never be caught unprepared. Get exact document checklists for passport, license, property and government services.',
    stat: '50+',
    statLabel: 'Document Types',
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
    href: '/documents',
    iconBg: 'bg-[#8b5cf6]/10',
  },
  {
    icon: Car,
    title: 'Challan & Traffic',
    description: 'Find the fastest, cheapest way to resolve any traffic challan. Get state-specific fine details and payment options.',
    stat: '29',
    statLabel: 'States Covered',
    gradient: 'from-[#14b8a6] to-[#5eead4]',
    href: '/chat?topic=challan',
    iconBg: 'bg-[#14b8a6]/10',
  },
  {
    icon: Briefcase,
    title: 'Lawyer Suite',
    description: 'Professional tools for advocates — client management, IPC section finder, and AI-powered case analysis.',
    stat: '500+',
    statLabel: 'Lawyers Trust Us',
    gradient: 'from-[#f97316] to-[#fb923c]',
    href: '/dashboard',
    iconBg: 'bg-[#f97316]/10',
  },
]

const additionalFeatures = [
  { icon: Users, label: 'Family Law', value: '15+ Topics' },
  { icon: FileCheck, label: 'Property Disputes', value: 'Complete Guide' },
  { icon: MapPin, label: 'All Indian States', value: 'Supported' },
  { icon: Gavel, label: 'IPC Sections', value: '500+ Indexed' },
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="relative py-12 md:py-16 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] mb-4">
            <span className="text-[#6366f1] text-xs font-medium">Comprehensive Legal Tools</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Everything You Need
          </h2>
          <p className="text-[#94a3b8] text-base max-w-2xl mx-auto">
            Powerful legal tools designed specifically for modern India
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-4 mb-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={feature.href}>
                <div className="relative p-5 rounded-xl bg-[#111118] border border-[#1e1e2e] transition-all duration-300 hover:border-[rgba(99,102,241,0.3)] hover:shadow-lg hover:shadow-[rgba(99,102,241,0.05)] h-full">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[rgba(99,102,241,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Header with icon and stat */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#6366f1]">{feature.stat}</div>
                      <div className="text-[10px] text-[#94a3b8]">{feature.statLabel}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="relative font-serif text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="relative text-[#94a3b8] leading-relaxed text-sm mb-4">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <div className="relative inline-flex items-center gap-1.5 text-[#6366f1] font-medium text-xs group/link">
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {additionalFeatures.map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-lg bg-[#111118] border border-[#1e1e2e] text-center"
            >
              <item.icon className="w-4 h-4 text-[#6366f1] mx-auto mb-1.5" />
              <div className="text-white font-semibold text-xs mb-0.5">{item.value}</div>
              <div className="text-[#94a3b8] text-[10px]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
