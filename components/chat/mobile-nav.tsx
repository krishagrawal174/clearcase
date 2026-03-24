'use client'

import Link from 'next/link'
import { Scale, MessageCircle, FileText, Briefcase, Home } from 'lucide-react'

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-[#1e1e2e]">
      <div className="flex items-center py-3">
        <Link
          href="/"
          className="flex-1 flex flex-col items-center gap-1 text-[#94a3b8] hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" style={{ width: 20, height: 20 }} />
          <span style={{ fontSize: 10 }}>Home</span>
        </Link>
        <Link
          href="/chat"
          className="flex-1 flex flex-col items-center gap-1 text-[#6366f1]"
        >
          <MessageCircle className="w-5 h-5" style={{ width: 20, height: 20 }} />
          <span style={{ fontSize: 10 }}>Chat</span>
        </Link>
        <Link
          href="/documents"
          className="flex-1 flex flex-col items-center gap-1 text-[#94a3b8] hover:text-white transition-colors"
        >
          <FileText className="w-5 h-5" style={{ width: 20, height: 20 }} />
          <span style={{ fontSize: 10 }}>Docs</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 flex flex-col items-center gap-1 text-[#94a3b8] hover:text-white transition-colors"
        >
          <Briefcase className="w-5 h-5" style={{ width: 20, height: 20 }} />
          <span style={{ fontSize: 10 }}>Portal</span>
        </Link>
      </div>
    </nav>
  )
}
