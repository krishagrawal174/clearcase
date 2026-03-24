'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Scale, FileText, Car, Briefcase, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Scale,
    title: 'Divorce Guidance',
    description: 'Complete step-by-step guidance under Hindu Marriage Act & Special Marriage Act. Know your rights instantly.',
    gradient: 'from-[#c9a84c] to-[#e8d48a]',
    href: '/chat?topic=divorce',
  },
  {
    icon: FileText,
    title: 'Document Checker',
    description: 'Never be caught unprepared. Get exact document checklists for passport, license, property and 20+ more.',
    gradient: 'from-[#7b61ff] to-[#a78bfa]',
    href: '/documents',
  },
  {
    icon: Car,
    title: 'Challan Advisor',
    description: 'Find the fastest, cheapest way to resolve any traffic challan across all Indian states.',
    gradient: 'from-[#14b8a6] to-[#5eead4]',
    href: '/chat?topic=challan',
  },
  {
    icon: Briefcase,
    title: 'Lawyer Suite',
    description: 'Professional tools for advocates — client management, section finder, and AI case analysis.',
    gradient: 'from-[#f97316] to-[#fb923c]',
    href: '/dashboard',
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
    <section id="features" className="relative py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff]">
              Everything you need
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>
          <p className="text-[#8892a4] text-lg max-w-2xl mx-auto">
            Comprehensive legal tools designed for modern India
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-8 rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:shadow-lg hover:shadow-[rgba(201,168,76,0.1)]"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                <feature.icon className="w-6 h-6 text-[#050d1f]" />
              </div>

              {/* Content */}
              <h3 className="relative font-serif text-xl md:text-2xl font-bold text-[#f0f4ff] mb-3">
                {feature.title}
              </h3>
              <p className="relative text-[#8892a4] leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Learn more link */}
              <Link
                href={feature.href}
                className="relative inline-flex items-center gap-2 text-[#c9a84c] font-medium text-sm group/link"
              >
                Learn more
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
