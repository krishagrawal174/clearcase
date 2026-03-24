'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Scale, Shield, AlertTriangle, Clock, Gavel, BookOpen, 
  ChevronDown, ArrowRight, RefreshCw, Bookmark, ExternalLink,
  Lock, Unlock, Eye, EyeOff, Sparkles
} from 'lucide-react'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimatedBackground } from '@/components/animated-background'
import { MobileNav } from '@/components/chat/mobile-nav'
import { Navbar } from '@/components/navbar'

interface LegalSection {
  ipcSection: string
  bnsSection: string
  title: string
  ipcDescription: string
  bnsDescription: string
  ipcPunishment: string
  bnsPunishment: string
  jailTerm: string
  bailable: boolean
  cognizable: boolean
  keywords: string[]
  changes: string[]
}

const legalSections: LegalSection[] = [
  {
    ipcSection: '302',
    bnsSection: '103',
    title: 'Murder',
    ipcDescription: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    bnsDescription: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine. BNS retains the same provisions with clearer language.',
    ipcPunishment: 'Death penalty or imprisonment for life and fine',
    bnsPunishment: 'Death penalty or imprisonment for life and fine',
    jailTerm: 'Life imprisonment or Death',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'killing', 'death', 'intentional killing', 'homicide', '302'],
    changes: ['Section number changed from 302 to 103', 'Language simplified for clarity']
  },
  {
    ipcSection: '420',
    bnsSection: '318',
    title: 'Cheating and Dishonestly Inducing Delivery of Property',
    ipcDescription: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy valuable security.',
    bnsDescription: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property, or to make, alter or destroy valuable security. Enhanced provisions for digital fraud.',
    ipcPunishment: 'Imprisonment up to 7 years and fine',
    bnsPunishment: 'Imprisonment up to 7 years and fine; higher for organized fraud',
    jailTerm: 'Up to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['fraud', 'cheating', '420', 'property fraud', 'financial fraud', 'scam', 'con artist'],
    changes: ['Section number changed from 420 to 318', 'Added provisions for digital/online fraud', 'Enhanced punishment for organized crime']
  },
  {
    ipcSection: '376',
    bnsSection: '64',
    title: 'Rape',
    ipcDescription: 'Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life.',
    bnsDescription: 'Whoever commits rape shall be punished with rigorous imprisonment for a term which shall not be less than ten years, but which may extend to imprisonment for life. Additional provisions for gang rape and repeat offenders.',
    ipcPunishment: 'Rigorous imprisonment from 10 years to life and fine',
    bnsPunishment: 'Rigorous imprisonment 10 years to life; Death for repeat offenders',
    jailTerm: '10 years to Life',
    bailable: false,
    cognizable: true,
    keywords: ['rape', 'sexual assault', 'sexual violence', 'forced intercourse', '376'],
    changes: ['Section number changed from 376 to 64', 'Death penalty added for repeat offenders', 'Enhanced punishment for gang rape (Section 70)', 'New provision for rape of minor under 12 - death penalty']
  },
  {
    ipcSection: '498A',
    bnsSection: '85',
    title: 'Cruelty by Husband or Relatives (Domestic Violence)',
    ipcDescription: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished.',
    bnsDescription: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished. Includes mental and economic abuse.',
    ipcPunishment: 'Imprisonment up to 3 years and fine',
    bnsPunishment: 'Imprisonment up to 3 years and fine',
    jailTerm: 'Up to 3 years',
    bailable: false,
    cognizable: true,
    keywords: ['domestic violence', 'cruelty', 'dowry harassment', 'marital cruelty', '498A', 'wife beating'],
    changes: ['Section number changed from 498A to 85', 'Expanded definition to include economic abuse', 'Mental cruelty more clearly defined']
  },
  {
    ipcSection: '304B',
    bnsSection: '80',
    title: 'Dowry Death',
    ipcDescription: 'Where the death of a woman is caused by burns or bodily injury or occurs otherwise than under normal circumstances within seven years of marriage and she was subjected to cruelty by husband or relatives.',
    bnsDescription: 'Where the death of a woman is caused by burns or bodily injury within seven years of marriage due to cruelty for dowry. Strengthened evidentiary provisions.',
    ipcPunishment: 'Imprisonment from 7 years to life',
    bnsPunishment: 'Imprisonment from 7 years to life',
    jailTerm: '7 years to Life',
    bailable: false,
    cognizable: true,
    keywords: ['dowry death', 'dowry', 'bride burning', 'cruelty by husband', '304B'],
    changes: ['Section number changed from 304B to 80', 'Stronger presumption of guilt in certain circumstances', 'Clearer definition of dowry-related cruelty']
  },
  {
    ipcSection: '354',
    bnsSection: '74',
    title: 'Assault or Criminal Force to Woman (Molestation)',
    ipcDescription: 'Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty.',
    bnsDescription: 'Whoever assaults or uses criminal force to any woman, intending to outrage her modesty. Includes unwanted physical contact.',
    ipcPunishment: 'Imprisonment from 1 to 5 years and fine',
    bnsPunishment: 'Imprisonment from 1 to 5 years and fine',
    jailTerm: '1 to 5 years',
    bailable: false,
    cognizable: true,
    keywords: ['molestation', 'outrage modesty', 'sexual harassment', 'eve teasing', 'touching', '354'],
    changes: ['Section number changed from 354 to 74', 'Broader definition of modesty', 'Includes digital harassment provisions']
  },
  {
    ipcSection: '307',
    bnsSection: '109',
    title: 'Attempt to Murder',
    ipcDescription: 'Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder.',
    bnsDescription: 'Whoever does any act with intention or knowledge that if death is caused, he would be guilty of murder. Enhanced punishment for use of dangerous weapons.',
    ipcPunishment: 'Imprisonment up to 10 years and fine; if hurt caused, life imprisonment',
    bnsPunishment: 'Imprisonment up to 10 years and fine; life imprisonment if hurt caused',
    jailTerm: 'Up to 10 years or Life',
    bailable: false,
    cognizable: true,
    keywords: ['attempt to murder', 'attempted murder', 'try to kill', '307'],
    changes: ['Section number changed from 307 to 109', 'Clearer distinction between attempt and preparation', 'Enhanced punishment for acid attacks']
  },
  {
    ipcSection: '304A',
    bnsSection: '106',
    title: 'Death by Negligence',
    ipcDescription: 'Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide.',
    bnsDescription: 'Whoever causes death by rash or negligent act. New provisions for hit-and-run cases with mandatory minimum punishment.',
    ipcPunishment: 'Imprisonment up to 2 years, or fine, or both',
    bnsPunishment: 'Up to 5 years and fine; 10 years for hit-and-run',
    jailTerm: 'Up to 2-10 years',
    bailable: true,
    cognizable: false,
    keywords: ['negligence', 'accident', 'rash driving', 'death by negligence', '304A', 'hit and run'],
    changes: ['Section number changed from 304A to 106', 'Punishment increased from 2 to 5 years', 'Special provision for hit-and-run: up to 10 years', 'Fleeing scene made specific aggravating factor']
  },
  {
    ipcSection: '379',
    bnsSection: '303',
    title: 'Theft',
    ipcDescription: 'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    bnsDescription: 'Whoever commits theft shall be punished. Enhanced penalties for theft of essential items and organized theft.',
    ipcPunishment: 'Imprisonment up to 3 years, or fine, or both',
    bnsPunishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: false,
    keywords: ['theft', 'steal', 'stealing', 'stole', '379'],
    changes: ['Section number changed from 379 to 303', 'Community service introduced as alternative', 'Enhanced punishment for organized theft']
  },
  {
    ipcSection: '323',
    bnsSection: '115',
    title: 'Voluntarily Causing Hurt',
    ipcDescription: 'Whoever voluntarily causes hurt, shall be punished with imprisonment which may extend to one year, or with fine up to one thousand rupees, or with both.',
    bnsDescription: 'Whoever voluntarily causes hurt shall be punished. Fine amounts updated to reflect current value.',
    ipcPunishment: 'Imprisonment up to 1 year, or fine up to Rs. 1,000, or both',
    bnsPunishment: 'Imprisonment up to 1 year, or fine up to Rs. 10,000, or both',
    jailTerm: 'Up to 1 year',
    bailable: true,
    cognizable: false,
    keywords: ['assault', 'hurt', 'injury', 'beating', 'hit', 'punch', '323'],
    changes: ['Section number changed from 323 to 115', 'Fine amount increased from Rs. 1,000 to Rs. 10,000', 'Community service option added']
  },
  {
    ipcSection: '506',
    bnsSection: '351',
    title: 'Criminal Intimidation',
    ipcDescription: 'Whoever commits the offence of criminal intimidation shall be punished with imprisonment which may extend to two years, or with fine, or with both.',
    bnsDescription: 'Whoever commits criminal intimidation shall be punished. Includes cyber threats and online intimidation.',
    ipcPunishment: 'Imprisonment up to 2 years, or fine, or both; up to 7 years for death threats',
    bnsPunishment: 'Imprisonment up to 2 years; up to 7 years for death threats',
    jailTerm: 'Up to 2-7 years',
    bailable: true,
    cognizable: false,
    keywords: ['threat', 'intimidation', 'blackmail', 'threatening', 'death threat', '506'],
    changes: ['Section number changed from 506 to 351', 'Cyber intimidation specifically included', 'Anonymous threats covered explicitly']
  },
  {
    ipcSection: '392',
    bnsSection: '309',
    title: 'Robbery',
    ipcDescription: 'Whoever commits robbery shall be punished with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine.',
    bnsDescription: 'Whoever commits robbery shall be punished with rigorous imprisonment. Enhanced punishment for armed robbery.',
    ipcPunishment: 'Rigorous imprisonment up to 10 years and fine',
    bnsPunishment: 'Rigorous imprisonment up to 10 years and fine; 14 years if armed',
    jailTerm: 'Up to 10-14 years',
    bailable: false,
    cognizable: true,
    keywords: ['robbery', 'loot', 'snatch', 'forceful theft', '392'],
    changes: ['Section number changed from 392 to 309', 'Armed robbery punishment increased', 'Use of vehicle in robbery made aggravating factor']
  },
  {
    ipcSection: '406',
    bnsSection: '316',
    title: 'Criminal Breach of Trust',
    ipcDescription: 'Whoever, being entrusted with property, or with dominion over property, dishonestly misappropriates or converts to his own use that property.',
    bnsDescription: 'Whoever being entrusted with property dishonestly misappropriates it. Enhanced provisions for public servants and bankers.',
    ipcPunishment: 'Imprisonment up to 3 years, or fine, or both',
    bnsPunishment: 'Imprisonment up to 3 years; up to 7 years for public servants',
    jailTerm: 'Up to 3-7 years',
    bailable: true,
    cognizable: false,
    keywords: ['breach of trust', 'misappropriation', 'embezzlement', '406'],
    changes: ['Section number changed from 406 to 316', 'Public servants face enhanced punishment', 'Corporate fraud provisions strengthened']
  },
  {
    ipcSection: '509',
    bnsSection: '79',
    title: 'Word, Gesture or Act to Insult Modesty of Woman',
    ipcDescription: 'Whoever, intending to insult the modesty of any woman, utters any word, makes any sound or gesture, or exhibits any object.',
    bnsDescription: 'Whoever intending to insult modesty of any woman, utters any word or makes any gesture. Includes digital communication.',
    ipcPunishment: 'Imprisonment up to 3 years and fine',
    bnsPunishment: 'Imprisonment up to 3 years and fine',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['eve teasing', 'catcalling', 'verbal harassment', 'obscene remarks', '509'],
    changes: ['Section number changed from 509 to 79', 'Online harassment explicitly covered', 'Sending obscene messages included']
  },
  {
    ipcSection: '500',
    bnsSection: '356',
    title: 'Defamation',
    ipcDescription: 'Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both.',
    bnsDescription: 'Whoever defames another shall be punished. Civil remedies emphasized alongside criminal provisions.',
    ipcPunishment: 'Simple imprisonment up to 2 years, or fine, or both',
    bnsPunishment: 'Simple imprisonment up to 2 years, or fine, or both',
    jailTerm: 'Up to 2 years',
    bailable: true,
    cognizable: false,
    keywords: ['defamation', 'slander', 'libel', 'reputation damage', '500'],
    changes: ['Section number changed from 500 to 356', 'Truth as defense clarified', 'Online defamation provisions added']
  }
]

const popularSections = [
  { ipc: '302', bns: '103', label: 'Murder', color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400' },
  { ipc: '420', bns: '318', label: 'Fraud', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400' },
  { ipc: '376', bns: '64', label: 'Rape', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400' },
  { ipc: '498A', bns: '85', label: 'Domestic Violence', color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400' },
  { ipc: '304B', bns: '80', label: 'Dowry Death', color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400' },
  { ipc: '354', bns: '74', label: 'Molestation', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400' },
]

// IPC to BNS conversion map
const ipcToBnsMap: Record<string, { bns: string; title: string }> = {
  '302': { bns: '103', title: 'Murder' },
  '420': { bns: '318', title: 'Cheating' },
  '376': { bns: '64', title: 'Rape' },
  '498A': { bns: '85', title: 'Domestic Violence' },
  '304B': { bns: '80', title: 'Dowry Death' },
  '354': { bns: '74', title: 'Molestation' },
  '307': { bns: '109', title: 'Attempt to Murder' },
  '304A': { bns: '106', title: 'Death by Negligence' },
  '379': { bns: '303', title: 'Theft' },
  '323': { bns: '115', title: 'Voluntarily Causing Hurt' },
  '506': { bns: '351', title: 'Criminal Intimidation' },
  '392': { bns: '309', title: 'Robbery' },
  '406': { bns: '316', title: 'Criminal Breach of Trust' },
  '509': { bns: '79', title: 'Insulting Modesty of Woman' },
  '500': { bns: '356', title: 'Defamation' },
  '299': { bns: '100', title: 'Culpable Homicide' },
  '300': { bns: '101', title: 'Murder Definition' },
  '304': { bns: '105', title: 'Culpable Homicide Not Murder' },
  '325': { bns: '117', title: 'Grievous Hurt' },
  '326': { bns: '118', title: 'Grievous Hurt by Weapon' },
  '363': { bns: '137', title: 'Kidnapping' },
  '366': { bns: '139', title: 'Kidnapping Woman' },
  '375': { bns: '63', title: 'Rape Definition' },
  '377': { bns: 'Decriminalized', title: 'Unnatural Offences' },
  '380': { bns: '305', title: 'Theft in Dwelling' },
  '384': { bns: '308', title: 'Extortion' },
  '395': { bns: '310', title: 'Dacoity' },
  '397': { bns: '312', title: 'Robbery with Attempt to Cause Death' },
  '415': { bns: '318', title: 'Cheating' },
  '417': { bns: '319', title: 'Punishment for Cheating' },
  '463': { bns: '336', title: 'Forgery' },
  '468': { bns: '338', title: 'Forgery for Cheating' },
  '471': { bns: '340', title: 'Using Forged Document' },
  '489A': { bns: '346', title: 'Counterfeiting Currency' },
  '494': { bns: '82', title: 'Bigamy' },
  '497': { bns: 'Decriminalized', title: 'Adultery' },
  '120B': { bns: '61', title: 'Criminal Conspiracy' },
  '124A': { bns: '152', title: 'Sedition' },
  '153A': { bns: '196', title: 'Promoting Enmity' },
  '295A': { bns: '299', title: 'Outraging Religious Feelings' },
  '354A': { bns: '75', title: 'Sexual Harassment' },
  '354B': { bns: '76', title: 'Assault to Disrobe' },
  '354C': { bns: '77', title: 'Voyeurism' },
  '354D': { bns: '78', title: 'Stalking' },
}

export default function IPCFinderPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [lawType, setLawType] = useState<'both' | 'ipc' | 'bns'>('both')
  const [converterInput, setConverterInput] = useState('')
  const [converterResult, setConverterResult] = useState<{ bns: string; title: string } | null>(null)
  const [showConverter, setShowConverter] = useState(false)

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return legalSections.filter(section => 
      section.keywords.some(keyword => keyword.includes(query)) ||
      section.title.toLowerCase().includes(query) ||
      section.ipcDescription.toLowerCase().includes(query) ||
      section.bnsDescription.toLowerCase().includes(query) ||
      section.ipcSection.includes(query) ||
      section.bnsSection.includes(query)
    )
  }, [searchQuery])

  const handlePopularSection = (ipc: string) => {
    setSearchQuery(ipc)
  }

  const handleConvert = () => {
    const section = converterInput.trim().toUpperCase()
    if (ipcToBnsMap[section]) {
      setConverterResult(ipcToBnsMap[section])
    } else {
      setConverterResult(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#050d1f] pb-20 md:pb-0">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-8 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] mb-6">
              <BookOpen className="w-4 h-4 text-[#c9a84c]" />
              <span className="text-sm text-[#c9a84c] font-medium">Indian Legal Database</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
              IPC & BNS Section{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] bg-clip-text text-transparent">
                Finder
              </span>
            </h1>
            <p className="text-lg text-[#8892a4] max-w-3xl mx-auto mb-8">
              Compare Indian Penal Code (1860) with Bharatiya Nyaya Sanhita (2023). 
              Find sections, punishments, and see what changed in the new criminal law.
            </p>

            {/* Law Type Toggle */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0a1628] border border-[rgba(255,255,255,0.08)]">
              <button
                onClick={() => setLawType('both')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lawType === 'both'
                    ? 'bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f]'
                    : 'text-[#8892a4] hover:text-[#f0f4ff]'
                }`}
              >
                Compare Both
              </button>
              <button
                onClick={() => setLawType('ipc')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lawType === 'ipc'
                    ? 'bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f]'
                    : 'text-[#8892a4] hover:text-[#f0f4ff]'
                }`}
              >
                Old IPC (1860)
              </button>
              <button
                onClick={() => setLawType('bns')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lawType === 'bns'
                    ? 'bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f]'
                    : 'text-[#8892a4] hover:text-[#f0f4ff]'
                }`}
              >
                New BNS (2023)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IPC to BNS Converter */}
      <section className="relative z-10 px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={() => setShowConverter(!showConverter)}
              className="w-full flex items-center justify-between p-4 bg-[#0a1628] border border-[rgba(201,168,76,0.2)] rounded-xl hover:border-[#c9a84c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a84c]/20 to-[#e8d48a]/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div className="text-left">
                  <h3 className="text-[#f0f4ff] font-semibold">IPC to BNS Converter</h3>
                  <p className="text-[#8892a4] text-sm">Enter old IPC section number to find new BNS equivalent</p>
                </div>
              </div>
              <motion.div animate={{ rotate: showConverter ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-[#c9a84c]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showConverter && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-[#0a1628] border-x border-b border-[rgba(201,168,76,0.2)] rounded-b-xl -mt-2">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-[#8892a4] text-sm mb-2 block">Enter IPC Section Number</label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={converterInput}
                            onChange={(e) => setConverterInput(e.target.value)}
                            placeholder="e.g., 302, 420, 376"
                            className="flex-1 bg-[#050d1f] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-[#5a6478] focus:border-[#c9a84c] focus:outline-none"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConvert}
                            className="px-6 py-3 bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f] font-semibold rounded-lg"
                          >
                            Convert
                          </motion.button>
                        </div>
                      </div>
                      {converterResult && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex-1 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3">
                            <ArrowRight className="w-5 h-5 text-[#22c55e]" />
                            <div>
                              <p className="text-[#8892a4] text-sm">BNS Section</p>
                              <p className="text-[#22c55e] text-2xl font-bold">{converterResult.bns}</p>
                              <p className="text-[#f0f4ff] text-sm">{converterResult.title}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {converterInput && !converterResult && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex-1 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg p-4"
                        >
                          <p className="text-[#ef4444] text-sm">Section not found in database. Try another section number.</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Search Box */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-[#0a1628] border border-[rgba(201,168,76,0.3)] rounded-2xl p-2">
              <div className="flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-[#c9a84c]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by crime, section number, or keyword..."
                  className="flex-1 bg-transparent text-[#f0f4ff] placeholder-[#5a6478] text-lg py-4 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#5a6478] hover:text-[#f0f4ff] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Popular Sections */}
          <div className="mb-8">
            <p className="text-[#8892a4] text-sm mb-3 text-center">Popular Sections</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSections.map((section) => (
                <motion.button
                  key={section.ipc}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePopularSection(section.ipc)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r ${section.color} border transition-all hover:shadow-lg`}
                >
                  <span className="font-bold">{section.ipc}</span>
                  <span className="text-[#8892a4]">→</span>
                  <span className="font-bold">{section.bns}</span>
                  <span className="ml-1 opacity-80">{section.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Results Section */}
      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {searchQuery && filteredSections.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#5a6478]" />
                </div>
                <p className="text-[#8892a4] text-lg">No sections found for "{searchQuery}"</p>
                <p className="text-[#5a6478] text-sm mt-2">Try different keywords or use popular section chips above</p>
              </motion.div>
            ) : searchQuery && filteredSections.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#f0f4ff] font-medium">
                    Found <span className="text-[#c9a84c]">{filteredSections.length}</span> relevant sections
                  </h2>
                </div>

                {filteredSections.map((section, index) => (
                  <motion.div
                    key={section.ipcSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-[#0a1628] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden hover:border-[rgba(201,168,76,0.3)] transition-all">
                      {/* Header */}
                      <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center gap-2">
                                {(lawType === 'both' || lawType === 'ipc') && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#1a2744] text-[#8892a4] font-bold text-sm border border-[rgba(255,255,255,0.1)]">
                                    IPC {section.ipcSection}
                                  </span>
                                )}
                                {lawType === 'both' && (
                                  <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
                                )}
                                {(lawType === 'both' || lawType === 'bns') && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f] font-bold text-sm">
                                    BNS {section.bnsSection}
                                  </span>
                                )}
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold text-[#f0f4ff]">{section.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                              section.bailable 
                                ? 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.3)]' 
                                : 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.3)]'
                            }`}>
                              {section.bailable ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                              {section.bailable ? 'Bailable' : 'Non-Bailable'}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                              section.cognizable 
                                ? 'bg-[rgba(251,146,60,0.1)] text-[#fb923c] border border-[rgba(251,146,60,0.3)]' 
                                : 'bg-[rgba(139,92,246,0.1)] text-[#a78bfa] border border-[rgba(139,92,246,0.3)]'
                            }`}>
                              {section.cognizable ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              {section.cognizable ? 'Cognizable' : 'Non-Cognizable'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Side by Side Content */}
                      <div className={`grid ${lawType === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'} divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.08)]`}>
                        {/* IPC Column */}
                        {(lawType === 'both' || lawType === 'ipc') && (
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-2 rounded-full bg-[#8892a4]" />
                              <h4 className="text-[#8892a4] font-semibold text-sm uppercase tracking-wider">Indian Penal Code (1860)</h4>
                            </div>
                            <p className="text-[#8892a4] text-sm leading-relaxed mb-4">{section.ipcDescription}</p>
                            <div className="bg-[#050d1f] rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Gavel className="w-4 h-4 text-[#8892a4]" />
                                <span className="text-[#8892a4] text-xs uppercase tracking-wider">Punishment</span>
                              </div>
                              <p className="text-[#f0f4ff] text-sm font-medium">{section.ipcPunishment}</p>
                            </div>
                          </div>
                        )}

                        {/* BNS Column */}
                        {(lawType === 'both' || lawType === 'bns') && (
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                              <h4 className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider">Bharatiya Nyaya Sanhita (2023)</h4>
                            </div>
                            <p className="text-[#8892a4] text-sm leading-relaxed mb-4">{section.bnsDescription}</p>
                            <div className="bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Gavel className="w-4 h-4 text-[#c9a84c]" />
                                <span className="text-[#c9a84c] text-xs uppercase tracking-wider">Punishment</span>
                              </div>
                              <p className="text-[#f0f4ff] text-sm font-medium">{section.bnsPunishment}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Key Changes */}
                      {lawType === 'both' && section.changes.length > 0 && (
                        <div className="p-6 bg-[rgba(234,179,8,0.05)] border-t border-[rgba(234,179,8,0.2)]">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <h4 className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">Key Changes in BNS</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {section.changes.map((change, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm border border-yellow-500/30"
                              >
                                {change}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expand Button */}
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.ipcSection ? null : section.ipcSection)}
                        className="w-full p-4 flex items-center justify-center gap-2 text-[#8892a4] hover:text-[#c9a84c] transition-colors border-t border-[rgba(255,255,255,0.08)]"
                      >
                        <span className="text-sm">{expandedSection === section.ipcSection ? 'Show Less' : 'Show More Details'}</span>
                        <motion.div animate={{ rotate: expandedSection === section.ipcSection ? 180 : 0 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedSection === section.ipcSection && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 bg-[#050d1f] border-t border-[rgba(255,255,255,0.08)]">
                              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-[#c9a84c]" />
                                    <span className="text-[#8892a4] text-xs uppercase">Jail Term</span>
                                  </div>
                                  <p className="text-[#f0f4ff] font-semibold">{section.jailTerm}</p>
                                </div>
                                <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                                  <div className="flex items-center gap-2 mb-2">
                                    {section.bailable ? <Unlock className="w-4 h-4 text-[#22c55e]" /> : <Lock className="w-4 h-4 text-[#ef4444]" />}
                                    <span className="text-[#8892a4] text-xs uppercase">Bail Status</span>
                                  </div>
                                  <p className={`font-semibold ${section.bailable ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                    {section.bailable ? 'Bailable' : 'Non-Bailable'}
                                  </p>
                                  <p className="text-[#5a6478] text-xs mt-1">
                                    {section.bailable ? 'Bail as a matter of right' : 'Court discretion required'}
                                  </p>
                                </div>
                                <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                                  <div className="flex items-center gap-2 mb-2">
                                    {section.cognizable ? <Eye className="w-4 h-4 text-[#fb923c]" /> : <EyeOff className="w-4 h-4 text-[#a78bfa]" />}
                                    <span className="text-[#8892a4] text-xs uppercase">Cognizability</span>
                                  </div>
                                  <p className={`font-semibold ${section.cognizable ? 'text-[#fb923c]' : 'text-[#a78bfa]'}`}>
                                    {section.cognizable ? 'Cognizable' : 'Non-Cognizable'}
                                  </p>
                                  <p className="text-[#5a6478] text-xs mt-1">
                                    {section.cognizable ? 'Arrest without warrant' : 'Magistrate permission needed'}
                                  </p>
                                </div>
                                <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Bookmark className="w-4 h-4 text-[#c9a84c]" />
                                    <span className="text-[#8892a4] text-xs uppercase">Quick Ref</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#8892a4]">IPC</span>
                                    <span className="text-[#f0f4ff] font-bold">{section.ipcSection}</span>
                                    <ArrowRight className="w-3 h-3 text-[#5a6478]" />
                                    <span className="text-[#c9a84c]">BNS</span>
                                    <span className="text-[#f0f4ff] font-bold">{section.bnsSection}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="max-w-lg mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#e8d48a]/10 flex items-center justify-center border border-[rgba(201,168,76,0.2)]">
                    <Scale className="w-12 h-12 text-[#c9a84c]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#f0f4ff] mb-3">Indian Legal Code Database</h3>
                  <p className="text-[#8892a4] mb-8">
                    Search for any crime or section number to compare IPC and BNS provisions side by side. 
                    Use the converter tool to find equivalent sections.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-xl mx-auto">
                    <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-2">
                        <Search className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <p className="text-[#f0f4ff] text-sm font-medium">Section Search</p>
                      <p className="text-[#5a6478] text-xs">Find by number</p>
                    </div>
                    <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-2">
                        <RefreshCw className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <p className="text-[#f0f4ff] text-sm font-medium">IPC to BNS</p>
                      <p className="text-[#5a6478] text-xs">Convert sections</p>
                    </div>
                    <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-2">
                        <Gavel className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <p className="text-[#f0f4ff] text-sm font-medium">Punishments</p>
                      <p className="text-[#5a6478] text-xs">Jail & fine details</p>
                    </div>
                    <div className="bg-[#0a1628] rounded-xl p-4 border border-[rgba(255,255,255,0.08)]">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-2">
                        <Sparkles className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <p className="text-[#f0f4ff] text-sm font-medium">Key Changes</p>
                      <p className="text-[#5a6478] text-xs">IPC vs BNS diff</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#c9a84c] font-semibold mb-2">Legal Disclaimer</h4>
                <p className="text-[#8892a4] text-sm leading-relaxed">
                  This information is for general awareness only. The Bharatiya Nyaya Sanhita (BNS) 2023 replaced the Indian Penal Code (IPC) 1860 
                  with effect from July 1, 2024. Sections may have amendments, exceptions, and judicial interpretations that affect their application. 
                  Always consult a qualified advocate for legal matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
