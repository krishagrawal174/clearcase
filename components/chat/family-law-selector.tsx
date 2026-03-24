'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ChevronDown, Scale } from 'lucide-react'

interface CaseInfo {
  applicableLaws: string[]
  keyConsiderations: string[]
  jurisdiction: string
  estimatedCost: string
  commonOutcomes: string[]
}

const caseTypes = [
  {
    id: 'divorce',
    label: 'Divorce Proceedings',
    icon: '💔',
    info: {
      applicableLaws: ['Hindu Marriage Act, 1955', 'Special Marriage Act, 1954', 'Muslim Personal Law', 'Indian Divorce Act, 1869'],
      keyConsiderations: ['Mutual consent vs. contested divorce', 'Grounds for divorce (cruelty, desertion, adultery)', 'Maintenance and alimony', 'Child custody arrangements', 'Division of property'],
      jurisdiction: 'Family Court at place of marriage or where parties last resided',
      estimatedCost: '₹25,000 - ₹5,00,000+ (depending on complexity)',
      commonOutcomes: ['Mutual consent decree (6-18 months)', 'Contested decree (2-5 years)', 'Interim maintenance orders', 'Custody arrangements'],
    },
  },
  {
    id: 'custody',
    label: 'Child Custody',
    icon: '👶',
    info: {
      applicableLaws: ['Hindu Minority and Guardianship Act, 1956', 'Guardians and Wards Act, 1890', 'Juvenile Justice Act'],
      keyConsiderations: ['Welfare of child is paramount', 'Age of child (mother preferred for children under 5)', 'Financial stability of parents', 'Emotional bond with child', 'Visitation rights'],
      jurisdiction: 'Family Court / Guardian Court',
      estimatedCost: '₹20,000 - ₹2,00,000',
      commonOutcomes: ['Sole custody to one parent', 'Joint custody arrangement', 'Visitation schedule', 'Child support order'],
    },
  },
  {
    id: 'maintenance',
    label: 'Maintenance/Alimony',
    icon: '💰',
    info: {
      applicableLaws: ['Section 125 CrPC', 'Hindu Adoption and Maintenance Act', 'Hindu Marriage Act Sections 24, 25', 'Protection of Women from DV Act'],
      keyConsiderations: ['Income of both parties', 'Standard of living during marriage', 'Health and age of parties', 'Children responsibilities', 'Earning capacity'],
      jurisdiction: 'Family Court / Magistrate Court (for Sec 125 CrPC)',
      estimatedCost: '₹10,000 - ₹1,00,000',
      commonOutcomes: ['Interim maintenance', 'Permanent alimony', 'Lump sum settlement', 'Monthly payment order'],
    },
  },
  {
    id: 'domestic-violence',
    label: 'Domestic Violence',
    icon: '🛡️',
    info: {
      applicableLaws: ['Protection of Women from Domestic Violence Act, 2005', 'IPC Section 498A', 'Dowry Prohibition Act'],
      keyConsiderations: ['Types of abuse (physical, emotional, economic)', 'Evidence documentation', 'Protection order requirements', 'Shared household rights', 'Compensation claims'],
      jurisdiction: 'Magistrate Court (Protection Orders) / Sessions Court (Criminal)',
      estimatedCost: '₹15,000 - ₹1,00,000',
      commonOutcomes: ['Protection order within 3 days', 'Residence order', 'Monetary relief', 'Custody order', 'Compensation order'],
    },
  },
  {
    id: 'adoption',
    label: 'Adoption',
    icon: '🤝',
    info: {
      applicableLaws: ['Hindu Adoption and Maintenance Act, 1956', 'Juvenile Justice Act, 2015', 'CARA Guidelines'],
      keyConsiderations: ['Age requirements for adoptive parents', 'Single parent adoption rules', 'Inter-country adoption process', 'Registration with CARA', 'Legal heir status'],
      jurisdiction: 'District Court / Child Welfare Committee',
      estimatedCost: '₹50,000 - ₹3,00,000 (agency fees)',
      commonOutcomes: ['Adoption deed registration', 'Court adoption order', 'CARA registration certificate', 'Legal heir certificate'],
    },
  },
  {
    id: 'succession',
    label: 'Succession/Inheritance',
    icon: '📜',
    info: {
      applicableLaws: ['Hindu Succession Act, 1956', 'Indian Succession Act, 1925', 'Muslim Personal Law (Sharia)', 'Special Marriage Act'],
      keyConsiderations: ['Testamentary vs. intestate succession', 'Class I and II heirs', 'Coparcenary rights', 'Will validity and probate', 'Daughter rights in ancestral property'],
      jurisdiction: 'Civil Court / High Court (for probate)',
      estimatedCost: '₹25,000 - ₹2,00,000',
      commonOutcomes: ['Letters of administration', 'Probate of will', 'Succession certificate', 'Legal heir certificate'],
    },
  },
]

interface FamilyLawSelectorProps {
  onSelectCase?: (caseType: string) => void
}

export function FamilyLawSelector({ onSelectCase }: FamilyLawSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedCase, setSelectedCase] = useState('')
  const [showResult, setShowResult] = useState(false)

  const selectedCaseData = caseTypes.find(c => c.id === selectedCase)

  const handleViewDetails = () => {
    setShowResult(true)
    if (onSelectCase && selectedCase) {
      onSelectCase(selectedCase)
    }
  }

  return (
    <div className="border-t border-[rgba(255,255,255,0.08)]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div className="flex items-center gap-2 text-[#ec4899]">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">Family Law Case Guide</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#8892a4]" />
        </motion.div>
      </button>

      {/* Selector Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Case Type Grid */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#8892a4]">Select Case Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {caseTypes.map(caseType => (
                    <button
                      key={caseType.id}
                      onClick={() => {
                        setSelectedCase(caseType.id)
                        setShowResult(false)
                      }}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedCase === caseType.id
                          ? 'bg-[rgba(236,72,153,0.15)] border border-[#ec4899]'
                          : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(236,72,153,0.5)]'
                      }`}
                    >
                      <span className="text-lg mb-1 block">{caseType.icon}</span>
                      <span className={`text-xs font-medium ${selectedCase === caseType.id ? 'text-[#ec4899]' : 'text-[#f0f4ff]'}`}>
                        {caseType.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              {selectedCase && (
                <button
                  onClick={handleViewDetails}
                  className="w-full py-2.5 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-[#ec4899] via-[#f472b6] to-[#ec4899] hover:opacity-90 transition-opacity"
                >
                  View Case Guide
                </button>
              )}

              {/* Result Card */}
              <AnimatePresence>
                {showResult && selectedCaseData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-[rgba(236,72,153,0.1)] border border-[rgba(236,72,153,0.25)] backdrop-blur-sm space-y-4"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">{selectedCaseData.icon}</span>
                      <p className="text-lg font-serif font-bold text-[#ec4899]">
                        {selectedCaseData.label}
                      </p>
                    </div>

                    {/* Applicable Laws */}
                    <div>
                      <p className="text-xs text-[#8892a4] mb-2">Applicable Laws:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseData.info.applicableLaws.map((law, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.05)] text-[#f0f4ff]">
                            {law}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Considerations */}
                    <div>
                      <p className="text-xs text-[#8892a4] mb-2">Key Considerations:</p>
                      <ul className="space-y-1">
                        {selectedCaseData.info.keyConsiderations.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#f0f4ff]">
                            <Scale className="w-3 h-3 text-[#ec4899] flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Court & Cost Info */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[#8892a4]">Jurisdiction</p>
                        <p className="text-sm text-[#f0f4ff]">{selectedCaseData.info.jurisdiction}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[#8892a4]">Estimated Legal Cost</p>
                        <p className="text-sm text-[#f0f4ff]">{selectedCaseData.info.estimatedCost}</p>
                      </div>
                    </div>

                    {/* Common Outcomes */}
                    <div>
                      <p className="text-xs text-[#8892a4] mb-2">Common Outcomes:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseData.info.commonOutcomes.map((outcome, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-lg bg-[rgba(236,72,153,0.15)] text-[#f472b6]">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
