'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, Zap, Scale, Send, Bot } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

const chatMessages = [
  { type: 'user', text: 'I want to file for divorce. What documents do I need?' },
  { type: 'ai', text: 'For filing divorce under Hindu Marriage Act, you will need: Marriage Certificate, Address Proof, Income Proof, and 2 Passport Photos. Would you like the complete checklist?' },
]

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#c9a84c]/10 to-transparent blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-[#1a3a6e]/30 to-transparent blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-16 pb-8 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            <span className="text-[#f0f4ff]">Legal Clarity,</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] bg-clip-text text-transparent">
              For Every Indian.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-[#8892a4] max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
          >
            Instant AI-powered guidance on divorce, challans, property disputes and more. 
            In English or Hindi. Available 24/7.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="/get-help">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full sm:w-auto h-10 px-5 rounded-lg font-medium text-sm text-[#050d1f] gold-shimmer shadow-md shadow-[rgba(201,168,76,0.2)] flex items-center justify-center gap-1.5"
              >
                Start Free Consultation
                <span className="text-sm">→</span>
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto h-10 px-5 rounded-lg font-medium text-sm text-[#c9a84c] border border-[#c9a84c] bg-transparent transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-[#c9a84c]/10"
              >
                I'm a Lawyer
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-4 text-[#8892a4] text-xs"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#c9a84c]" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#c9a84c]" />
              <span>Instant Answers</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#c9a84c]" />
              <span>India-specific Law</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Floating Chat Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            {/* Glow effect behind chat */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-[#1a3a6e]/20 blur-[60px] rounded-3xl" />
            
            {/* Chat Container */}
            <motion.div
              className="relative bg-[#0a1628]/90 backdrop-blur-xl rounded-2xl border border-[rgba(201,168,76,0.2)] p-6 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[rgba(255,255,255,0.1)] mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#050d1f]" />
                </div>
                <div>
                  <h4 className="text-[#f0f4ff] font-semibold">ClearCase AI</h4>
                  <p className="text-[#8892a4] text-xs">Always here to help</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-4">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] bg-[#c9a84c] text-[#050d1f] rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
                    {chatMessages[0].text}
                  </div>
                </motion.div>

                {/* AI Response */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-[#1a2a4a] text-[#f0f4ff] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                    {chatMessages[1].text}
                  </div>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 3.5, duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 text-[#8892a4] text-xs"
                >
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>AI is typing...</span>
                </motion.div>
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-3 p-3 bg-[#050d1f]/50 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <input
                  type="text"
                  placeholder="Ask your legal question..."
                  className="flex-1 bg-transparent text-[#f0f4ff] text-sm placeholder:text-[#8892a4] outline-none"
                  disabled
                />
                <button className="w-9 h-9 rounded-lg bg-[#c9a84c] flex items-center justify-center hover:bg-[#e8d48a] transition-colors">
                  <Send className="w-4 h-4 text-[#050d1f]" />
                </button>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-transparent backdrop-blur-sm border border-[rgba(201,168,76,0.2)]"
              animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#1a3a6e]/30 to-transparent backdrop-blur-sm border border-[rgba(26,58,110,0.3)]"
              animate={{ scale: [1, 1.1, 1], y: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>
        </motion.div>
      </div>

      </section>
  )
}
