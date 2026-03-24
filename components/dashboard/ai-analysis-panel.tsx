'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Send, Sparkles, BookOpen, Scale, Loader2 } from 'lucide-react'

const sampleSuggestions = [
  { section: 'IPC 498A', title: 'Cruelty by husband or relatives of husband', relevance: 'High' },
  { section: 'IPC 406', title: 'Criminal breach of trust (Streedhan)', relevance: 'High' },
  { section: 'DV Act Sec 12', title: 'Application for protection order', relevance: 'Medium' },
  { section: 'HMA Sec 13', title: 'Grounds for divorce petition', relevance: 'High' },
]

export function AIAnalysisPanel() {
  const [caseFacts, setCaseFacts] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    if (!caseFacts.trim()) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  const handleReset = () => {
    setCaseFacts('')
    setShowResults(false)
  }

  return (
    <div className="rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#7b61ff] to-[#a78bfa]">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-[#f0f4ff]">AI Case Analyzer</h3>
          <p className="text-xs text-[#8892a4]">Get instant legal insights</p>
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Input Area */}
              <div className="mb-4">
                <label className="block text-sm text-[#8892a4] mb-2">Enter Case Facts</label>
                <textarea
                  value={caseFacts}
                  onChange={(e) => setCaseFacts(e.target.value)}
                  placeholder="Describe the case situation, key facts, and any relevant details..."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] text-sm resize-none focus:outline-none focus:border-[rgba(123,97,255,0.4)] transition-colors"
                />
              </div>

              {/* Quick Prompts */}
              <div className="mb-4">
                <p className="text-xs text-[#8892a4] mb-2">Quick prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {['Divorce case', 'Property dispute', 'Domestic violence', 'Cheque bounce'].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setCaseFacts(prev => prev + (prev ? ' ' : '') + prompt + ' case facts...')}
                      className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-xs text-[#8892a4] hover:text-[#f0f4ff] hover:border-[rgba(123,97,255,0.3)] transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <motion.button
                onClick={handleAnalyze}
                disabled={!caseFacts.trim() || isAnalyzing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#7b61ff] to-[#a78bfa] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analyze with AI
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Results Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7b61ff]" />
                  <span className="text-sm font-medium text-[#f0f4ff]">AI Suggestions</span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
                >
                  New Analysis
                </button>
              </div>

              {/* IPC Suggestions */}
              <div className="space-y-3 mb-4">
                {sampleSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-xl bg-[rgba(123,97,255,0.1)] border border-[rgba(123,97,255,0.2)]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#7b61ff]" />
                        <span className="font-mono text-sm font-semibold text-[#7b61ff]">
                          {suggestion.section}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        suggestion.relevance === 'High'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {suggestion.relevance}
                      </span>
                    </div>
                    <p className="text-xs text-[#8892a4]">{suggestion.title}</p>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-sm font-medium hover:bg-[rgba(201,168,76,0.1)] transition-colors">
                  <Scale className="w-4 h-4" />
                  Full Report
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gold-shimmer text-[#050d1f] text-sm font-medium">
                  <Send className="w-4 h-4" />
                  Save to Case
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
