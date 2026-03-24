'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'ClearCase explained my divorce rights in 2 minutes. My lawyer would have charged ₹5000 for the same information.',
    name: 'Priya M.',
    location: 'Delhi',
    type: 'Individual',
  },
  {
    quote: 'I use it daily to quickly check applicable IPC sections before client meetings. Saves me hours.',
    name: 'Adv. Rahul Sharma',
    location: 'Mumbai',
    type: 'Advocate',
  },
  {
    quote: "Got my challan dismissed using ClearCase's exact guidance. Incredible tool.",
    name: 'Vikram S.',
    location: 'Bangalore',
    type: 'Individual',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" className="relative py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by thousands
          </h2>
          <p className="text-[#94a3b8] text-lg">
            See what our users have to say
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative p-6 md:p-8 rounded-2xl bg-[#111118] border border-[#1e1e2e] border-l-2 border-l-[#6366f1]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#6366f1] text-[#6366f1]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-lg text-white italic leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-[#94a3b8]">
                  {testimonial.location} · {testimonial.type}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
