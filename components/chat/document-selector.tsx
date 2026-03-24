'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronDown, CheckCircle } from 'lucide-react'

interface DocumentCategory {
  id: string
  label: string
  icon: string
  documents: DocumentType[]
}

interface DocumentType {
  id: string
  label: string
  requiredDocs: string[]
  processingTime: string
  fee: string
  notes?: string
}

const documentCategories: DocumentCategory[] = [
  {
    id: 'identity',
    label: 'Identity Documents',
    icon: '🪪',
    documents: [
      {
        id: 'passport',
        label: 'Passport (Fresh)',
        requiredDocs: ['Aadhaar Card', 'PAN Card', 'Birth Certificate', '2 Passport-size Photos', 'Address Proof', 'Educational Certificate (10th Marksheet)'],
        processingTime: '7-14 working days (Normal), 1-3 days (Tatkal)',
        fee: '₹1,500 (Normal), ₹3,500 (Tatkal)',
      },
      {
        id: 'pan',
        label: 'PAN Card',
        requiredDocs: ['Aadhaar Card', 'Passport-size Photo', 'Proof of Date of Birth', 'Address Proof'],
        processingTime: '15-20 working days',
        fee: '₹107 (Online), ₹115 (Physical)',
      },
      {
        id: 'voter-id',
        label: 'Voter ID Card',
        requiredDocs: ['Aadhaar Card', 'Passport-size Photo', 'Address Proof', 'Age Proof'],
        processingTime: '30-45 days',
        fee: 'Free',
      },
    ],
  },
  {
    id: 'vehicle',
    label: 'Vehicle Documents',
    icon: '🚗',
    documents: [
      {
        id: 'driving-license',
        label: 'Driving License (Fresh)',
        requiredDocs: ['Learner License', 'Aadhaar Card', 'Address Proof', 'Passport-size Photos', 'Medical Certificate (Form 1A)', 'Age Proof'],
        processingTime: '7-30 days',
        fee: '₹200-500 (varies by state)',
        notes: 'Must hold Learner License for 30 days before applying',
      },
      {
        id: 'rc-transfer',
        label: 'RC Transfer',
        requiredDocs: ['Form 29 & 30', 'Original RC', 'Insurance Certificate', 'PUC Certificate', 'NOC (if inter-state)', 'Address Proof of Buyer & Seller', 'Sale Deed'],
        processingTime: '15-30 days',
        fee: '₹300-500 + Road Tax (if inter-state)',
      },
      {
        id: 'learner-license',
        label: 'Learner License',
        requiredDocs: ['Aadhaar Card', 'Address Proof', 'Passport-size Photos', 'Age Proof', 'Medical Certificate'],
        processingTime: 'Same day (if slot available)',
        fee: '₹150-200',
      },
    ],
  },
  {
    id: 'property',
    label: 'Property Documents',
    icon: '🏠',
    documents: [
      {
        id: 'property-registration',
        label: 'Property Registration',
        requiredDocs: ['Sale Deed', 'Title Deed', 'Encumbrance Certificate', 'Property Tax Receipts', 'NOC from Society/Builder', 'Aadhaar & PAN of Buyer/Seller', 'Passport Photos', 'Power of Attorney (if applicable)'],
        processingTime: '1-7 days',
        fee: '5-8% of property value (Stamp Duty varies by state)',
      },
      {
        id: 'khata-transfer',
        label: 'Khata Transfer',
        requiredDocs: ['Registered Sale Deed', 'Previous Khata Extract', 'Property Tax Receipts', 'Encumbrance Certificate', 'Aadhaar Card', 'Application Form'],
        processingTime: '30-45 days',
        fee: '₹500-2,000',
      },
    ],
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: '📜',
    documents: [
      {
        id: 'birth-certificate',
        label: 'Birth Certificate',
        requiredDocs: ['Hospital Discharge Summary', 'Aadhaar of Parents', 'Marriage Certificate of Parents', 'Address Proof'],
        processingTime: '7-21 days',
        fee: '₹10-50',
        notes: 'Free if registered within 21 days of birth',
      },
      {
        id: 'marriage-certificate',
        label: 'Marriage Certificate',
        requiredDocs: ['Marriage Invitation Card', 'Wedding Photos', 'Aadhaar of Both Spouses', 'Age Proof', 'Address Proof', 'Witness Aadhaar (2 witnesses)'],
        processingTime: '7-30 days',
        fee: '₹100-500',
      },
      {
        id: 'income-certificate',
        label: 'Income Certificate',
        requiredDocs: ['Aadhaar Card', 'Salary Slips / IT Returns', 'Ration Card', 'Self Declaration', 'Address Proof'],
        processingTime: '7-15 days',
        fee: '₹20-50',
      },
    ],
  },
]

interface DocumentSelectorProps {
  onSelectDocument?: (docId: string, category: string) => void
}

export function DocumentSelector({ onSelectDocument }: DocumentSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDocument, setSelectedDocument] = useState('')
  const [showResult, setShowResult] = useState(false)

  const selectedCategoryData = documentCategories.find(c => c.id === selectedCategory)
  const selectedDocumentData = selectedCategoryData?.documents.find(d => d.id === selectedDocument)

  const handleViewRequirements = () => {
    setShowResult(true)
    if (onSelectDocument && selectedDocument && selectedCategory) {
      onSelectDocument(selectedDocument, selectedCategory)
    }
  }

  return (
    <div className="border-t border-[rgba(255,255,255,0.08)]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div className="flex items-center gap-2 text-[#7b61ff]">
          <FileText className="w-4 h-4" />
          <span className="text-sm font-medium">Document Requirements Finder</span>
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
              {/* Document Category */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#8892a4]">Document Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setSelectedDocument('')
                    setShowResult(false)
                  }}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#7b61ff] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select category</option>
                  {documentCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Document Type */}
              {selectedCategory && (
                <div className="space-y-1.5">
                  <label className="text-xs text-[#8892a4]">Document Type</label>
                  <select
                    value={selectedDocument}
                    onChange={(e) => {
                      setSelectedDocument(e.target.value)
                      setShowResult(false)
                    }}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#7b61ff] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select document</option>
                    {selectedCategoryData?.documents.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* View Requirements Button */}
              {selectedDocument && (
                <button
                  onClick={handleViewRequirements}
                  className="w-full py-2.5 rounded-lg font-medium text-sm text-[#050d1f] bg-gradient-to-r from-[#7b61ff] via-[#a78bfa] to-[#7b61ff] hover:opacity-90 transition-opacity"
                >
                  View Requirements
                </button>
              )}

              {/* Result Card */}
              <AnimatePresence>
                {showResult && selectedDocumentData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-[rgba(123,97,255,0.1)] border border-[rgba(123,97,255,0.25)] backdrop-blur-sm space-y-4"
                  >
                    <div className="text-center">
                      <p className="text-lg font-serif font-bold text-[#7b61ff]">
                        {selectedDocumentData.label}
                      </p>
                    </div>

                    {/* Required Documents List */}
                    <div>
                      <p className="text-xs text-[#8892a4] mb-2">Required Documents:</p>
                      <ul className="space-y-1.5">
                        {selectedDocumentData.requiredDocs.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#f0f4ff]">
                            <CheckCircle className="w-4 h-4 text-[#7b61ff] flex-shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Processing Time & Fee */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[#8892a4]">Processing Time</p>
                        <p className="text-sm text-[#f0f4ff]">{selectedDocumentData.processingTime}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[#8892a4]">Fee</p>
                        <p className="text-sm text-[#f0f4ff]">{selectedDocumentData.fee}</p>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedDocumentData.notes && (
                      <div className="p-2 rounded-lg bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)]">
                        <p className="text-xs text-[#6366f1]">Note: {selectedDocumentData.notes}</p>
                      </div>
                    )}
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
