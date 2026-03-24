'use client'

import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mr-3">
              <Scale className="w-4 h-4 text-white" />
            </div>
          )}
          <div
            className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl ${
              message.role === 'user'
                ? 'bg-[#6366f1] text-white'
                : 'bg-[#111118] border border-[#1e1e2e] text-white'
            }`}
          >
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-start"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mr-3">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div className="bg-[#111118] border border-[#1e1e2e] p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-[#6366f1]"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-[#6366f1]"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-[#6366f1]"
                />
              </div>
              <span className="text-xs text-[#94a3b8] ml-2">ClearCase is analyzing...</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
