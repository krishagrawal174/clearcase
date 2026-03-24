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
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#0a1525] border border-[rgba(255,255,255,0.1)] text-[#f0f4ff]"
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
        className={`lg:translate-x-0 fixed lg:sticky top-0 left-0 z-50 lg:z-30 h-screen w-[260px] bg-[#0a1525] border-r border-[rgba(255,255,255,0.08)] flex flex-col transition-transform lg:transition-none`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#050d1f]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#f0f4ff]">ClearCase</span>
              <span className="block text-xs text-[#c9a84c]">Lawyer Portal</span>
            </div>
          </Link>
          
          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute top-6 right-4 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#8892a4]"
          >
            <X className="w-5 h-5" />
          </button>
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
                      ? 'bg-gradient-to-r from-[rgba(201,168,76,0.15)] to-transparent border-l-2 border-[#c9a84c] text-[#c9a84c]'
                      : 'text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${active ? 'text-[#c9a84c]' : ''}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.04)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] flex items-center justify-center text-[#050d1f] font-semibold">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-[#f0f4ff] truncate">Rahul Sharma</div>
              <div className="text-xs text-[#8892a4] truncate">Family Law Expert</div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
