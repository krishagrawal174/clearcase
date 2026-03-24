'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatMessages, type Message } from '@/components/chat/chat-messages'
import { ChatInput } from '@/components/chat/chat-input'
import { MobileNav } from '@/components/chat/mobile-nav'
import { AlimonyCalculator } from '@/components/chat/alimony-calculator'
import { ChallanEstimator } from '@/components/chat/challan-estimator'
import { DocumentSelector } from '@/components/chat/document-selector'
import { PropertySelector } from '@/components/chat/property-selector'
import { FamilyLawSelector } from '@/components/chat/family-law-selector'
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

const topicWelcomeMessages: Record<string, string> = {
  divorce: `Namaste! I'm your Divorce & Separation Guide.

I specialize in Indian matrimonial law including:
• Hindu Marriage Act, 1955
• Special Marriage Act, 1954
• Muslim Personal Law (Shariat) Application Act

Use the Alimony Calculator above to estimate maintenance amounts, then describe your situation below. I'll provide step-by-step guidance on grounds for divorce, procedure, and your legal rights.

What would you like to know about divorce proceedings?`,

  challan: `Namaste! I'm your Traffic Challan Advisor.

I can help you understand and resolve traffic violations under the Motor Vehicles Act, 2019 and state-specific traffic rules.

Use the Fine Estimator above to check potential penalties for your violation, then describe your situation. I'll guide you on:
• How to pay or contest a challan
• Court procedures if needed
• License suspension rules
• State-wise variations

What traffic-related issue can I help you with?`,

  documents: `Namaste! I'm your Document Requirements Expert.

I have detailed knowledge of documentation requirements for all major Indian government services and procedures.

Use the Document Finder above to instantly see required documents for passports, licenses, property registration, and more. Then ask me for:
• Additional clarifications
• State-specific variations
• Tips to expedite processing
• Common rejection reasons

Which document or service do you need help with?`,

  property: `Namaste! I'm your Property Dispute Specialist.

I can guide you through all types of property matters under Indian law including:
• Transfer of Property Act
• Registration Act
• State-specific land revenue laws
• RERA for real estate issues

Use the Property Dispute Analyzer above to understand your legal options, then describe your specific situation. I'll help you understand your rights and the legal process.

What property issue are you facing?`,

  family: `Namaste! I'm your Family Law Counselor.

I specialize in all aspects of family law in India:
• Custody and guardianship
• Maintenance and alimony
• Domestic violence protection
• Adoption procedures
• Succession and inheritance

Use the Case Guide above to explore different family law matters, then share your situation. I'll provide compassionate, practical legal guidance.

How can I assist you with your family law matter?`,

  general: `Namaste! I'm ClearCase AI.

I'm trained exclusively on Indian law. Please describe your legal situation and I'll guide you step by step.

You can ask me about:
• Divorce proceedings under various acts
• Traffic challan resolution
• Property disputes and documentation
• Family law matters
• Document requirements for government services

Or select a specific topic from the sidebar for specialized tools and guidance.

How can I assist you today?`,
}

function ChatPageContent() {
  const searchParams = useSearchParams()
  const urlTopic = searchParams.get('topic')
  const validTopics = ['divorce', 'challan', 'documents', 'property', 'family', 'general']
  const initialTopic = urlTopic && validTopics.includes(urlTopic) ? urlTopic : 'general'
  
  const [activeTopic, setActiveTopic] = useState(initialTopic)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle URL topic parameter changes
  useEffect(() => {
    if (urlTopic && validTopics.includes(urlTopic) && urlTopic !== activeTopic) {
      setActiveTopic(urlTopic)
      const currentWelcome = topicWelcomeMessages[urlTopic] || topicWelcomeMessages.general
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: currentWelcome,
      }])
      setShowWelcome(false)
    }
  }, [urlTopic])

  // Typewriter effect for welcome message
  useEffect(() => {
    if (showWelcome && messages.length === 0) {
      const currentWelcome = topicWelcomeMessages[activeTopic] || topicWelcomeMessages.general
      const welcomeMsg: Message = {
        id: 'welcome',
        role: 'assistant',
        content: '',
      }
      setMessages([welcomeMsg])
      
      let index = 0
      const interval = setInterval(() => {
        if (index < currentWelcome.length) {
          setMessages([{
            ...welcomeMsg,
            content: currentWelcome.slice(0, index + 1),
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
    const currentWelcome = topicWelcomeMessages[activeTopic] || topicWelcomeMessages.general
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: currentWelcome,
    }])
  }

  // Handle topic change - reset messages with new welcome
  const handleTopicChange = (topic: string) => {
    setActiveTopic(topic)
    const currentWelcome = topicWelcomeMessages[topic] || topicWelcomeMessages.general
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: currentWelcome,
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
        onTopicChange={handleTopicChange}
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

        {/* Topic-specific tools */}
        {activeTopic === 'divorce' && <AlimonyCalculator />}
        {activeTopic === 'challan' && <ChallanEstimator />}
        {activeTopic === 'documents' && <DocumentSelector />}
        {activeTopic === 'property' && <PropertySelector />}
        {activeTopic === 'family' && <FamilyLawSelector />}

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#050d1f]">
        <div className="text-[#c9a84c]">Loading...</div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  )
}
