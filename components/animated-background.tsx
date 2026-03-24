'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#1e1b4b] blur-[100px] opacity-50"
        style={{ top: '-200px', left: '-100px' }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#0f0a2e] blur-[100px] opacity-50"
        style={{ top: '50%', right: '-150px' }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 7,
        }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-[#1a1a2e] blur-[100px] opacity-50"
        style={{ bottom: '-100px', left: '30%' }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 14,
        }}
      />
    </div>
  )
}
