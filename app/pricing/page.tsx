'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AnimatedBackground } from '@/components/animated-background'

const plans = [
  {
    name: 'Individual',
    price: '499',
    badge: 'Most Popular',
    features: [
      'Unlimited AI queries',
      'All legal topics',
      'Document checklists',
      'Alimony calculator',
      'Case timeline',
      'Hindi language support',
      'Email support',
    ],
    buttonStyle: 'indigo',
  },
  {
    name: 'Lawyer Pro',
    price: '1,499',
    badge: null,
    features: [
      'Everything in Individual',
      'Client management dashboard',
      'IPC section suggester',
      'Draft generator',
      'Case analysis AI',
      'Priority support',
      '5 client profiles',
    ],
    buttonStyle: 'violet',
  },
  {
    name: 'Law Firm',
    price: '9,999',
    badge: null,
    features: [
      'Everything in Lawyer Pro',
      'Unlimited client profiles',
      'Team access (10 users)',
      'White-label option',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
    buttonStyle: 'outline',
  },
]

const faqs = [
  {
    question: 'Is this real legal advice?',
    answer:
      'ClearCase provides AI-powered legal guidance and information based on Indian law. While our AI is trained on legal databases and can help you understand your situation, it is not a substitute for advice from a qualified lawyer. For important legal matters, we always recommend consulting with a licensed advocate.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. There are no cancellation fees or long-term commitments. Your access will continue until the end of your current billing period.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Absolutely. We take privacy very seriously. All conversations are encrypted end-to-end, and we never share your personal information or legal queries with third parties. Your data is stored securely on Indian servers in compliance with data protection regulations.',
  },
  {
    question: 'Do you support Hindi?',
    answer:
      'Yes, ClearCase supports both English and Hindi. You can ask questions and receive responses in Hindi. We are also working on adding support for other regional languages like Tamil, Telugu, and Marathi.',
  },
  {
    question: 'Can I switch plans?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features become available immediately and we prorate the billing. When downgrading, the change takes effect at the start of your next billing cycle.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border border-[#1e1e2e] rounded-xl overflow-hidden bg-[#111118]"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgba(99,102,241,0.03)] transition-colors"
      >
        <span className="text-white font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#94a3b8]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-[#94a3b8] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent{' '}
              <span className="text-[#6366f1]">
                Pricing
              </span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core AI legal guidance.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 border ${
                  plan.badge
                    ? 'border-[#6366f1] bg-[rgba(99,102,241,0.05)]'
                    : 'border-[#1e1e2e] bg-[#111118]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs font-semibold bg-[#6366f1] text-white rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-[#94a3b8]">₹</span>
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-[#94a3b8]">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#6366f1] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94a3b8] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.buttonStyle === 'indigo'
                      ? 'bg-[#6366f1] text-white hover:bg-[#8b5cf6] hover:shadow-lg hover:shadow-[rgba(99,102,241,0.3)]'
                      : plan.buttonStyle === 'violet'
                      ? 'bg-[#8b5cf6] text-white hover:bg-[#a78bfa] hover:shadow-lg hover:shadow-[rgba(139,92,246,0.3)]'
                      : 'border border-[#6366f1] text-[#6366f1] bg-transparent hover:bg-[rgba(99,102,241,0.1)]'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          {/* Trial Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-[#94a3b8] text-sm mb-24"
          >
            All plans include a 7-day free trial. No credit card required.
          </motion.p>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-serif text-3xl font-bold text-white text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
