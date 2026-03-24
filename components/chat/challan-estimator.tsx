'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, ChevronDown, AlertTriangle, CheckCircle, ExternalLink, CreditCard, Building2, Info } from 'lucide-react'

interface FineResult {
  baseFine: number
  stateFine: number
  section: string
  offense: string
  isCompoundable: boolean
  compoundingDetails: string
  additionalPenalty: string | null
  paymentMethods: string[]
  paymentPortal: string
  courtRequired: boolean
  licenseImpact: string | null
}

const vehicleTypes = [
  { id: 'two-wheeler', label: 'Two Wheeler', icon: '🏍️', description: 'Motorcycle, Scooter, Moped' },
  { id: 'four-wheeler', label: 'Four Wheeler', icon: '🚗', description: 'Car, SUV, Jeep' },
  { id: 'commercial', label: 'Commercial', icon: '🚛', description: 'Truck, Bus, Taxi, Auto' },
]

const violations = [
  { 
    id: 'speeding', 
    label: 'Over Speeding', 
    baseFine: 1000,
    repeatFine: 2000,
    section: 'Section 183 MV Act', 
    vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'],
    isCompoundable: true,
    compoundingDetails: 'Can be compounded by paying fine at traffic booth or online within 60 days',
    additionalPenalty: 'Seizure of driving license for 3 months on second offense',
    licenseImpact: '3 months suspension on repeat offense',
    courtRequired: false
  },
  { 
    id: 'red-light', 
    label: 'Jumping Red Light', 
    baseFine: 1000,
    repeatFine: 5000,
    section: 'Section 184 MV Act', 
    vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'],
    isCompoundable: true,
    compoundingDetails: 'Compoundable for first offense. Court appearance may be required for repeat offenders',
    additionalPenalty: null,
    licenseImpact: null,
    courtRequired: false
  },
  { 
    id: 'no-helmet', 
    label: 'Riding without Helmet', 
    baseFine: 1000,
    repeatFine: 1000,
    section: 'Section 194D MV Act', 
    vehicleTypes: ['two-wheeler'],
    isCompoundable: true,
    compoundingDetails: 'Compoundable offense. Pay online or at nearest traffic police station',
    additionalPenalty: '3-month disqualification from holding license',
    licenseImpact: '3 months disqualification',
    courtRequired: false
  },
  { 
    id: 'drunk-driving', 
    label: 'Drunk Driving', 
    baseFine: 10000,
    repeatFine: 15000,
    section: 'Section 185 MV Act', 
    vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'],
    isCompoundable: false,
    compoundingDetails: 'Non-compoundable offense. Mandatory court appearance required',
    additionalPenalty: 'Imprisonment up to 6 months and/or fine up to ₹15,000. License cancellation for minimum 1 year',
    licenseImpact: 'Cancellation for 1 year minimum',
    courtRequired: true
  },
  { 
    id: 'no-seatbelt', 
    label: 'Not Wearing Seatbelt', 
    baseFine: 1000,
    repeatFine: 1000,
    section: 'Section 194B(1) MV Act', 
    vehicleTypes: ['four-wheeler', 'commercial'],
    isCompoundable: true,
    compoundingDetails: 'Compoundable offense. Can be paid on spot or online',
    additionalPenalty: null,
    licenseImpact: null,
    courtRequired: false
  },
  { 
    id: 'wrong-side', 
    label: 'Driving on Wrong Side', 
    baseFine: 1000,
    repeatFine: 5000,
    section: 'Section 184 MV Act', 
    vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'],
    isCompoundable: true,
    compoundingDetails: 'First offense is compoundable. Repeat offenses may require court appearance',
    additionalPenalty: 'Dangerous driving charge may apply in severe cases',
    licenseImpact: 'Possible suspension for repeat offenses',
    courtRequired: false
  },
  { 
    id: 'no-insurance', 
    label: 'Driving without Insurance', 
    baseFine: 2000,
    repeatFine: 4000,
    section: 'Section 196 MV Act', 
    vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'],
    isCompoundable: false,
    compoundingDetails: 'Non-compoundable for first offense (₹2000). Second offense: ₹4000 and/or 3 months imprisonment',
    additionalPenalty: '3 months imprisonment possible on repeat offense',
    licenseImpact: null,
    courtRequired: true
  },
  { 
    id: 'no-rc', 
    label: 'Driving without RC', 
    baseFine: 5000,
    repeatFine: 10000,
    section: 'Section 39 & 192 MV Act', 
    vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'],
    isCompoundable: true,
    compoundingDetails: 'Compoundable if valid RC is produced within 7 days at the police station',
    additionalPenalty: 'Vehicle may be impounded until valid RC is produced',
    licenseImpact: null,
    courtRequired: false
  },
]

const indianStates = [
  { id: 'AN', name: 'Andaman & Nicobar', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'AP', name: 'Andhra Pradesh', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'AR', name: 'Arunachal Pradesh', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'AS', name: 'Assam', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'BR', name: 'Bihar', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'CH', name: 'Chandigarh', multiplier: 1.3, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'CG', name: 'Chhattisgarh', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'DL', name: 'Delhi', multiplier: 1.5, portal: 'https://delhitrafficpolice.nic.in' },
  { id: 'GA', name: 'Goa', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'GJ', name: 'Gujarat', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'HR', name: 'Haryana', multiplier: 1.3, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'HP', name: 'Himachal Pradesh', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'JK', name: 'Jammu & Kashmir', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'JH', name: 'Jharkhand', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'KA', name: 'Karnataka', multiplier: 1.3, portal: 'https://ksp.karnataka.gov.in/echallan' },
  { id: 'KL', name: 'Kerala', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'MP', name: 'Madhya Pradesh', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'MH', name: 'Maharashtra', multiplier: 1.4, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'MN', name: 'Manipur', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'ML', name: 'Meghalaya', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'MZ', name: 'Mizoram', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'NL', name: 'Nagaland', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'OD', name: 'Odisha', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'PB', name: 'Punjab', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'RJ', name: 'Rajasthan', multiplier: 1.1, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'SK', name: 'Sikkim', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'TN', name: 'Tamil Nadu', multiplier: 1.3, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'TS', name: 'Telangana', multiplier: 1.3, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'TR', name: 'Tripura', multiplier: 1.0, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'UP', name: 'Uttar Pradesh', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'UK', name: 'Uttarakhand', multiplier: 1.1, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'WB', name: 'West Bengal', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
]

export function ChallanEstimator() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [vehicleType, setVehicleType] = useState('')
  const [violation, setViolation] = useState('')
  const [state, setState] = useState('')
  const [result, setResult] = useState<FineResult | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const filteredViolations = violations.filter(v => 
    !vehicleType || v.vehicleTypes.includes(vehicleType)
  )

  const calculateFine = () => {
    const selectedViolation = violations.find(v => v.id === violation)
    const selectedState = indianStates.find(s => s.id === state)
    
    if (!selectedViolation || !selectedState) {
      setResult(null)
      return
    }

    // Commercial vehicles have higher fines
    let vehicleMultiplier = 1
    if (vehicleType === 'commercial') vehicleMultiplier = 1.5

    const baseFine = Math.round(selectedViolation.baseFine * vehicleMultiplier)
    const stateFine = Math.round(baseFine * selectedState.multiplier)

    setResult({
      baseFine,
      stateFine,
      section: selectedViolation.section,
      offense: selectedViolation.label,
      isCompoundable: selectedViolation.isCompoundable,
      compoundingDetails: selectedViolation.compoundingDetails,
      additionalPenalty: selectedViolation.additionalPenalty,
      paymentMethods: ['Online Portal', 'Traffic Police Station', 'Court (if non-compoundable)'],
      paymentPortal: selectedState.portal,
      courtRequired: selectedViolation.courtRequired,
      licenseImpact: selectedViolation.licenseImpact,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <div className="border-b border-[rgba(255,255,255,0.08)]">
      {/* Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[rgba(239,68,68,0.05)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#ef4444] to-[#dc2626]">
            <Car className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-[#f0f4ff]">Challan Fine Estimator</span>
            <p className="text-[10px] text-[#8892a4]">Motor Vehicles Act, 2019</p>
          </div>
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
              {/* Vehicle Type Cards */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#8892a4] uppercase tracking-wide">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {vehicleTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setVehicleType(type.id)
                        setViolation('')
                        setResult(null)
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        vehicleType === type.id
                          ? 'bg-gradient-to-br from-[#ef4444]/20 to-[#dc2626]/10 border-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(239,68,68,0.3)]'
                      }`}
                    >
                      <div className="text-xl mb-1">{type.icon}</div>
                      <div className={`text-xs font-medium ${vehicleType === type.id ? 'text-[#ef4444]' : 'text-[#f0f4ff]'}`}>
                        {type.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Violation Type */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#8892a4] uppercase tracking-wide">Violation Type</label>
                <select
                  value={violation}
                  onChange={(e) => {
                    setViolation(e.target.value)
                    setResult(null)
                  }}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-sm text-[#f0f4ff] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]/20 transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238892a4' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
                >
                  <option value="">Select violation type</option>
                  {filteredViolations.map(v => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>

              {/* State Selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#8892a4] uppercase tracking-wide">State / UT</label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value)
                    setResult(null)
                  }}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-sm text-[#f0f4ff] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]/20 transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238892a4' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
                >
                  <option value="">Select your state</option>
                  {indianStates.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateFine}
                disabled={!vehicleType || !violation || !state}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#ef4444] via-[#dc2626] to-[#ef4444] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                Calculate Fine Amount
              </button>

              {/* Result Card */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/20 via-[#dc2626]/10 to-[#fecaca]/5" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef4444]/10 rounded-full blur-3xl" />
                    
                    <div className="relative p-5 border border-[#ef4444]/30">
                      {/* Fine Amount Header */}
                      <div className="text-center mb-5">
                        <p className="text-xs text-[#fca5a5] uppercase tracking-wider mb-2">Fine Amount</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-4xl font-bold text-white">
                            ₹{formatCurrency(result.stateFine)}
                          </span>
                        </div>
                        <p className="text-xs text-[#8892a4] mt-1">
                          Base: ₹{formatCurrency(result.baseFine)} × State multiplier
                        </p>
                      </div>

                      {/* Legal Reference */}
                      <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] mb-4">
                        <p className="text-xs text-[#8892a4] mb-1">Legal Reference</p>
                        <p className="text-sm font-medium text-[#f0f4ff]">{result.section}</p>
                        <p className="text-xs text-[#8892a4] mt-1">{result.offense}</p>
                      </div>

                      {/* Compoundable Status */}
                      <div className={`p-4 rounded-xl mb-4 ${
                        result.isCompoundable 
                          ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)]'
                          : 'bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)]'
                      }`}>
                        <div className="flex items-start gap-3">
                          {result.isCompoundable ? (
                            <CheckCircle className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className={`text-sm font-semibold ${result.isCompoundable ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                              {result.isCompoundable ? 'Compoundable Offense' : 'Non-Compoundable Offense'}
                            </p>
                            <p className="text-xs text-[#8892a4] mt-1 leading-relaxed">
                              {result.compoundingDetails}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Penalties */}
                      {result.additionalPenalty && (
                        <div className="p-3 rounded-xl bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.25)] mb-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-[#fbbf24]">Additional Penalty</p>
                              <p className="text-xs text-[#fcd34d] mt-0.5">{result.additionalPenalty}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* How to Pay */}
                      <div className="space-y-3">
                        <p className="text-xs font-medium text-[#8892a4] uppercase tracking-wide">How to Pay</p>
                        
                        {/* Online Payment */}
                        <a
                          href={result.paymentPortal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[#ef4444]/30 hover:bg-[rgba(239,68,68,0.05)] transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-[#ef4444]/20 to-[#dc2626]/10">
                              <CreditCard className="w-4 h-4 text-[#ef4444]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#f0f4ff]">Pay Online</p>
                              <p className="text-xs text-[#8892a4]">e-Challan Portal</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[#8892a4] group-hover:text-[#ef4444] transition-colors" />
                        </a>

                        {/* Traffic Station */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
                          <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                            <Building2 className="w-4 h-4 text-[#8892a4]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#f0f4ff]">Traffic Police Station</p>
                            <p className="text-xs text-[#8892a4]">Visit with challan receipt & ID proof</p>
                          </div>
                        </div>

                        {/* Court if required */}
                        {result.courtRequired && (
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
                            <div className="p-2 rounded-lg bg-[rgba(239,68,68,0.2)]">
                              <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#fca5a5]">Court Appearance Required</p>
                              <p className="text-xs text-[#8892a4]">This offense requires mandatory court hearing</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info Toggle */}
                      <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="w-full mt-4 flex items-center justify-center gap-2 text-xs text-[#8892a4] hover:text-[#f0f4ff] transition-colors"
                      >
                        <Info className="w-3 h-3" />
                        <span>{showInfo ? 'Hide' : 'Show'} Disclaimer</span>
                      </button>

                      <AnimatePresence>
                        {showInfo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[10px] text-[#8892a4] text-center leading-relaxed mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                              Fine amounts are as per Motor Vehicles (Amendment) Act, 2019. State governments may levy additional charges. 
                              Actual fines may vary based on specific circumstances and officer discretion. 
                              This calculator provides estimates only and should not be considered legal advice.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
