'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, ChevronDown } from 'lucide-react'

interface FineResult {
  minFine: number
  maxFine: number
  section: string
  additionalPenalty: string | null
}

const vehicleTypes = [
  { id: 'two-wheeler', label: 'Two Wheeler (Bike/Scooter)' },
  { id: 'car', label: 'Car / SUV' },
  { id: 'auto', label: 'Auto Rickshaw' },
  { id: 'commercial', label: 'Commercial Vehicle' },
  { id: 'heavy', label: 'Heavy Vehicle (Truck/Bus)' },
]

const violations = [
  { id: 'no-helmet', label: 'Riding without Helmet', minFine: 1000, maxFine: 1000, section: 'Section 194D MV Act', vehicleTypes: ['two-wheeler'], additionalPenalty: '3-month license disqualification' },
  { id: 'no-seatbelt', label: 'Driving without Seatbelt', minFine: 1000, maxFine: 1000, section: 'Section 194B(1) MV Act', vehicleTypes: ['car', 'commercial', 'heavy'], additionalPenalty: null },
  { id: 'red-light', label: 'Jumping Red Light', minFine: 1000, maxFine: 5000, section: 'Section 184 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: null },
  { id: 'over-speeding', label: 'Over Speeding', minFine: 1000, maxFine: 2000, section: 'Section 183 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: 'Higher fines for repeat offenders' },
  { id: 'drunk-driving', label: 'Drunk Driving', minFine: 10000, maxFine: 15000, section: 'Section 185 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: '6-month imprisonment and/or license cancellation' },
  { id: 'no-license', label: 'Driving without License', minFine: 5000, maxFine: 5000, section: 'Section 181 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: 'Vehicle can be impounded' },
  { id: 'no-insurance', label: 'Driving without Insurance', minFine: 2000, maxFine: 4000, section: 'Section 196 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: '3-month imprisonment for repeat offense' },
  { id: 'wrong-way', label: 'Driving on Wrong Side', minFine: 1000, maxFine: 5000, section: 'Section 184 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: null },
  { id: 'no-puc', label: 'No PUC Certificate', minFine: 1000, maxFine: 2000, section: 'Section 190(2) MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: null },
  { id: 'overloading', label: 'Overloading', minFine: 2000, maxFine: 20000, section: 'Section 194 MV Act', vehicleTypes: ['auto', 'commercial', 'heavy'], additionalPenalty: '₹2000 per extra ton' },
  { id: 'mobile-phone', label: 'Using Mobile while Driving', minFine: 1000, maxFine: 5000, section: 'Section 184 MV Act', vehicleTypes: ['two-wheeler', 'car', 'auto', 'commercial', 'heavy'], additionalPenalty: null },
  { id: 'triple-riding', label: 'Triple Riding', minFine: 1000, maxFine: 2000, section: 'Section 128 MV Act', vehicleTypes: ['two-wheeler'], additionalPenalty: null },
]

export function ChallanEstimator() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [vehicleType, setVehicleType] = useState('')
  const [violation, setViolation] = useState('')
  const [result, setResult] = useState<FineResult | null>(null)

  const filteredViolations = violations.filter(v => 
    !vehicleType || v.vehicleTypes.includes(vehicleType)
  )

  const calculateFine = () => {
    const selectedViolation = violations.find(v => v.id === violation)
    if (!selectedViolation) {
      setResult(null)
      return
    }

    // Commercial and heavy vehicles often have higher fines
    let multiplier = 1
    if (vehicleType === 'commercial') multiplier = 1.5
    if (vehicleType === 'heavy') multiplier = 2

    setResult({
      minFine: Math.round(selectedViolation.minFine * multiplier),
      maxFine: Math.round(selectedViolation.maxFine * multiplier),
      section: selectedViolation.section,
      additionalPenalty: selectedViolation.additionalPenalty,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <div className="border-t border-[rgba(255,255,255,0.08)]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div className="flex items-center gap-2 text-[#14b8a6]">
          <Car className="w-4 h-4" />
          <span className="text-sm font-medium">Traffic Fine Estimator</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#8892a4]" />
        </motion.div>
      </button>

      {/* Estimator Panel */}
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
              {/* Vehicle Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#8892a4]">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value)
                    setViolation('')
                    setResult(null)
                  }}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#14b8a6] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Violation Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#8892a4]">Violation Type</label>
                <select
                  value={violation}
                  onChange={(e) => setViolation(e.target.value)}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#14b8a6] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select violation</option>
                  {filteredViolations.map(v => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateFine}
                disabled={!violation}
                className="w-full py-2.5 rounded-lg font-medium text-sm text-[#050d1f] bg-gradient-to-r from-[#14b8a6] via-[#5eead4] to-[#14b8a6] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Estimate Fine
              </button>

              {/* Result Card */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-[rgba(20,184,166,0.1)] border border-[rgba(20,184,166,0.25)] backdrop-blur-sm"
                  >
                    <div className="text-center mb-3">
                      <p className="text-xs text-[#8892a4] mb-1">Estimated Fine Amount</p>
                      <p className="text-xl font-serif font-bold text-[#14b8a6]">
                        {result.minFine === result.maxFine 
                          ? `₹${formatCurrency(result.minFine)}`
                          : `₹${formatCurrency(result.minFine)} — ₹${formatCurrency(result.maxFine)}`
                        }
                      </p>
                    </div>
                    <div className="text-center mb-3">
                      <p className="text-xs text-[#8892a4]">Legal Reference:</p>
                      <p className="text-sm text-[#f0f4ff]">{result.section}</p>
                    </div>
                    {result.additionalPenalty && (
                      <div className="text-center mb-3 p-2 rounded-lg bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.25)]">
                        <p className="text-xs text-[#f97316]">Additional Penalty:</p>
                        <p className="text-sm text-[#fb923c]">{result.additionalPenalty}</p>
                      </div>
                    )}
                    <p className="text-[10px] text-[#8892a4] text-center leading-relaxed">
                      Fines as per Motor Vehicles (Amendment) Act, 2019. State-specific variations may apply.
                    </p>
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
