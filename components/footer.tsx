'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Scale, Share2, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Footer() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : 'https://clearcase.app'
    
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-16 px-4 border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-[#c9a84c]" />
              <span className="font-serif text-xl font-bold text-[#c9a84c]">ClearCase</span>
            </Link>
            <p className="text-[#8892a4] text-sm leading-relaxed max-w-sm mb-6">
              AI-powered legal guidance platform built for India. Get instant answers on divorce, 
              challans, property disputes and more.
            </p>
            
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#8892a4] hover:text-[#c9a84c] hover:border-[rgba(201,168,76,0.3)] transition-all text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share ClearCase</span>
                </>
              )}
            </button>

            <p className="text-[#8892a4] text-xs mt-6">
              © 2025 ClearCase. All rights reserved.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-[#f0f4ff] mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/get-help" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Get Help
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/book-lawyer" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Book a Lawyer
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Page Sections */}
          <div>
            <h4 className="font-semibold text-[#f0f4ff] mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('stats')}
                  className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm text-left"
                >
                  Statistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm text-left"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <Link href="/get-help" className="text-[#8892a4] hover:text-[#c9a84c] transition-colors text-sm">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg bg-[#0a1628] border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-sm font-medium shadow-xl z-50"
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
