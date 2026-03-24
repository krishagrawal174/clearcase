'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, 
  Clock, 
  IndianRupee, 
  MapPin, 
  Download, 
  FileText,
  User,
  Home,
  Scale,
  Car,
  Building2,
  ChevronRight,
  FileCheck,
  Copy,
  ExternalLink
} from 'lucide-react'

interface DocumentRequirement {
  name: string
  type: 'original' | 'photocopy' | 'both'
  whereToGet: string
  estimatedCost: string
  notes?: string
}

interface DocumentType {
  id: string
  label: string
  description: string
  documents: DocumentRequirement[]
  estimatedTime: string
  totalEstimatedCost: string
  whereToApply: string
  applyLink?: string
}

interface Category {
  id: string
  label: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  documentTypes: DocumentType[]
}

const categories: Category[] = [
  {
    id: 'identity',
    label: 'Identity',
    icon: User,
    color: 'text-[#c9a84c]',
    bgColor: 'bg-[rgba(201,168,76,0.1)]',
    borderColor: 'border-[rgba(201,168,76,0.3)]',
    documentTypes: [
      {
        id: 'passport-fresh',
        label: 'Passport (Fresh)',
        description: 'First-time passport application',
        estimatedTime: '30-45 days',
        totalEstimatedCost: '₹1,500 - ₹2,000',
        whereToApply: 'Passport Seva Kendra',
        applyLink: 'https://passportindia.gov.in',
        documents: [
          { name: 'Birth Certificate', type: 'both', whereToGet: 'Municipal Corporation', estimatedCost: '₹50-100' },
          { name: 'Class 10 Marksheet', type: 'both', whereToGet: 'School/Board Office', estimatedCost: 'Free' },
          { name: 'Aadhar Card', type: 'both', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'PAN Card', type: 'photocopy', whereToGet: 'NSDL/UTIITSL', estimatedCost: '₹107' },
          { name: 'Passport Size Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹50-100', notes: 'White background, 2 copies' },
          { name: 'Address Proof', type: 'both', whereToGet: 'Varies', estimatedCost: 'Free-₹100', notes: 'Electricity bill/Bank statement' },
        ],
      },
      {
        id: 'passport-renewal',
        label: 'Passport Renewal',
        description: 'Renew existing passport',
        estimatedTime: '15-30 days',
        totalEstimatedCost: '₹1,500 - ₹2,000',
        whereToApply: 'Passport Seva Kendra',
        applyLink: 'https://passportindia.gov.in',
        documents: [
          { name: 'Old Passport', type: 'original', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Aadhar Card', type: 'both', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'Passport Size Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹50-100', notes: 'White background, 2 copies' },
          { name: 'Self Declaration', type: 'original', whereToGet: 'Self-attested', estimatedCost: 'Free', notes: 'If name/address changed' },
        ],
      },
      {
        id: 'aadhar-new',
        label: 'Aadhar Card (New)',
        description: 'First-time Aadhar enrollment',
        estimatedTime: '15-30 days',
        totalEstimatedCost: 'Free',
        whereToApply: 'Aadhar Enrollment Center',
        applyLink: 'https://uidai.gov.in',
        documents: [
          { name: 'Proof of Identity', type: 'original', whereToGet: 'Varies', estimatedCost: 'Free', notes: 'PAN/Voter ID/Passport' },
          { name: 'Proof of Address', type: 'original', whereToGet: 'Varies', estimatedCost: 'Free', notes: 'Utility bill/Bank statement' },
          { name: 'Date of Birth Proof', type: 'original', whereToGet: 'Varies', estimatedCost: 'Free', notes: 'Birth certificate/Passport' },
        ],
      },
      {
        id: 'pan-card',
        label: 'PAN Card',
        description: 'Permanent Account Number card',
        estimatedTime: '15-20 days',
        totalEstimatedCost: '₹107',
        whereToApply: 'NSDL/UTIITSL',
        applyLink: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
        documents: [
          { name: 'Aadhar Card', type: 'photocopy', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'Passport Size Photo', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹30', notes: '2 copies' },
          { name: 'Signature', type: 'original', whereToGet: 'Self', estimatedCost: 'Free', notes: 'On white paper' },
        ],
      },
    ],
  },
  {
    id: 'property',
    label: 'Property',
    icon: Home,
    color: 'text-[#7b61ff]',
    bgColor: 'bg-[rgba(123,97,255,0.1)]',
    borderColor: 'border-[rgba(123,97,255,0.3)]',
    documentTypes: [
      {
        id: 'property-registration',
        label: 'Property Registration',
        description: 'Register property transfer/sale',
        estimatedTime: '1-7 days',
        totalEstimatedCost: '5-7% of property value',
        whereToApply: 'Sub-Registrar Office',
        documents: [
          { name: 'Sale Deed Draft', type: 'original', whereToGet: 'Lawyer', estimatedCost: '₹5,000-15,000' },
          { name: 'Title Deed', type: 'both', whereToGet: 'Seller', estimatedCost: 'Free' },
          { name: 'Encumbrance Certificate', type: 'original', whereToGet: 'Sub-Registrar Office', estimatedCost: '₹200-500' },
          { name: 'Seller ID Proof', type: 'both', whereToGet: 'Seller', estimatedCost: 'Free' },
          { name: 'Buyer ID Proof', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'PAN Card (Both)', type: 'photocopy', whereToGet: 'NSDL', estimatedCost: '₹107' },
          { name: 'Passport Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹100', notes: '4 copies each party' },
          { name: 'Stamp Duty Receipt', type: 'original', whereToGet: 'Treasury/Bank', estimatedCost: 'As per circle rate' },
        ],
      },
      {
        id: 'property-mutation',
        label: 'Property Mutation',
        description: 'Transfer property records',
        estimatedTime: '15-45 days',
        totalEstimatedCost: '₹500-2,000',
        whereToApply: 'Municipal Corporation/Tehsil',
        documents: [
          { name: 'Registered Sale Deed', type: 'both', whereToGet: 'Sub-Registrar Office', estimatedCost: 'Free' },
          { name: 'Previous Property Tax Receipt', type: 'original', whereToGet: 'Municipal Office', estimatedCost: 'Free' },
          { name: 'ID Proof', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Death Certificate', type: 'both', whereToGet: 'Municipal Corporation', estimatedCost: '₹50', notes: 'If inherited property' },
          { name: 'Legal Heir Certificate', type: 'original', whereToGet: 'Tehsildar Office', estimatedCost: '₹100-200', notes: 'If inherited' },
        ],
      },
      {
        id: 'rental-agreement',
        label: 'Rental Agreement',
        description: 'Rent/lease agreement registration',
        estimatedTime: '1-3 days',
        totalEstimatedCost: '₹500-2,000',
        whereToApply: 'Sub-Registrar Office/Online',
        documents: [
          { name: 'Landlord ID Proof', type: 'both', whereToGet: 'Landlord', estimatedCost: 'Free' },
          { name: 'Tenant ID Proof', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Property Ownership Proof', type: 'photocopy', whereToGet: 'Landlord', estimatedCost: 'Free' },
          { name: 'Passport Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹60', notes: '2 each party' },
          { name: 'Stamp Paper', type: 'original', whereToGet: 'Stamp Vendor', estimatedCost: '₹100-500', notes: 'Based on rent amount' },
        ],
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    icon: Scale,
    color: 'text-[#14b8a6]',
    bgColor: 'bg-[rgba(20,184,166,0.1)]',
    borderColor: 'border-[rgba(20,184,166,0.3)]',
    documentTypes: [
      {
        id: 'divorce-mutual',
        label: 'Mutual Divorce',
        description: 'Divorce by mutual consent',
        estimatedTime: '6-18 months',
        totalEstimatedCost: '₹15,000 - ₹50,000',
        whereToApply: 'Family Court',
        documents: [
          { name: 'Marriage Certificate', type: 'both', whereToGet: 'Marriage Registrar', estimatedCost: '₹100-500' },
          { name: 'Address Proof (Both)', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'ID Proof (Both)', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Passport Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹200', notes: '8 copies each' },
          { name: 'Income Proof', type: 'both', whereToGet: 'Employer/CA', estimatedCost: 'Free-₹500', notes: 'Salary slips/ITR' },
          { name: 'Wedding Photos', type: 'photocopy', whereToGet: 'Self', estimatedCost: 'Free', notes: 'For verification' },
          { name: 'Settlement Agreement', type: 'original', whereToGet: 'Lawyer', estimatedCost: '₹5,000-10,000' },
        ],
      },
      {
        id: 'divorce-contested',
        label: 'Contested Divorce',
        description: 'Disputed divorce proceedings',
        estimatedTime: '2-5 years',
        totalEstimatedCost: '₹50,000 - ₹5,00,000+',
        whereToApply: 'Family Court',
        documents: [
          { name: 'Marriage Certificate', type: 'both', whereToGet: 'Marriage Registrar', estimatedCost: '₹100-500' },
          { name: 'Evidence Documents', type: 'both', whereToGet: 'Self/Investigator', estimatedCost: 'Varies', notes: 'Photos, messages, etc.' },
          { name: 'Medical Reports', type: 'original', whereToGet: 'Hospital', estimatedCost: '₹500-2,000', notes: 'If cruelty claimed' },
          { name: 'Police Complaints', type: 'both', whereToGet: 'Police Station', estimatedCost: 'Free', notes: 'If any filed' },
          { name: 'Financial Documents', type: 'both', whereToGet: 'Bank/Employer', estimatedCost: 'Free', notes: 'For alimony calculation' },
        ],
      },
      {
        id: 'will-registration',
        label: 'Will Registration',
        description: 'Register a legal will',
        estimatedTime: '1-2 days',
        totalEstimatedCost: '₹2,000 - ₹10,000',
        whereToApply: 'Sub-Registrar Office',
        documents: [
          { name: 'Draft Will', type: 'original', whereToGet: 'Lawyer', estimatedCost: '₹2,000-5,000' },
          { name: 'Testator ID Proof', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Witness ID Proof', type: 'both', whereToGet: 'Witnesses', estimatedCost: 'Free', notes: '2 witnesses required' },
          { name: 'Property Documents', type: 'photocopy', whereToGet: 'Self', estimatedCost: 'Free', notes: 'If property mentioned' },
          { name: 'Passport Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹90', notes: '3 copies' },
        ],
      },
    ],
  },
  {
    id: 'vehicle',
    label: 'Vehicle',
    icon: Car,
    color: 'text-[#f97316]',
    bgColor: 'bg-[rgba(249,115,22,0.1)]',
    borderColor: 'border-[rgba(249,115,22,0.3)]',
    documentTypes: [
      {
        id: 'driving-license-learner',
        label: 'Learner License',
        description: 'Learning driving permit',
        estimatedTime: '7-15 days',
        totalEstimatedCost: '₹200 - ₹500',
        whereToApply: 'Regional Transport Office (RTO)',
        applyLink: 'https://parivahan.gov.in',
        documents: [
          { name: 'Aadhar Card', type: 'both', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'Age Proof', type: 'both', whereToGet: 'School/Registrar', estimatedCost: 'Free', notes: 'Birth certificate/10th marksheet' },
          { name: 'Address Proof', type: 'both', whereToGet: 'Varies', estimatedCost: 'Free' },
          { name: 'Passport Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹60', notes: '6 copies' },
          { name: 'Medical Certificate', type: 'original', whereToGet: 'Registered Medical Practitioner', estimatedCost: '₹100-200', notes: 'Form 1A' },
        ],
      },
      {
        id: 'driving-license-permanent',
        label: 'Permanent Driving License',
        description: 'Full driving license',
        estimatedTime: '15-30 days',
        totalEstimatedCost: '₹500 - ₹1,000',
        whereToApply: 'Regional Transport Office (RTO)',
        applyLink: 'https://parivahan.gov.in',
        documents: [
          { name: 'Learner License', type: 'original', whereToGet: 'RTO', estimatedCost: 'Already obtained' },
          { name: 'Aadhar Card', type: 'both', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'Address Proof', type: 'both', whereToGet: 'Varies', estimatedCost: 'Free' },
          { name: 'Passport Photos', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹60', notes: '4 copies' },
          { name: 'Medical Certificate', type: 'original', whereToGet: 'Registered Medical Practitioner', estimatedCost: '₹100-200', notes: 'Form 1A' },
        ],
      },
      {
        id: 'vehicle-registration',
        label: 'Vehicle Registration',
        description: 'Register new vehicle',
        estimatedTime: '7-15 days',
        totalEstimatedCost: '8-12% of vehicle cost',
        whereToApply: 'Regional Transport Office (RTO)',
        documents: [
          { name: 'Sale Invoice', type: 'original', whereToGet: 'Dealer', estimatedCost: 'Included' },
          { name: 'Insurance Certificate', type: 'original', whereToGet: 'Insurance Company', estimatedCost: '₹5,000-15,000' },
          { name: 'PUC Certificate', type: 'original', whereToGet: 'PUC Center', estimatedCost: '₹100' },
          { name: 'Form 20', type: 'original', whereToGet: 'Dealer', estimatedCost: 'Free' },
          { name: 'ID Proof', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Address Proof', type: 'both', whereToGet: 'Self', estimatedCost: 'Free' },
          { name: 'Road Tax Receipt', type: 'original', whereToGet: 'RTO/Online', estimatedCost: 'Based on vehicle' },
        ],
      },
      {
        id: 'rc-transfer',
        label: 'RC Transfer',
        description: 'Transfer vehicle ownership',
        estimatedTime: '15-30 days',
        totalEstimatedCost: '₹1,000 - ₹5,000',
        whereToApply: 'Regional Transport Office (RTO)',
        documents: [
          { name: 'Original RC Book', type: 'original', whereToGet: 'Seller', estimatedCost: 'Free' },
          { name: 'Form 29 & 30', type: 'original', whereToGet: 'RTO', estimatedCost: '₹50', notes: 'Signed by both parties' },
          { name: 'Valid Insurance', type: 'original', whereToGet: 'Insurance Company', estimatedCost: 'Transfer fee' },
          { name: 'PUC Certificate', type: 'original', whereToGet: 'PUC Center', estimatedCost: '₹100' },
          { name: 'NOC from Bank', type: 'original', whereToGet: 'Bank', estimatedCost: 'Free', notes: 'If vehicle under loan' },
          { name: 'ID Proof (Both)', type: 'both', whereToGet: 'Self/Seller', estimatedCost: 'Free' },
        ],
      },
    ],
  },
  {
    id: 'government',
    label: 'Government Services',
    icon: Building2,
    color: 'text-[#ec4899]',
    bgColor: 'bg-[rgba(236,72,153,0.1)]',
    borderColor: 'border-[rgba(236,72,153,0.3)]',
    documentTypes: [
      {
        id: 'ration-card',
        label: 'Ration Card',
        description: 'Public Distribution System card',
        estimatedTime: '15-30 days',
        totalEstimatedCost: '₹0 - ₹45',
        whereToApply: 'Food & Civil Supplies Office',
        documents: [
          { name: 'Aadhar Card (All Members)', type: 'both', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50 each' },
          { name: 'Address Proof', type: 'both', whereToGet: 'Varies', estimatedCost: 'Free' },
          { name: 'Income Certificate', type: 'original', whereToGet: 'Tehsildar Office', estimatedCost: '₹50-100' },
          { name: 'Family Photo', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹100', notes: 'All members together' },
          { name: 'Bank Passbook', type: 'photocopy', whereToGet: 'Bank', estimatedCost: 'Free' },
          { name: 'LPG Connection Proof', type: 'photocopy', whereToGet: 'Gas Agency', estimatedCost: 'Free' },
        ],
      },
      {
        id: 'voter-id',
        label: 'Voter ID Card',
        description: 'Electoral Photo Identity Card',
        estimatedTime: '30-45 days',
        totalEstimatedCost: 'Free',
        whereToApply: 'Electoral Registration Office',
        applyLink: 'https://voters.eci.gov.in',
        documents: [
          { name: 'Age Proof', type: 'photocopy', whereToGet: 'School/Registrar', estimatedCost: 'Free', notes: 'Birth certificate/10th marksheet' },
          { name: 'Address Proof', type: 'photocopy', whereToGet: 'Varies', estimatedCost: 'Free' },
          { name: 'Passport Photo', type: 'original', whereToGet: 'Photo Studio', estimatedCost: '₹30', notes: '1 copy' },
          { name: 'Form 6', type: 'original', whereToGet: 'Online/ERO Office', estimatedCost: 'Free' },
        ],
      },
      {
        id: 'income-certificate',
        label: 'Income Certificate',
        description: 'Government income proof',
        estimatedTime: '7-15 days',
        totalEstimatedCost: '₹50 - ₹100',
        whereToApply: 'Tehsildar Office/Online',
        documents: [
          { name: 'Salary Slip', type: 'original', whereToGet: 'Employer', estimatedCost: 'Free', notes: 'Last 3 months' },
          { name: 'Bank Statement', type: 'original', whereToGet: 'Bank', estimatedCost: '₹100', notes: 'Last 6 months' },
          { name: 'ITR', type: 'photocopy', whereToGet: 'Income Tax Portal', estimatedCost: 'Free', notes: 'If filed' },
          { name: 'Aadhar Card', type: 'photocopy', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'Self Declaration', type: 'original', whereToGet: 'Self', estimatedCost: 'Free', notes: 'Affidavit if self-employed' },
        ],
      },
      {
        id: 'caste-certificate',
        label: 'Caste Certificate',
        description: 'SC/ST/OBC certificate',
        estimatedTime: '15-30 days',
        totalEstimatedCost: '₹50 - ₹200',
        whereToApply: 'Tehsildar Office/SDM Office',
        documents: [
          { name: 'Father/Grandfather Caste Certificate', type: 'both', whereToGet: 'Family', estimatedCost: 'Free', notes: 'If available' },
          { name: 'School Leaving Certificate', type: 'both', whereToGet: 'School', estimatedCost: '₹50-100' },
          { name: 'Aadhar Card', type: 'photocopy', whereToGet: 'Aadhar Enrollment Center', estimatedCost: '₹50' },
          { name: 'Ration Card', type: 'photocopy', whereToGet: 'Civil Supplies', estimatedCost: 'Free' },
          { name: 'Affidavit', type: 'original', whereToGet: 'Notary', estimatedCost: '₹100-200' },
        ],
      },
    ],
  },
]

export function DocumentChecker() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('identity')
  const [selectedDocTypeId, setSelectedDocTypeId] = useState<string>('passport-fresh')
  const [collectedDocs, setCollectedDocs] = useState<Set<string>>(new Set())

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)
  const selectedDocType = selectedCategory?.documentTypes.find((d) => d.id === selectedDocTypeId)

  const progress = useMemo(() => {
    if (!selectedDocType) return 0
    const collected = selectedDocType.documents.filter((_, i) => 
      collectedDocs.has(`${selectedDocTypeId}-${i}`)
    ).length
    return Math.round((collected / selectedDocType.documents.length) * 100)
  }, [selectedDocType, collectedDocs, selectedDocTypeId])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    const category = categories.find((c) => c.id === categoryId)
    if (category && category.documentTypes.length > 0) {
      setSelectedDocTypeId(category.documentTypes[0].id)
    }
  }

  const handleDocTypeChange = (docTypeId: string) => {
    setSelectedDocTypeId(docTypeId)
  }

  const toggleDocCollected = (index: number) => {
    const key = `${selectedDocTypeId}-${index}`
    setCollectedDocs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  const downloadPDF = () => {
    if (!selectedDocType) return

    const content = `
DOCUMENT CHECKLIST
==================
${selectedDocType.label}
${selectedDocType.description}

Processing Time: ${selectedDocType.estimatedTime}
Estimated Cost: ${selectedDocType.totalEstimatedCost}
Where to Apply: ${selectedDocType.whereToApply}

REQUIRED DOCUMENTS
------------------
${selectedDocType.documents.map((doc, i) => `
${i + 1}. ${doc.name}
   Type: ${doc.type === 'both' ? 'Original + Photocopy' : doc.type === 'original' ? 'Original' : 'Photocopy'}
   Where to Get: ${doc.whereToGet}
   Estimated Cost: ${doc.estimatedCost}${doc.notes ? `
   Note: ${doc.notes}` : ''}`).join('\n')}

Generated by ClearCase - Your Legal Document Assistant
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedDocType.label.replace(/\s+/g, '_')}_Checklist.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getTypeLabel = (type: 'original' | 'photocopy' | 'both') => {
    switch (type) {
      case 'original': return 'Original'
      case 'photocopy': return 'Photocopy'
      case 'both': return 'Original + Photocopy'
    }
  }

  const getTypeBadgeStyles = (type: 'original' | 'photocopy' | 'both') => {
    switch (type) {
      case 'original': return 'bg-[rgba(34,197,94,0.15)] text-green-400 border-[rgba(34,197,94,0.3)]'
      case 'photocopy': return 'bg-[rgba(59,130,246,0.15)] text-blue-400 border-[rgba(59,130,246,0.3)]'
      case 'both': return 'bg-[rgba(201,168,76,0.15)] text-[#c9a84c] border-[rgba(201,168,76,0.3)]'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategoryId === category.id
          return (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? `${category.bgColor} ${category.borderColor} ${category.color}`
                  : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[#8892a4] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{category.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Document Type Selector */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {selectedCategory.documentTypes.map((docType) => {
            const isSelected = selectedDocTypeId === docType.id
            return (
              <motion.button
                key={docType.id}
                onClick={() => handleDocTypeChange(docType.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? `${selectedCategory.bgColor} ${selectedCategory.borderColor}`
                    : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-medium mb-1 ${isSelected ? selectedCategory.color : 'text-[#f0f4ff]'}`}>
                      {docType.label}
                    </h4>
                    <p className="text-xs text-[#8892a4] line-clamp-2">{docType.description}</p>
                  </div>
                  {isSelected && (
                    <ChevronRight className={`w-4 h-4 ${selectedCategory.color}`} />
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      )}

      {/* Document Checklist */}
      <AnimatePresence mode="wait">
        {selectedDocType && (
          <motion.div
            key={selectedDocType.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress Bar */}
            <div className="mb-6 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#c9a84c]" />
                  <span className="font-medium text-[#f0f4ff]">Collection Progress</span>
                </div>
                <span className={`text-sm font-semibold ${progress === 100 ? 'text-green-400' : 'text-[#c9a84c]'}`}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full ${progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-[#c9a84c] to-[#e8d48a]'}`}
                />
              </div>
              <p className="mt-2 text-xs text-[#8892a4]">
                {collectedDocs.size > 0 
                  ? `${selectedDocType.documents.filter((_, i) => collectedDocs.has(`${selectedDocTypeId}-${i}`)).length} of ${selectedDocType.documents.length} documents collected`
                  : 'Click on documents to mark them as collected'}
              </p>
            </div>

            {/* Info Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
                <Clock className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-sm text-[#c9a84c]">{selectedDocType.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
                <IndianRupee className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">{selectedDocType.totalEstimatedCost}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[rgba(123,97,255,0.1)] border border-[rgba(123,97,255,0.2)]">
                <MapPin className="w-4 h-4 text-[#7b61ff]" />
                <span className="text-sm text-[#7b61ff]">{selectedDocType.whereToApply}</span>
              </div>
              {selectedDocType.applyLink && (
                <a
                  href={selectedDocType.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[rgba(236,72,153,0.1)] border border-[rgba(236,72,153,0.2)] hover:bg-[rgba(236,72,153,0.15)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#ec4899]" />
                  <span className="text-sm text-[#ec4899]">Apply Online</span>
                </a>
              )}
            </div>

            {/* Document Checklist Cards */}
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)]">
              <h3 className="font-serif text-xl font-semibold text-[#f0f4ff] mb-6">
                Required Documents
              </h3>
              <div className="space-y-3">
                {selectedDocType.documents.map((doc, index) => {
                  const isCollected = collectedDocs.has(`${selectedDocTypeId}-${index}`)
                  return (
                    <motion.div
                      key={`${selectedDocType.id}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleDocCollected(index)}
                      className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        isCollected
                          ? 'bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.3)]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                            isCollected
                              ? 'bg-gradient-to-br from-green-500 to-emerald-400 border-transparent'
                              : 'border-[rgba(255,255,255,0.2)] group-hover:border-[rgba(255,255,255,0.3)]'
                          }`}
                        >
                          {isCollected && <Check className="w-4 h-4 text-white" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className={`font-medium ${isCollected ? 'text-green-400 line-through' : 'text-[#f0f4ff]'}`}>
                              {doc.name}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeBadgeStyles(doc.type)}`}>
                              {getTypeLabel(doc.type)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-[#8892a4]">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{doc.whereToGet}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#8892a4]">
                              <IndianRupee className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{doc.estimatedCost}</span>
                            </div>
                          </div>
                          
                          {doc.notes && (
                            <p className="mt-2 text-xs text-[#c9a84c] flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {doc.notes}
                            </p>
                          )}
                        </div>

                        {/* Copy icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(doc.name)
                          }}
                          className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[rgba(255,255,255,0.05)] transition-all"
                          title="Copy document name"
                        >
                          <Copy className="w-4 h-4 text-[#8892a4]" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={downloadPDF}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f] font-semibold shadow-lg shadow-[rgba(201,168,76,0.25)] hover:shadow-[rgba(201,168,76,0.4)] transition-shadow"
              >
                <Download className="w-5 h-5" />
                Download Checklist
              </motion.button>
              
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-green-400"
                >
                  <Check className="w-5 h-5" />
                  <span className="font-medium">All documents collected!</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
