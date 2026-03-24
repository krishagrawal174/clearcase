'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Scale, Shield, AlertTriangle, Clock, Gavel, BookOpen, ChevronDown } from 'lucide-react'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimatedBackground } from '@/components/animated-background'
import { MobileNav } from '@/components/chat/mobile-nav'
import { Navbar } from '@/components/navbar'

interface IPCSection {
  section: string
  title: string
  description: string
  punishment: string
  jailTerm: string
  bailable: boolean
  cognizable: boolean
  keywords: string[]
}

const ipcSections: IPCSection[] = [
  // Theft related
  {
    section: '378',
    title: 'Theft',
    description: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking.',
    punishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: false,
    keywords: ['theft', 'steal', 'stealing', 'stole', 'robbed', 'taking property', 'mobile theft', 'phone stolen']
  },
  {
    section: '379',
    title: 'Punishment for Theft',
    description: 'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    punishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: false,
    keywords: ['theft', 'steal', 'punishment theft']
  },
  {
    section: '380',
    title: 'Theft in Dwelling House',
    description: 'Whoever commits theft in any building, tent or vessel, which building, tent or vessel is used as a human dwelling, or for the custody of property.',
    punishment: 'Imprisonment up to 7 years and fine',
    jailTerm: 'Up to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['theft', 'house theft', 'burglary', 'home robbery', 'dwelling theft']
  },
  {
    section: '381',
    title: 'Theft by Clerk or Servant',
    description: 'Whoever, being a clerk or servant, or being employed in the capacity of a clerk or servant, commits theft in respect of any property in the possession of his master or employer.',
    punishment: 'Imprisonment up to 7 years and fine',
    jailTerm: 'Up to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['theft', 'employee theft', 'servant theft', 'office theft', 'workplace theft']
  },
  // Assault related
  {
    section: '351',
    title: 'Assault',
    description: 'Whoever makes any gesture, or any preparation intending or knowing it to be likely that such gesture or preparation will cause any person present to apprehend that he who makes that gesture or preparation is about to use criminal force.',
    punishment: 'Imprisonment up to 3 months, or fine up to Rs. 500, or both',
    jailTerm: 'Up to 3 months',
    bailable: true,
    cognizable: false,
    keywords: ['assault', 'attack', 'threat', 'threatening', 'gesture']
  },
  {
    section: '352',
    title: 'Punishment for Assault',
    description: 'Whoever assaults or uses criminal force to any person otherwise than on grave and sudden provocation given by that person, shall be punished.',
    punishment: 'Imprisonment up to 3 months, or fine up to Rs. 500, or both',
    jailTerm: 'Up to 3 months',
    bailable: true,
    cognizable: false,
    keywords: ['assault', 'criminal force', 'physical assault', 'attack', 'hit', 'beat', 'slap']
  },
  {
    section: '323',
    title: 'Voluntarily Causing Hurt',
    description: 'Whoever, except in the case provided for by section 334, voluntarily causes hurt, shall be punished with imprisonment which may extend to one year, or with fine up to one thousand rupees, or with both.',
    punishment: 'Imprisonment up to 1 year, or fine up to Rs. 1,000, or both',
    jailTerm: 'Up to 1 year',
    bailable: true,
    cognizable: false,
    keywords: ['assault', 'hurt', 'injury', 'beating', 'hit', 'punch', 'kick', 'physical harm']
  },
  {
    section: '324',
    title: 'Voluntarily Causing Hurt by Dangerous Weapons',
    description: 'Whoever voluntarily causes hurt by means of any instrument for shooting, stabbing or cutting, or any instrument which, used as a weapon of offence, is likely to cause death.',
    punishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['assault', 'weapon', 'knife', 'stabbing', 'shooting', 'dangerous weapon', 'hurt with weapon']
  },
  {
    section: '325',
    title: 'Voluntarily Causing Grievous Hurt',
    description: 'Whoever voluntarily causes grievous hurt, shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine.',
    punishment: 'Imprisonment up to 7 years and fine',
    jailTerm: 'Up to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['assault', 'grievous hurt', 'serious injury', 'fracture', 'permanent injury', 'disfigurement']
  },
  // Fraud related
  {
    section: '415',
    title: 'Cheating',
    description: 'Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property.',
    punishment: 'Imprisonment up to 1 year, or fine, or both',
    jailTerm: 'Up to 1 year',
    bailable: true,
    cognizable: false,
    keywords: ['fraud', 'cheating', 'deceive', 'deception', 'scam', 'con', 'fake', 'fraudulent']
  },
  {
    section: '417',
    title: 'Punishment for Cheating',
    description: 'Whoever cheats shall be punished with imprisonment of either description for a term which may extend to one year, or with fine, or with both.',
    punishment: 'Imprisonment up to 1 year, or fine, or both',
    jailTerm: 'Up to 1 year',
    bailable: true,
    cognizable: false,
    keywords: ['fraud', 'cheating', 'punishment cheating']
  },
  {
    section: '418',
    title: 'Cheating with Knowledge of Wrongful Loss',
    description: 'Whoever cheats with the knowledge that he is likely thereby to cause wrongful loss to a person whose interest in the transaction he was bound to protect.',
    punishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: false,
    keywords: ['fraud', 'cheating', 'breach of trust', 'wrongful loss']
  },
  {
    section: '420',
    title: 'Cheating and Dishonestly Inducing Delivery of Property',
    description: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy valuable security.',
    punishment: 'Imprisonment up to 7 years and fine',
    jailTerm: 'Up to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['fraud', 'cheating', '420', 'property fraud', 'financial fraud', 'scam', 'con artist', 'fake documents']
  },
  {
    section: '406',
    title: 'Criminal Breach of Trust',
    description: 'Whoever, being entrusted with property, or with dominion over property, dishonestly misappropriates or converts to his own use that property.',
    punishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: false,
    keywords: ['fraud', 'breach of trust', 'misappropriation', 'embezzlement', 'trust violation']
  },
  // Harassment related
  {
    section: '354',
    title: 'Assault or Criminal Force to Woman with Intent to Outrage Modesty',
    description: 'Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty.',
    punishment: 'Imprisonment from 1 to 5 years and fine',
    jailTerm: '1 to 5 years',
    bailable: false,
    cognizable: true,
    keywords: ['harassment', 'molestation', 'outrage modesty', 'sexual harassment', 'eve teasing', 'touching']
  },
  {
    section: '354A',
    title: 'Sexual Harassment',
    description: 'Physical contact and advances involving unwelcome and explicit sexual overtures, demand or request for sexual favours, showing pornography, making sexually coloured remarks.',
    punishment: 'Imprisonment up to 3 years, or fine, or both (for physical contact); Up to 1 year, or fine, or both (for other acts)',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['harassment', 'sexual harassment', 'workplace harassment', 'unwanted advances', 'sexual remarks']
  },
  {
    section: '354B',
    title: 'Assault with Intent to Disrobe Woman',
    description: 'Any man who assaults or uses criminal force to any woman or abets such act with the intention of disrobing or compelling her to be naked.',
    punishment: 'Imprisonment from 3 to 7 years and fine',
    jailTerm: '3 to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['harassment', 'disrobing', 'stripping', 'assault woman']
  },
  {
    section: '354C',
    title: 'Voyeurism',
    description: 'Any man who watches, or captures the image of a woman engaging in a private act in circumstances where she would usually have the expectation of not being observed.',
    punishment: 'First offence: 1-3 years and fine; Second offence: 3-7 years and fine',
    jailTerm: '1 to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['harassment', 'voyeurism', 'peeping', 'privacy violation', 'hidden camera', 'recording']
  },
  {
    section: '354D',
    title: 'Stalking',
    description: 'Any man who follows a woman and contacts, or attempts to contact such woman to foster personal interaction repeatedly despite a clear indication of disinterest.',
    punishment: 'First offence: up to 3 years and fine; Second offence: up to 5 years and fine',
    jailTerm: 'Up to 5 years',
    bailable: true,
    cognizable: true,
    keywords: ['harassment', 'stalking', 'following', 'cyber stalking', 'repeated contact']
  },
  {
    section: '509',
    title: 'Word, Gesture or Act Intended to Insult Modesty of Woman',
    description: 'Whoever, intending to insult the modesty of any woman, utters any word, makes any sound or gesture, or exhibits any object, intending that such word or sound shall be heard.',
    punishment: 'Imprisonment up to 3 years and fine',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['harassment', 'eve teasing', 'catcalling', 'verbal harassment', 'obscene remarks', 'insult modesty']
  },
  // Murder related
  {
    section: '299',
    title: 'Culpable Homicide',
    description: 'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death.',
    punishment: 'Imprisonment for life, or up to 10 years, and fine',
    jailTerm: 'Life or up to 10 years',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'homicide', 'killing', 'death', 'culpable homicide']
  },
  {
    section: '300',
    title: 'Murder',
    description: 'Culpable homicide is murder if the act is done with the intention of causing death, or if it is done with the intention of causing such bodily injury as the offender knows to be likely to cause death.',
    punishment: 'Death penalty or imprisonment for life and fine',
    jailTerm: 'Life imprisonment or Death',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'killing', 'death', 'intentional killing', 'homicide']
  },
  {
    section: '302',
    title: 'Punishment for Murder',
    description: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    punishment: 'Death penalty or imprisonment for life and fine',
    jailTerm: 'Life imprisonment or Death',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'punishment murder', 'death penalty', 'life imprisonment']
  },
  {
    section: '304',
    title: 'Punishment for Culpable Homicide Not Amounting to Murder',
    description: 'Whoever commits culpable homicide not amounting to murder, if the act is done with intention of causing death or such bodily injury as is likely to cause death.',
    punishment: 'Imprisonment for life, or up to 10 years, and fine',
    jailTerm: 'Life or up to 10 years',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'homicide', 'manslaughter', 'accidental death', 'unintentional killing']
  },
  {
    section: '304A',
    title: 'Death by Negligence',
    description: 'Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide.',
    punishment: 'Imprisonment up to 2 years, or fine, or both',
    jailTerm: 'Up to 2 years',
    bailable: true,
    cognizable: false,
    keywords: ['murder', 'negligence', 'accident', 'rash driving', 'death by negligence', 'accidental death']
  },
  {
    section: '304B',
    title: 'Dowry Death',
    description: 'Where the death of a woman is caused by burns or bodily injury or occurs otherwise than under normal circumstances within seven years of marriage and she was subjected to cruelty by husband or relatives.',
    punishment: 'Imprisonment from 7 years to life',
    jailTerm: '7 years to Life',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'dowry death', 'dowry', 'bride burning', 'cruelty by husband']
  },
  {
    section: '307',
    title: 'Attempt to Murder',
    description: 'Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder.',
    punishment: 'Imprisonment up to 10 years and fine; if hurt caused, life imprisonment',
    jailTerm: 'Up to 10 years or Life',
    bailable: false,
    cognizable: true,
    keywords: ['murder', 'attempt to murder', 'attempted murder', 'try to kill', 'attack with intent']
  },
  // Cybercrime related
  {
    section: '66',
    title: 'Computer Related Offences (IT Act)',
    description: 'If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine up to five lakh rupees or with both.',
    punishment: 'Imprisonment up to 3 years or fine up to Rs. 5 lakh or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['cybercrime', 'hacking', 'computer crime', 'data theft', 'unauthorized access', 'IT Act']
  },
  {
    section: '66A',
    title: 'Sending Offensive Messages (Struck Down)',
    description: 'Section 66A was struck down by Supreme Court in 2015 as unconstitutional. However, similar offenses may be covered under other sections.',
    punishment: 'Section struck down - Not applicable',
    jailTerm: 'Not applicable',
    bailable: true,
    cognizable: false,
    keywords: ['cybercrime', 'offensive messages', 'online harassment', '66A']
  },
  {
    section: '66C',
    title: 'Identity Theft (IT Act)',
    description: 'Whoever, fraudulently or dishonestly makes use of the electronic signature, password or any other unique identification feature of any other person.',
    punishment: 'Imprisonment up to 3 years and fine up to Rs. 1 lakh',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['cybercrime', 'identity theft', 'password theft', 'impersonation', 'fake profile', 'phishing']
  },
  {
    section: '66D',
    title: 'Cheating by Personation Using Computer (IT Act)',
    description: 'Whoever, by means of any communication device or computer resource cheats by personation, shall be punished.',
    punishment: 'Imprisonment up to 3 years and fine up to Rs. 1 lakh',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['cybercrime', 'online fraud', 'phishing', 'impersonation', 'fake identity', 'online cheating']
  },
  {
    section: '66E',
    title: 'Violation of Privacy (IT Act)',
    description: 'Whoever, intentionally or knowingly captures, publishes or transmits the image of a private area of any person without his or her consent.',
    punishment: 'Imprisonment up to 3 years or fine up to Rs. 2 lakh or both',
    jailTerm: 'Up to 3 years',
    bailable: true,
    cognizable: true,
    keywords: ['cybercrime', 'privacy violation', 'intimate images', 'revenge porn', 'morphed images', 'MMS']
  },
  {
    section: '67',
    title: 'Publishing Obscene Material in Electronic Form (IT Act)',
    description: 'Whoever publishes or transmits or causes to be published or transmitted in the electronic form, any material which is lascivious or appeals to the prurient interest.',
    punishment: 'First offence: 3 years and Rs. 5 lakh fine; Subsequent: 5 years and Rs. 10 lakh fine',
    jailTerm: '3 to 5 years',
    bailable: true,
    cognizable: true,
    keywords: ['cybercrime', 'obscene content', 'pornography', 'adult content', 'explicit material']
  },
  {
    section: '67A',
    title: 'Publishing Sexually Explicit Material (IT Act)',
    description: 'Whoever publishes or transmits or causes to be published or transmitted in the electronic form any material which contains sexually explicit act or conduct.',
    punishment: 'First offence: 5 years and Rs. 10 lakh fine; Subsequent: 7 years and Rs. 10 lakh fine',
    jailTerm: '5 to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['cybercrime', 'sexually explicit', 'pornography', 'explicit content', 'sexual content']
  },
  {
    section: '67B',
    title: 'Child Pornography (IT Act)',
    description: 'Whoever publishes or transmits or causes to be published or transmitted material in any electronic form which depicts children engaged in sexually explicit act or conduct.',
    punishment: 'First offence: 5 years and Rs. 10 lakh fine; Subsequent: 7 years and Rs. 10 lakh fine',
    jailTerm: '5 to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['cybercrime', 'child pornography', 'CSAM', 'child abuse', 'minor exploitation']
  },
  // Additional common sections
  {
    section: '498A',
    title: 'Cruelty by Husband or Relatives',
    description: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished.',
    punishment: 'Imprisonment up to 3 years and fine',
    jailTerm: 'Up to 3 years',
    bailable: false,
    cognizable: true,
    keywords: ['harassment', 'domestic violence', 'cruelty', 'dowry harassment', 'marital cruelty', '498A']
  },
  {
    section: '376',
    title: 'Rape',
    description: 'Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life.',
    punishment: 'Rigorous imprisonment from 10 years to life and fine',
    jailTerm: '10 years to Life',
    bailable: false,
    cognizable: true,
    keywords: ['rape', 'sexual assault', 'sexual violence', 'forced intercourse']
  },
  {
    section: '395',
    title: 'Dacoity',
    description: 'Whoever commits dacoity shall be punished with imprisonment for life, or with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine.',
    punishment: 'Life imprisonment or up to 10 years and fine',
    jailTerm: 'Life or up to 10 years',
    bailable: false,
    cognizable: true,
    keywords: ['theft', 'dacoity', 'robbery', 'gang robbery', 'armed robbery']
  },
  {
    section: '392',
    title: 'Robbery',
    description: 'Whoever commits robbery shall be punished with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine.',
    punishment: 'Rigorous imprisonment up to 10 years and fine',
    jailTerm: 'Up to 10 years',
    bailable: false,
    cognizable: true,
    keywords: ['theft', 'robbery', 'loot', 'snatch', 'forceful theft']
  },
  {
    section: '506',
    title: 'Criminal Intimidation',
    description: 'Whoever commits the offence of criminal intimidation shall be punished with imprisonment which may extend to two years, or with fine, or with both.',
    punishment: 'Imprisonment up to 2 years, or fine, or both; up to 7 years for death threats',
    jailTerm: 'Up to 2-7 years',
    bailable: true,
    cognizable: false,
    keywords: ['threat', 'intimidation', 'blackmail', 'threatening', 'death threat', 'extortion threat']
  },
  {
    section: '384',
    title: 'Extortion',
    description: 'Whoever commits extortion shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    punishment: 'Imprisonment up to 3 years, or fine, or both',
    jailTerm: 'Up to 3 years',
    bailable: false,
    cognizable: true,
    keywords: ['extortion', 'blackmail', 'threat for money', 'ransom', 'demanding money']
  },
  {
    section: '500',
    title: 'Defamation',
    description: 'Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both.',
    punishment: 'Simple imprisonment up to 2 years, or fine, or both',
    jailTerm: 'Up to 2 years',
    bailable: true,
    cognizable: false,
    keywords: ['defamation', 'slander', 'libel', 'reputation damage', 'false accusation', 'character assassination']
  },
  {
    section: '468',
    title: 'Forgery for Purpose of Cheating',
    description: 'Whoever commits forgery, intending that the document or electronic record forged shall be used for the purpose of cheating.',
    punishment: 'Imprisonment up to 7 years and fine',
    jailTerm: 'Up to 7 years',
    bailable: false,
    cognizable: true,
    keywords: ['fraud', 'forgery', 'fake documents', 'forged signature', 'document fraud', 'cheating']
  },
  {
    section: '471',
    title: 'Using Forged Document as Genuine',
    description: 'Whoever fraudulently or dishonestly uses as genuine any document or electronic record which he knows or has reason to believe to be a forged document.',
    punishment: 'Same as forgery of such document',
    jailTerm: 'Varies by document type',
    bailable: false,
    cognizable: true,
    keywords: ['fraud', 'forgery', 'fake documents', 'using forged document', 'false document']
  }
]

const quickButtons = [
  { label: 'Theft', icon: Shield, query: 'theft' },
  { label: 'Assault', icon: AlertTriangle, query: 'assault' },
  { label: 'Fraud', icon: Scale, query: 'fraud' },
  { label: 'Harassment', icon: Shield, query: 'harassment' },
  { label: 'Murder', icon: Gavel, query: 'murder' },
  { label: 'Cybercrime', icon: BookOpen, query: 'cybercrime' },
]

export default function IPCFinderPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return ipcSections.filter(section => 
      section.keywords.some(keyword => keyword.includes(query)) ||
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.section.includes(query)
    )
  }, [searchQuery])

  const handleQuickButton = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen bg-[#050d1f] pb-20 md:pb-0">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-8 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] mb-6">
              <BookOpen className="w-4 h-4 text-[#c9a84c]" />
              <span className="text-sm text-[#c9a84c] font-medium">Indian Penal Code Database</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
              IPC Section{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] bg-clip-text text-transparent">
                Finder
              </span>
            </h1>
            <p className="text-lg text-[#8892a4] max-w-2xl mx-auto">
              Search any crime or situation to find relevant IPC sections with punishments, 
              bail status, and legal provisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
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
                  placeholder="Search crime or situation (e.g., theft, assault, cheating...)"
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

          {/* Quick Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {quickButtons.map((button) => (
              <motion.button
                key={button.query}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickButton(button.query)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  searchQuery === button.query
                    ? 'bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f]'
                    : 'bg-[#0a1628] border border-[rgba(201,168,76,0.2)] text-[#c9a84c] hover:border-[#c9a84c]'
                }`}
              >
                <button.icon className="w-4 h-4" />
                {button.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Results Section */}
      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
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
                <p className="text-[#5a6478] text-sm mt-2">Try different keywords or use quick search buttons above</p>
              </motion.div>
            ) : searchQuery && filteredSections.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#f0f4ff] font-medium">
                    Found <span className="text-[#c9a84c]">{filteredSections.length}</span> relevant sections
                  </h2>
                </div>

                {filteredSections.map((section, index) => (
                  <motion.div
                    key={section.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div 
                      className={`bg-[#0a1628] border rounded-2xl overflow-hidden transition-all duration-300 ${
                        expandedSection === section.section 
                          ? 'border-[#c9a84c]' 
                          : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.3)]'
                      }`}
                    >
                      {/* Header */}
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.section ? null : section.section)}
                        className="w-full p-6 text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e8d48a] text-[#050d1f] font-bold text-sm">
                                Section {section.section}
                              </span>
                              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                                section.bailable 
                                  ? 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.3)]' 
                                  : 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.3)]'
                              }`}>
                                {section.bailable ? 'Bailable' : 'Non-Bailable'}
                              </span>
                              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                                section.cognizable 
                                  ? 'bg-[rgba(251,146,60,0.1)] text-[#fb923c] border border-[rgba(251,146,60,0.3)]' 
                                  : 'bg-[rgba(139,92,246,0.1)] text-[#a78bfa] border border-[rgba(139,92,246,0.3)]'
                              }`}>
                                {section.cognizable ? 'Cognizable' : 'Non-Cognizable'}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#f0f4ff] mb-2">{section.title}</h3>
                            <p className="text-[#8892a4] text-sm line-clamp-2">{section.description}</p>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedSection === section.section ? 180 : 0 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronDown className="w-5 h-5 text-[#5a6478]" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedSection === section.section && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 border-t border-[rgba(255,255,255,0.08)]">
                              <div className="pt-6 grid md:grid-cols-2 gap-6">
                                {/* Full Description */}
                                <div className="md:col-span-2">
                                  <h4 className="text-[#c9a84c] font-semibold text-sm mb-2 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    Full Description
                                  </h4>
                                  <p className="text-[#8892a4] text-sm leading-relaxed">{section.description}</p>
                                </div>

                                {/* Punishment */}
                                <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-4">
                                  <h4 className="text-[#ef4444] font-semibold text-sm mb-2 flex items-center gap-2">
                                    <Gavel className="w-4 h-4" />
                                    Punishment
                                  </h4>
                                  <p className="text-[#f0f4ff] text-sm font-medium">{section.punishment}</p>
                                </div>

                                {/* Jail Term */}
                                <div className="bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] rounded-xl p-4">
                                  <h4 className="text-[#c9a84c] font-semibold text-sm mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Jail Term
                                  </h4>
                                  <p className="text-[#f0f4ff] text-sm font-medium">{section.jailTerm}</p>
                                </div>

                                {/* Legal Status Info */}
                                <div className="md:col-span-2 bg-[#050d1f] rounded-xl p-4">
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-[#8892a4] text-xs uppercase tracking-wider mb-2">Bail Status</h4>
                                      <p className={`font-semibold ${section.bailable ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                        {section.bailable ? 'Bailable Offence' : 'Non-Bailable Offence'}
                                      </p>
                                      <p className="text-[#5a6478] text-xs mt-1">
                                        {section.bailable 
                                          ? 'Accused can get bail as a matter of right' 
                                          : 'Bail is at the discretion of the court'}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="text-[#8892a4] text-xs uppercase tracking-wider mb-2">Cognizability</h4>
                                      <p className={`font-semibold ${section.cognizable ? 'text-[#fb923c]' : 'text-[#a78bfa]'}`}>
                                        {section.cognizable ? 'Cognizable Offence' : 'Non-Cognizable Offence'}
                                      </p>
                                      <p className="text-[#5a6478] text-xs mt-1">
                                        {section.cognizable 
                                          ? 'Police can arrest without warrant and start investigation' 
                                          : 'Police needs magistrate permission to investigate'}
                                      </p>
                                    </div>
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
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#e8d48a]/10 flex items-center justify-center border border-[rgba(201,168,76,0.2)]">
                    <Scale className="w-10 h-10 text-[#c9a84c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#f0f4ff] mb-3">Search the IPC Database</h3>
                  <p className="text-[#8892a4] mb-6">
                    Type a crime or situation in the search box above, or click on a quick search button to find relevant IPC sections.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-left max-w-sm mx-auto">
                    <div className="flex items-center gap-2 text-sm text-[#5a6478]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      Section numbers
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5a6478]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      Punishment details
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5a6478]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      Bail status
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5a6478]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      Cognizability
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
                  This information is for general awareness only and should not be considered legal advice. 
                  IPC sections may have amendments, exceptions, and judicial interpretations that affect their application. 
                  Always consult a qualified advocate for legal matters. The punishment and bail status shown may vary 
                  based on specific circumstances of each case.
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
