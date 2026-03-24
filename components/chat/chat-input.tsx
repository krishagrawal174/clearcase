'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Lock } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="p-4 md:p-6 border-t border-[#1e1e2e]">
      <form onSubmit={handleSubmit}>
        <div className="relative bg-[#111118] border border-[#1e1e2e] rounded-2xl transition-all duration-300 focus-within:border-[rgba(99,102,241,0.4)] focus-within:shadow-lg focus-within:shadow-[rgba(99,102,241,0.1)]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your legal situation..."
            disabled={disabled}
            className="w-full bg-transparent px-5 py-4 pr-14 text-white placeholder-[#94a3b8] focus:outline-none disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={!message.trim() || disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#6366f1] hover:bg-[#8b5cf6] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
      
      {/* Privacy Notice */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#94a3b8]">
        <Lock className="w-3 h-3" />
        <span>Your conversations are private</span>
      </div>
    </div>
  )
}
