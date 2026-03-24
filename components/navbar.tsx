'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Scale, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Legal Chat' },
  { href: '/documents', label: 'Documents' },
  { href: '/ipc', label: 'IPC Finder' },
  { href: '/book-lawyer', label: 'Book a Lawyer' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Lawyer Portal' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050d1f]/80 backdrop-blur-xl border-b border-[rgba(201,168,76,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Scale className="w-7 h-7 text-[#c9a84c]" />
            </motion.div>
            <span className="font-serif text-xl md:text-2xl font-bold text-[#c9a84c]">
              ClearCase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[#8892a4] hover:text-[#f0f4ff] transition-colors text-sm font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-[#c9a84c] border border-[rgba(201,168,76,0.3)] hover:border-[#c9a84c] transition-colors"
              >
                I'm a Lawyer
              </motion.button>
            </Link>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-5 py-2.5 rounded-lg font-medium text-sm text-[#050d1f] overflow-hidden gold-shimmer"
              >
                Get Started Free
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f0f4ff]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0f1e3d] border-t border-[rgba(255,255,255,0.08)] py-4 px-4 shadow-xl z-50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full mt-4 px-5 py-2.5 rounded-lg font-medium text-sm text-[#050d1f] gold-shimmer">
                Get Started Free
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
