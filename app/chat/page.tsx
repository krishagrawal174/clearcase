'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatMessages, type Message } from '@/components/chat/chat-messages'
import { ChatInput } from '@/components/chat/chat-input'
import { MobileNav } from '@/components/chat/mobile-nav'
import { AlimonyCalculator } from '@/components/chat/alimony-calculator'
import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'

const topicLabels: Record<string, string> = {
  divorce: 'Divorce & Separation',
  challan: 'Challan & Traffic',
  documents: 'Document Requirements',
  property: 'Property Dispute',
  family: 'Family Law',
  general: 'General Legal Query',
}

const welcomeMessage = `Namaste! I'm ClearCase AI ⚖️

I'm trained exclusively on Indian law. Please describe your legal situation and I'll guide you step by step.

You can ask me about:
• Divorce proceedings under various acts
• Traffic challan resolution
• Property disputes and documentation
• Family law matters
• Document requirements for government services

How can I assist you today?`

export default function ChatPage() {
  const [activeTopic, setActiveTopic] = useState('general')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Typewriter effect for welcome message
  useEffect(() => {
    if (showWelcome && messages.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome',
        role: 'assistant',
        content: '',
      }
      setMessages([welcomeMsg])
      
      let index = 0
      const interval = setInterval(() => {
        if (index < welcomeMessage.length) {
          setMessages([{
            ...welcomeMsg,
            content: welcomeMessage.slice(0, index + 1),
          }])
          index++
        } else {
          clearInterval(interval)
          setShowWelcome(false)
        }
      }, 15)

      return () => clearInterval(interval)
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          topic: activeTopic,
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Something went wrong. Please try again.',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleNewChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: welcomeMessage,
    }])
  }

  return (
    <div className="flex flex-col h-screen bg-[#050d1f]">
      <CustomCursor />
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 pt-16 md:pt-20">
      {/* Sidebar */}
      <ChatSidebar
        activeTopic={activeTopic}
        onTopicChange={setActiveTopic}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full pb-16 md:pb-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg font-semibold text-[#f0f4ff]">
              {topicLabels[activeTopic]}
            </h1>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(123,97,255,0.15)] border border-[rgba(123,97,255,0.3)] text-xs font-medium text-[#7b61ff]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI Active
            </motion.span>
          </div>
        </header>

        {/* Messages Area with Dot Grid */}
        <div className="flex-1 overflow-hidden relative dot-grid">
          <ChatMessages messages={messages} isTyping={isTyping} />
          <div ref={messagesEndRef} />
        </div>

        {/* Alimony Calculator - Only show for Family Law topic */}
        {activeTopic === 'family' && <AlimonyCalculator />}

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
      </div>
    </div>
  )
}
