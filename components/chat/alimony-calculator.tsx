'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, ChevronDown, TrendingUp, TrendingDown, Info, Sparkles } from 'lucide-react'

interface CalculationResult {
  minAmount: number
  maxAmount: number
  midAmount: number
  basedOn: string
  factors: string[]
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
]

// State-wise cost of living multiplier (relative to national average)
const stateMultipliers: Record<string, number> = {
  'Maharashtra': 1.25, 'Delhi': 1.30, 'Karnataka': 1.15, 'Tamil Nadu': 1.10,
  'Gujarat': 1.10, 'Telangana': 1.15, 'Kerala': 1.05, 'Haryana': 1.10,
  'Goa': 1.20, 'Punjab': 1.05, 'West Bengal': 1.00, 'Chandigarh': 1.15,
  'Uttar Pradesh': 0.90, 'Bihar': 0.85, 'Madhya Pradesh': 0.90, 'Rajasthan': 0.95,
  'Odisha': 0.90, 'Jharkhand': 0.88, 'Chhattisgarh': 0.88, 'Assam': 0.90,
}

export function AlimonyCalculator() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [husbandIncome, setHusbandIncome] = useState('')
  const [wifeIncome, setWifeIncome] = useState('')
  const [yearsMarried, setYearsMarried] = useState('')
  const [children, setChildren] = useState('0')
  const [custody, setCustody] = useState('wife')
  const [state, setState] = useState('Maharashtra')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const calculateAlimony = () => {
    const hIncome = parseFloat(husbandIncome) || 0
    const wIncome = parseFloat(wifeIncome) || 0
    const years = parseFloat(yearsMarried) || 0
    const numChildren = children === '3+' ? 3 : parseInt(children)

    if (hIncome === 0) {
      setResult(null)
      return
    }

    const factors: string[] = []

    // Base calculation: 20-25% of husband's gross income (Indian court standard)
    let minBase = hIncome * 0.20
    let maxBase = hIncome * 0.25

    // Income differential calculation
    const incomeDiff = hIncome - wIncome
    if (wIncome > 0) {
      // If wife earns, alimony is based on income differential
      const wifeRatio = wIncome / hIncome
      if (wifeRatio > 0.5) {
        minBase = incomeDiff * 0.15
        maxBase = incomeDiff * 0.20
        factors.push('Reduced due to wife\'s substantial income')
      } else if (wifeRatio > 0.25) {
        minBase = minBase * (1 - wifeRatio * 0.4)
        maxBase = maxBase * (1 - wifeRatio * 0.4)
        factors.push('Adjusted for wife\'s earning capacity')
      }
    } else {
      factors.push('Wife has no independent income')
    }

    // Marriage duration factor
    if (years > 15) {
      minBase = minBase * 1.20
      maxBase = maxBase * 1.25
      factors.push('Long-term marriage (15+ years) increases maintenance')
    } else if (years > 10) {
      minBase = minBase * 1.10
      maxBase = maxBase * 1.15
      factors.push('Medium-term marriage enhances claim')
    } else if (years < 3) {
      minBase = minBase * 0.85
      maxBase = maxBase * 0.90
      factors.push('Short marriage duration considered')
    }

    // Children factor
    if (numChildren > 0) {
      const childMultiplier = 1 + (numChildren * 0.08)
      minBase = minBase * childMultiplier
      maxBase = maxBase * childMultiplier
      factors.push(`${numChildren} child${numChildren > 1 ? 'ren' : ''} factored in maintenance`)
    }

    // Custody factor
    if (custody === 'wife' && numChildren > 0) {
      minBase = minBase * 1.15
      maxBase = maxBase * 1.20
      factors.push('Child custody with wife increases amount')
    } else if (custody === 'shared' && numChildren > 0) {
      minBase = minBase * 1.05
      maxBase = maxBase * 1.08
      factors.push('Shared custody arrangement considered')
    } else if (custody === 'husband' && numChildren > 0) {
      minBase = minBase * 0.95
      maxBase = maxBase * 0.98
      factors.push('Child custody with husband reduces spousal maintenance')
    }

    // State cost of living adjustment
    const stateMultiplier = stateMultipliers[state] || 1.0
    minBase = minBase * stateMultiplier
    maxBase = maxBase * stateMultiplier
    if (stateMultiplier > 1.1) {
      factors.push(`Higher cost of living in ${state}`)
    } else if (stateMultiplier < 0.95) {
      factors.push(`Lower cost of living in ${state}`)
    }

    // Ensure minimum floor based on state
    const minimumFloor = stateMultiplier * 10000
    minBase = Math.max(minBase, minimumFloor)

    // Cap at 40% of husband's income
    maxBase = Math.min(maxBase, hIncome * 0.40)
    minBase = Math.min(minBase, maxBase)

    setResult({
      minAmount: Math.round(minBase),
      maxAmount: Math.round(maxBase),
      midAmount: Math.round((minBase + maxBase) / 2),
      basedOn: 'Section 25, Hindu Marriage Act, 1955',
      factors: factors.slice(0, 4),
    })
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`
    }
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  const formatFullCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <div className="mx-4 my-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(201,168,76,0.08) 0%, rgba(5,13,31,0.95) 50%, rgba(201,168,76,0.05) 100%)',
          border: '1px solid rgba(201,168,76,0.25)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 0 40px rgba(201,168,76,0.08)',
        }}
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[rgba(201,168,76,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] shadow-lg">
              <Scale className="w-5 h-5 text-[#050d1f]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#f0f4ff]">Alimony Calculator</h3>
              <p className="text-xs text-[#8892a4]">Hindu Marriage Act Estimation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.05)]"
            >
              <ChevronDown className="w-4 h-4 text-[#c9a84c]" />
            </motion.div>
          </div>
        </button>

        {/* Calculator Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-5">
                {/* Decorative line */}
                <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

                {/* Income Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#c9a84c] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Monthly Income
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Husband's Income */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8892a4] flex items-center gap-1">
                        Husband{"'"}s Income
                      </label>
                      <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a84c] text-sm font-medium">₹</span>
                        <input
                          type="number"
                          value={husbandIncome}
                          onChange={(e) => setHusbandIncome(e.target.value)}
                          placeholder="50,000"
                          className="w-full pl-7 pr-3 py-2.5 bg-[rgba(5,13,31,0.8)] border border-[rgba(201,168,76,0.2)] rounded-xl text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Wife's Income */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8892a4]">Wife{"'"}s Income</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a84c] text-sm font-medium">₹</span>
                        <input
                          type="number"
                          value={wifeIncome}
                          onChange={(e) => setWifeIncome(e.target.value)}
                          placeholder="0"
                          className="w-full pl-7 pr-3 py-2.5 bg-[rgba(5,13,31,0.8)] border border-[rgba(201,168,76,0.2)] rounded-xl text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marriage & Family Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#c9a84c] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Marriage & Family
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Years Married */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8892a4]">Marriage Duration (Years)</label>
                      <input
                        type="number"
                        value={yearsMarried}
                        onChange={(e) => setYearsMarried(e.target.value)}
                        placeholder="5"
                        className="w-full px-3 py-2.5 bg-[rgba(5,13,31,0.8)] border border-[rgba(201,168,76,0.2)] rounded-xl text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)] transition-all"
                      />
                    </div>

                    {/* Number of Children */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8892a4]">Number of Children</label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[rgba(5,13,31,0.8)] border border-[rgba(201,168,76,0.2)] rounded-xl text-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)] transition-all appearance-none cursor-pointer"
                      >
                        <option value="0">No Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                        <option value="3+">3+ Children</option>
                      </select>
                    </div>

                    {/* Custody */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8892a4]">Child Custody</label>
                      <select
                        value={custody}
                        onChange={(e) => setCustody(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[rgba(5,13,31,0.8)] border border-[rgba(201,168,76,0.2)] rounded-xl text-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)] transition-all appearance-none cursor-pointer"
                      >
                        <option value="wife">With Wife</option>
                        <option value="husband">With Husband</option>
                        <option value="shared">Shared Custody</option>
                      </select>
                    </div>

                    {/* State */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#8892a4]">State of Residence</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[rgba(5,13,31,0.8)] border border-[rgba(201,168,76,0.2)] rounded-xl text-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[rgba(201,168,76,0.3)] transition-all appearance-none cursor-pointer"
                      >
                        {indianStates.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  onClick={calculateAlimony}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-[#050d1f] relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c 0%, #e8d48a 50%, #c9a84c 100%)',
                    boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Scale className="w-4 h-4" />
                    Calculate Estimated Alimony
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>

                {/* Result Card */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, rgba(201,168,76,0.15) 0%, rgba(5,13,31,0.95) 100%)',
                        border: '1px solid rgba(201,168,76,0.4)',
                        boxShadow: '0 8px 32px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[rgba(201,168,76,0.2)] to-transparent" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[rgba(201,168,76,0.1)] to-transparent" />
                      
                      <div className="relative p-5 space-y-4">
                        {/* Title */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#e8d48a]">
                              <Scale className="w-3.5 h-3.5 text-[#050d1f]" />
                            </div>
                            <span className="text-xs font-medium text-[#c9a84c] uppercase tracking-wider">Estimated Monthly Alimony</span>
                          </div>
                          <button 
                            onClick={() => setShowInfo(!showInfo)}
                            className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                          >
                            <Info className="w-4 h-4 text-[#8892a4]" />
                          </button>
                        </div>

                        {/* Amount Display */}
                        <div className="grid grid-cols-3 gap-3">
                          {/* Low Estimate */}
                          <div className="text-center p-3 rounded-xl bg-[rgba(5,13,31,0.6)] border border-[rgba(255,255,255,0.05)]">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <TrendingDown className="w-3 h-3 text-[#8892a4]" />
                              <span className="text-[10px] text-[#8892a4] uppercase">Low</span>
                            </div>
                            <p className="text-lg font-serif font-bold text-[#8892a4]">
                              ₹{formatCurrency(result.minAmount)}
                            </p>
                            <p className="text-[9px] text-[#4a5568]">/month</p>
                          </div>

                          {/* Most Likely */}
                          <div className="text-center p-3 rounded-xl relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(145deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.1) 100%)',
                              border: '1px solid rgba(201,168,76,0.4)',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,168,76,0.1)] to-transparent" />
                            <div className="relative">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Sparkles className="w-3 h-3 text-[#c9a84c]" />
                                <span className="text-[10px] text-[#c9a84c] uppercase font-semibold">Likely</span>
                              </div>
                              <p className="text-2xl font-serif font-bold text-[#c9a84c]">
                                ₹{formatCurrency(result.midAmount)}
                              </p>
                              <p className="text-[9px] text-[#c9a84c]/70">/month</p>
                            </div>
                          </div>

                          {/* High Estimate */}
                          <div className="text-center p-3 rounded-xl bg-[rgba(5,13,31,0.6)] border border-[rgba(255,255,255,0.05)]">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <TrendingUp className="w-3 h-3 text-[#8892a4]" />
                              <span className="text-[10px] text-[#8892a4] uppercase">High</span>
                            </div>
                            <p className="text-lg font-serif font-bold text-[#8892a4]">
                              ₹{formatCurrency(result.maxAmount)}
                            </p>
                            <p className="text-[9px] text-[#4a5568]">/month</p>
                          </div>
                        </div>

                        {/* Annual Projection */}
                        <div className="flex items-center justify-center gap-4 py-2 px-3 rounded-lg bg-[rgba(5,13,31,0.4)]">
                          <div className="text-center">
                            <p className="text-[10px] text-[#8892a4]">Annual Range</p>
                            <p className="text-sm font-medium text-[#f0f4ff]">
                              ₹{formatFullCurrency(result.minAmount * 12)} — ₹{formatFullCurrency(result.maxAmount * 12)}
                            </p>
                          </div>
                        </div>

                        {/* Factors */}
                        {result.factors.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-[10px] text-[#8892a4] uppercase tracking-wider">Key Factors Considered</p>
                            <div className="flex flex-wrap gap-1.5">
                              {result.factors.map((factor, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 rounded-md text-[10px] bg-[rgba(201,168,76,0.1)] text-[#c9a84c] border border-[rgba(201,168,76,0.2)]"
                                >
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Legal Reference */}
                        <div className="pt-3 border-t border-[rgba(255,255,255,0.05)]">
                          <p className="text-[10px] text-[#8892a4] text-center mb-2">
                            <span className="text-[#c9a84c]">Legal Basis:</span> {result.basedOn}
                          </p>
                          
                          {/* Info Tooltip */}
                          <AnimatePresence>
                            {showInfo && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-3 rounded-lg bg-[rgba(5,13,31,0.6)] border border-[rgba(255,255,255,0.05)] mt-2">
                                  <p className="text-[10px] text-[#8892a4] leading-relaxed">
                                    This estimate is based on general guidelines from Indian Family Courts. Actual alimony amounts are determined by judges considering: standard of living during marriage, health and age of parties, conduct of parties, and other relevant circumstances. Courts have wide discretion under Section 25 of the Hindu Marriage Act.
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
