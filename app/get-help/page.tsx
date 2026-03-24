'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Heart, 
  Car, 
  FileText, 
  Home, 
  Users, 
  HelpCircle,
  ArrowRight,
  Scale
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const topics = [
  {
    id: 'divorce',
    title: 'Divorce & Separation',
    description: 'Get guidance on divorce proceedings, alimony calculations, and matrimonial law under Hindu Marriage Act, Special Marriage Act, and more.',
    icon: Heart,
    color: '#6366f1',
  },
  {
    id: 'challan',
    title: 'Challan & Traffic',
    description: 'Understand traffic violations, fine calculations, court procedures, and license-related issues under Motor Vehicles Act.',
    icon: Car,
    color: '#6366f1',
  },
  {
    id: 'documents',
    title: 'Document Requirements',
    description: 'Find complete documentation requirements for passports, licenses, property registration, and government services.',
    icon: FileText,
    color: '#6366f1',
  },
  {
    id: 'property',
    title: 'Property Dispute',
    description: 'Navigate property disputes, land registration, RERA issues, and transfer of property matters with expert guidance.',
    icon: Home,
    color: '#6366f1',
  },
  {
    id: 'family',
    title: 'Family Law',
    description: 'Get help with custody, guardianship, maintenance, domestic violence protection, adoption, and inheritance matters.',
    icon: Users,
    color: '#6366f1',
  },
  {
    id: 'general',
    title: 'General Legal Query',
    description: 'Have a different legal question? Our AI assistant is trained on Indian law and ready to help with any legal matter.',
    icon: HelpCircle,
    color: '#6366f1',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function GetHelpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Scale className="w-10 h-10 text-[#6366f1]" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            How Can We{' '}
            <span className="text-[#6366f1]">Help You?</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto leading-relaxed"
          >
            Select a topic below to get personalized legal guidance from our AI assistant, 
            trained exclusively on Indian law.
          </motion.p>
        </div>
      </section>

      {/* Topic Cards Grid */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topics.map((topic) => {
            const IconComponent = topic.icon
            return (
              <motion.div
                key={topic.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link href={`/chat?topic=${topic.id}`}>
                  <div className="relative h-full p-6 rounded-2xl bg-[#111118] border border-[#1e1e2e] hover:border-[rgba(99,102,241,0.4)] transition-all duration-300 overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6366f1]/5 rounded-full blur-2xl" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#6366f1]/5 border border-[rgba(99,102,241,0.3)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-7 h-7 text-[#6366f1]" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-[#6366f1] transition-colors duration-300">
                        {topic.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
                        {topic.description}
                      </p>
                      
                      {/* CTA Button */}
                      <div className="flex items-center gap-2 text-[#6366f1] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        <span>Start Chat</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[rgba(99,102,241,0.1)] to-transparent" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-[#111118] border border-[rgba(99,102,241,0.2)] text-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#6366f1]/5 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                Need to Speak with a Real Lawyer?
              </h2>
              <p className="text-[#94a3b8] mb-8 max-w-xl mx-auto">
                Book a consultation with verified legal professionals across India. 
                Get personalized advice for your specific situation.
              </p>
              <Link href="/book-lawyer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 rounded-xl font-medium text-white bg-[#6366f1] hover:bg-[#8b5cf6] transition-colors"
                >
                  Book a Lawyer Consultation
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
