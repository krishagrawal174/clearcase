'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  BookOpen, 
  IndianRupee, 
  Settings,
  Menu,
  X,
  Scale
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/clients', icon: Users, label: 'My Clients' },
  { href: '/dashboard/cases', icon: FolderOpen, label: 'Case Files' },
  { href: '/dashboard/ipc', icon: BookOpen, label: 'IPC Reference' },
  { href: '/dashboard/earnings', icon: IndianRupee, label: 'Earnings' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Button - positioned below navbar */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-40 p-2.5 rounded-xl bg-[#111118] border border-[#1e1e2e] text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: mobileOpen ? 0 : -280 }}
        className={`lg:translate-x-0 fixed lg:sticky top-0 lg:top-0 left-0 z-50 lg:z-30 h-screen w-[260px] bg-[#111118] border-r border-[#1e1e2e] flex flex-col transition-transform lg:transition-none`}
      >
        {/* Logo - Only show on mobile, desktop uses Navbar */}
        <div className="p-6 border-b border-[#1e1e2e] lg:hidden">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white">ClearCase</span>
              <span className="block text-xs text-[#6366f1]">Lawyer Portal</span>
            </div>
          </Link>
          
          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-4 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#94a3b8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Desktop: Show portal label */}
        <div className="hidden lg:block p-6 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white">Lawyer Portal</span>
              <span className="block text-xs text-[#94a3b8]">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-[rgba(99,102,241,0.15)] to-transparent border-l-2 border-[#6366f1] text-[#6366f1]'
                      : 'text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${active ? 'text-[#6366f1]' : ''}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#1e1e2e]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.04)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-semibold">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-white truncate">Rahul Sharma</div>
              <div className="text-xs text-[#94a3b8] truncate">Family Law Expert</div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
