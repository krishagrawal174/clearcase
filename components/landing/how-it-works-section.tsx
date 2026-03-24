'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MousePointerClick, MessageSquareText, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    number: '01',
    title: 'Choose Your Topic',
    description: 'Select from divorce, property, traffic challans, or other legal categories tailored for Indian law.',
  },
  {
    icon: MessageSquareText,
    number: '02',
    title: 'Describe Your Situation',
    description: 'Tell us about your case in simple words. Our AI understands English, Hindi, and Hinglish.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Get Instant Guidance',
    description: 'Receive clear, actionable advice with relevant IPC sections, documents needed, and next steps.',
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-12 md:py-16 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] mb-4">
            <span className="text-[#c9a84c] text-xs font-medium">Simple 3-Step Process</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#f0f4ff] mb-2">
            How It Works
          </h2>
          <p className="text-[#8892a4] text-base max-w-2xl mx-auto">
            Get legal clarity in minutes, not days
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="relative p-5 rounded-xl bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] text-center group hover:border-[rgba(201,168,76,0.3)] transition-all duration-300">
                  {/* Number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#050d1f] border border-[#c9a84c] flex items-center justify-center">
                    <span className="text-[#c9a84c] text-[10px] font-bold">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 mb-4 mt-1 group-hover:from-[#c9a84c]/30 group-hover:to-[#c9a84c]/10 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-[#c9a84c]" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-base font-bold text-[#f0f4ff] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#8892a4] leading-relaxed text-xs">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 text-[#c9a84c]/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
