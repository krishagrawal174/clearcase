'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ChevronDown, AlertTriangle } from 'lucide-react'

interface DisputeInfo {
  legalSections: string[]
  firstSteps: string[]
  timeLimit: string
  courtType: string
  estimatedDuration: string
}

const propertyTypes = [
  { id: 'residential', label: 'Residential Property' },
  { id: 'commercial', label: 'Commercial Property' },
  { id: 'agricultural', label: 'Agricultural Land' },
  { id: 'ancestral', label: 'Ancestral Property' },
  { id: 'joint', label: 'Joint/Co-owned Property' },
]

const disputeCategories: Record<string, { id: string; label: string; info: DisputeInfo }[]> = {
  residential: [
    {
      id: 'boundary',
      label: 'Boundary Dispute',
      info: {
        legalSections: ['Section 5 of Specific Relief Act', 'Section 27 of Limitation Act'],
        firstSteps: ['Get property surveyed', 'Collect all title documents', 'Send legal notice to neighbor', 'File suit for declaration if needed'],
        timeLimit: '12 years from encroachment',
        courtType: 'Civil Court',
        estimatedDuration: '2-5 years',
      },
    },
    {
      id: 'title',
      label: 'Title Dispute',
      info: {
        legalSections: ['Transfer of Property Act', 'Registration Act', 'Indian Evidence Act Section 68'],
        firstSteps: ['Obtain certified copies of title documents', 'Get Encumbrance Certificate', 'Verify chain of ownership', 'File declaratory suit'],
        timeLimit: '12 years',
        courtType: 'Civil Court',
        estimatedDuration: '3-7 years',
      },
    },
    {
      id: 'builder',
      label: 'Builder/Developer Dispute',
      info: {
        legalSections: ['RERA Act 2016', 'Consumer Protection Act 2019', 'Specific Relief Act'],
        firstSteps: ['File complaint with RERA Authority', 'Send legal notice to builder', 'Approach Consumer Forum', 'Join buyer association if available'],
        timeLimit: '3 years for RERA, 2 years for Consumer Forum',
        courtType: 'RERA Authority / Consumer Forum',
        estimatedDuration: '6 months - 2 years',
      },
    },
    {
      id: 'tenant',
      label: 'Tenant Eviction',
      info: {
        legalSections: ['State Rent Control Acts', 'Transfer of Property Act Section 106'],
        firstSteps: ['Send eviction notice (1 month)', 'Verify if tenant protected under Rent Control', 'File eviction suit in Rent Controller court'],
        timeLimit: 'Varies by state',
        courtType: 'Rent Controller / Civil Court',
        estimatedDuration: '1-3 years',
      },
    },
  ],
  commercial: [
    {
      id: 'lease',
      label: 'Lease Agreement Dispute',
      info: {
        legalSections: ['Transfer of Property Act', 'Indian Contract Act', 'Specific Relief Act'],
        firstSteps: ['Review lease agreement terms', 'Send legal notice', 'Attempt mediation', 'File civil suit if needed'],
        timeLimit: '3 years for breach of contract',
        courtType: 'Civil Court / Commercial Court',
        estimatedDuration: '1-3 years',
      },
    },
    {
      id: 'possession',
      label: 'Illegal Possession',
      info: {
        legalSections: ['Section 5 Specific Relief Act', 'Code of Civil Procedure Order 39'],
        firstSteps: ['File FIR if criminal trespass', 'File civil suit for possession', 'Apply for interim injunction'],
        timeLimit: '12 years',
        courtType: 'Civil Court',
        estimatedDuration: '2-5 years',
      },
    },
  ],
  agricultural: [
    {
      id: 'land-grabbing',
      label: 'Land Grabbing',
      info: {
        legalSections: ['State Land Grabbing Acts', 'Indian Penal Code Section 447'],
        firstSteps: ['File complaint at Tahsildar office', 'Lodge FIR for trespass', 'File suit in Civil Court', 'Apply for status quo'],
        timeLimit: 'Immediately for criminal, 12 years civil',
        courtType: 'Revenue Court / Civil Court',
        estimatedDuration: '2-7 years',
      },
    },
    {
      id: 'mutation',
      label: 'Mutation/Record Correction',
      info: {
        legalSections: ['State Land Revenue Acts', 'Right to Information Act'],
        firstSteps: ['Apply to Tahsildar for mutation', 'Submit supporting documents', 'Appeal to SDM if rejected', 'File writ petition in High Court'],
        timeLimit: 'Within 1 year of purchase',
        courtType: 'Revenue Court',
        estimatedDuration: '3-12 months',
      },
    },
  ],
  ancestral: [
    {
      id: 'partition',
      label: 'Partition of Property',
      info: {
        legalSections: ['Hindu Succession Act', 'Partition Act 1893', 'Indian Succession Act'],
        firstSteps: ['Identify all legal heirs', 'Value the property', 'Attempt family settlement', 'File partition suit if needed'],
        timeLimit: 'No limitation for partition',
        courtType: 'Civil Court',
        estimatedDuration: '3-10 years',
      },
    },
    {
      id: 'inheritance',
      label: 'Inheritance Rights Dispute',
      info: {
        legalSections: ['Hindu Succession Act 1956 (Amendment 2005)', 'Indian Succession Act', 'Muslim Personal Law'],
        firstSteps: ['Determine applicable personal law', 'Obtain legal heir certificate', 'Claim rightful share', 'File suit for declaration'],
        timeLimit: '12 years',
        courtType: 'Civil Court',
        estimatedDuration: '2-5 years',
      },
    },
  ],
  joint: [
    {
      id: 'co-owner',
      label: 'Co-owner Dispute',
      info: {
        legalSections: ['Transfer of Property Act Section 44', 'Partition Act'],
        firstSteps: ['Review co-ownership agreement', 'Send notice for partition', 'File suit for partition by metes and bounds', 'Seek court-ordered sale if indivisible'],
        timeLimit: 'No limitation',
        courtType: 'Civil Court',
        estimatedDuration: '2-5 years',
      },
    },
    {
      id: 'sale-objection',
      label: 'Objection to Sale by Co-owner',
      info: {
        legalSections: ['Transfer of Property Act', 'Right of Pre-emption laws'],
        firstSteps: ['Check if right of pre-emption exists', 'Send objection notice', 'Exercise pre-emption right if available', 'File suit to protect share'],
        timeLimit: '1 year from knowledge of sale',
        courtType: 'Civil Court',
        estimatedDuration: '1-3 years',
      },
    },
  ],
}

interface PropertySelectorProps {
  onSelectDispute?: (propertyType: string, disputeType: string) => void
}

export function PropertySelector({ onSelectDispute }: PropertySelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [propertyType, setPropertyType] = useState('')
  const [disputeType, setDisputeType] = useState('')
  const [showResult, setShowResult] = useState(false)

  const availableDisputes = propertyType ? disputeCategories[propertyType] || [] : []
  const selectedDispute = availableDisputes.find(d => d.id === disputeType)

  const handleAnalyze = () => {
    setShowResult(true)
    if (onSelectDispute && propertyType && disputeType) {
      onSelectDispute(propertyType, disputeType)
    }
  }

  return (
    <div className="border-t border-[rgba(255,255,255,0.08)]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div className="flex items-center gap-2 text-[#f97316]">
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Property Dispute Analyzer</span>
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
              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#8892a4]">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    setPropertyType(e.target.value)
                    setDisputeType('')
                    setShowResult(false)
                  }}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#f97316] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Dispute Category */}
              {propertyType && (
                <div className="space-y-1.5">
                  <label className="text-xs text-[#8892a4]">Dispute Type</label>
                  <select
                    value={disputeType}
                    onChange={(e) => {
                      setDisputeType(e.target.value)
                      setShowResult(false)
                    }}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#f97316] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select dispute type</option>
                    {availableDisputes.map(dispute => (
                      <option key={dispute.id} value={dispute.id}>{dispute.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Analyze Button */}
              {disputeType && (
                <button
                  onClick={handleAnalyze}
                  className="w-full py-2.5 rounded-lg font-medium text-sm text-[#050d1f] bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#f97316] hover:opacity-90 transition-opacity"
                >
                  Analyze Dispute
                </button>
              )}

              {/* Result Card */}
              <AnimatePresence>
                {showResult && selectedDispute && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.25)] backdrop-blur-sm space-y-4"
                  >
                    <div className="text-center">
                      <p className="text-lg font-serif font-bold text-[#f97316]">
                        {selectedDispute.label}
                      </p>
                    </div>

                    {/* Legal Sections */}
                    <div>
                      <p className="text-xs text-[#8892a4] mb-2">Applicable Laws:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDispute.info.legalSections.map((section, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.05)] text-[#f0f4ff]">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* First Steps */}
                    <div>
                      <p className="text-xs text-[#8892a4] mb-2">Recommended First Steps:</p>
                      <ol className="space-y-1.5 list-decimal list-inside">
                        {selectedDispute.info.firstSteps.map((step, index) => (
                          <li key={index} className="text-sm text-[#f0f4ff]">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Time & Court Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[#8892a4]">Time Limit</p>
                        <p className="text-sm text-[#f0f4ff]">{selectedDispute.info.timeLimit}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[#8892a4]">Court Type</p>
                        <p className="text-sm text-[#f0f4ff]">{selectedDispute.info.courtType}</p>
                      </div>
                    </div>

                    {/* Duration Warning */}
                    <div className="p-2 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#c9a84c]">
                        Estimated Duration: {selectedDispute.info.estimatedDuration}. Consider mediation/settlement for faster resolution.
                      </p>
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
