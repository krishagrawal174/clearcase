'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  Calendar, 
  CheckCircle2,
  X,
  Filter,
  Search,
  Scale,
  ArrowLeft
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AnimatedBackground } from '@/components/animated-background'

const specializations = [
  { id: 'all', label: 'All Specializations' },
  { id: 'divorce', label: 'Divorce' },
  { id: 'property', label: 'Property' },
  { id: 'criminal', label: 'Criminal' },
  { id: 'family', label: 'Family' },
  { id: 'traffic', label: 'Traffic' },
]

const lawyers = [
  {
    id: 1,
    name: 'Adv. Priya Sharma',
    specialization: 'divorce',
    specializationLabel: 'Divorce & Family Law',
    experience: 12,
    rating: 4.9,
    reviews: 234,
    price: 1500,
    image: '/lawyers/priya-sharma.jpg',
    availability: ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
    languages: ['English', 'Hindi'],
    description: 'Specialized in complex divorce cases, alimony settlements, and custody disputes with over a decade of courtroom experience.',
  },
  {
    id: 2,
    name: 'Adv. Rajesh Kumar',
    specialization: 'property',
    specializationLabel: 'Property & Real Estate',
    experience: 15,
    rating: 4.8,
    reviews: 312,
    price: 2000,
    image: '/lawyers/rajesh-kumar.jpg',
    availability: ['9:00 AM', '11:00 AM', '3:00 PM', '5:00 PM'],
    languages: ['English', 'Hindi', 'Punjabi'],
    description: 'Expert in property disputes, land acquisition cases, and real estate documentation with extensive experience in Delhi NCR.',
  },
  {
    id: 3,
    name: 'Adv. Anjali Desai',
    specialization: 'criminal',
    specializationLabel: 'Criminal Defense',
    experience: 8,
    rating: 4.7,
    reviews: 156,
    price: 1800,
    image: '/lawyers/anjali-desai.jpg',
    availability: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
    languages: ['English', 'Hindi', 'Gujarati'],
    description: 'Dedicated criminal defense attorney specializing in bail applications, anticipatory bail, and trial representation.',
  },
  {
    id: 4,
    name: 'Adv. Mohammed Farooq',
    specialization: 'family',
    specializationLabel: 'Family Law',
    experience: 10,
    rating: 4.9,
    reviews: 198,
    price: 1200,
    image: '/lawyers/mohammed-farooq.jpg',
    availability: ['9:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'],
    languages: ['English', 'Hindi', 'Urdu'],
    description: 'Compassionate family law practitioner handling maintenance cases, domestic disputes, and child custody matters.',
  },
  {
    id: 5,
    name: 'Adv. Sneha Reddy',
    specialization: 'traffic',
    specializationLabel: 'Traffic & Motor Accidents',
    experience: 6,
    rating: 4.6,
    reviews: 89,
    price: 500,
    image: '/lawyers/sneha-reddy.jpg',
    availability: ['10:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'],
    languages: ['English', 'Hindi', 'Telugu'],
    description: 'Expert in traffic violations, challan disputes, and motor accident claims with quick resolution track record.',
  },
  {
    id: 6,
    name: 'Adv. Vikram Singh',
    specialization: 'property',
    specializationLabel: 'Property & Land',
    experience: 20,
    rating: 4.9,
    reviews: 456,
    price: 2000,
    image: '/lawyers/vikram-singh.jpg',
    availability: ['9:00 AM', '12:00 PM', '3:00 PM', '4:00 PM'],
    languages: ['English', 'Hindi'],
    description: 'Senior property lawyer with expertise in commercial property matters, title disputes, and builder-buyer conflicts.',
  },
  {
    id: 7,
    name: 'Adv. Meera Nair',
    specialization: 'divorce',
    specializationLabel: 'Divorce & Mediation',
    experience: 9,
    rating: 4.8,
    reviews: 167,
    price: 1000,
    image: '/lawyers/meera-nair.jpg',
    availability: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
    languages: ['English', 'Hindi', 'Malayalam'],
    description: 'Focuses on amicable divorce settlements and mediation to minimize emotional and financial stress for families.',
  },
  {
    id: 8,
    name: 'Adv. Arjun Mehta',
    specialization: 'criminal',
    specializationLabel: 'Criminal Law',
    experience: 14,
    rating: 4.7,
    reviews: 223,
    price: 1800,
    image: '/lawyers/arjun-mehta.jpg',
    availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
    languages: ['English', 'Hindi'],
    description: 'Experienced criminal lawyer handling white-collar crimes, cyber crimes, and complex criminal matters.',
  },
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

type BookingStep = 'list' | 'booking' | 'confirmation'

interface Lawyer {
  id: number
  name: string
  specialization: string
  specializationLabel: string
  experience: number
  rating: number
  reviews: number
  price: number
  image: string
  availability: string[]
  languages: string[]
  description: string
}

export default function BookLawyerPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookingStep, setBookingStep] = useState<BookingStep>('list')
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [caseDescription, setCaseDescription] = useState('')
  const [bookingId, setBookingId] = useState('')

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesFilter = selectedFilter === 'all' || lawyer.specialization === selectedFilter
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specializationLabel.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleBookConsultation = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer)
    setBookingStep('booking')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate a random booking ID
    const id = 'CC' + Math.random().toString(36).substring(2, 8).toUpperCase()
    setBookingId(id)
    setBookingStep('confirmation')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToList = () => {
    setBookingStep('list')
    setSelectedLawyer(null)
    setSelectedDate('')
    setSelectedTime('')
    setCaseDescription('')
  }

  const handleNewBooking = () => {
    handleBackToList()
    setBookingId('')
  }

  // Generate dates for the next 7 days
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
      })
    }
    return dates
  }

  const availableDates = getAvailableDates()

  return (
    <main className="min-h-screen bg-[#050d1f] relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Lawyer List View */}
            {bookingStep === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl font-bold text-[#f0f4ff] mb-4"
                  >
                    Book a{' '}
                    <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] bg-clip-text text-transparent">
                      Consultation
                    </span>
                  </motion.h1>
                  <p className="text-lg text-[#8892a4] max-w-2xl mx-auto">
                    Connect with experienced lawyers specializing in your legal matter. 
                    Schedule a consultation at your convenience.
                  </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8892a4]" />
                    <input
                      type="text"
                      placeholder="Search lawyers by name or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(201,168,76,0.3)] transition-colors"
                    />
                  </div>

                  {/* Filter Dropdown - Mobile */}
                  <div className="md:hidden">
                    <div className="relative">
                      <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8892a4]" />
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] focus:outline-none focus:border-[rgba(201,168,76,0.3)] transition-colors appearance-none"
                      >
                        {specializations.map((spec) => (
                          <option key={spec.id} value={spec.id} className="bg-[#0a1628]">
                            {spec.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filter Pills - Desktop */}
                <div className="hidden md:flex flex-wrap gap-2 mb-8">
                  {specializations.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedFilter(spec.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedFilter === spec.id
                          ? 'bg-[#c9a84c] text-[#050d1f]'
                          : 'bg-[rgba(255,255,255,0.04)] text-[#8892a4] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.3)] hover:text-[#f0f4ff]'
                      }`}
                    >
                      {spec.label}
                    </button>
                  ))}
                </div>

                {/* Lawyers Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredLawyers.map((lawyer, index) => (
                    <motion.div
                      key={lawyer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative rounded-2xl p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.2)] transition-all duration-300 group"
                    >
                      <div className="flex gap-4">
                        {/* Avatar Placeholder */}
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1a2a4a] to-[#0a1628] flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.08)]">
                          <Scale className="w-8 h-8 text-[#c9a84c]" />
                        </div>

                        {/* Lawyer Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-[#f0f4ff] mb-1 truncate">
                            {lawyer.name}
                          </h3>
                          <p className="text-sm text-[#c9a84c] mb-2">{lawyer.specializationLabel}</p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#8892a4]">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {lawyer.experience} yrs
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
                              {lawyer.rating} ({lawyer.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-[#8892a4] mt-4 leading-relaxed line-clamp-2">
                        {lawyer.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {lawyer.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 text-xs rounded-md bg-[rgba(255,255,255,0.04)] text-[#8892a4] border border-[rgba(255,255,255,0.06)]"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-[#c9a84c]" />
                          <span className="text-xl font-bold text-[#f0f4ff]">{lawyer.price}</span>
                          <span className="text-sm text-[#8892a4]">/consultation</span>
                        </div>

                        <button
                          onClick={() => handleBookConsultation(lawyer)}
                          className="px-5 py-2.5 rounded-lg font-medium text-sm text-[#050d1f] bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] hover:shadow-lg hover:shadow-[rgba(201,168,76,0.2)] transition-all duration-300"
                        >
                          Book Consultation
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredLawyers.length === 0 && (
                  <div className="text-center py-16">
                    <Scale className="w-12 h-12 text-[#8892a4] mx-auto mb-4" />
                    <p className="text-[#8892a4]">No lawyers found matching your criteria.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Booking Form View */}
            {bookingStep === 'booking' && selectedLawyer && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <button
                  onClick={handleBackToList}
                  className="flex items-center gap-2 text-[#8892a4] hover:text-[#c9a84c] transition-colors mb-8"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to lawyers
                </button>

                <div className="rounded-2xl p-6 md:p-8 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)]">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-6">
                    Book Consultation
                  </h2>

                  {/* Selected Lawyer Card */}
                  <div className="flex gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(201,168,76,0.2)] mb-8">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#1a2a4a] to-[#0a1628] flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.08)]">
                      <Scale className="w-6 h-6 text-[#c9a84c]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#f0f4ff]">{selectedLawyer.name}</h3>
                      <p className="text-sm text-[#c9a84c]">{selectedLawyer.specializationLabel}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <IndianRupee className="w-4 h-4 text-[#8892a4]" />
                        <span className="text-[#f0f4ff] font-semibold">{selectedLawyer.price}</span>
                        <span className="text-sm text-[#8892a4]">/consultation</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleSubmitBooking} className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-[#f0f4ff] mb-3">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Select Date
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availableDates.map((date) => (
                          <button
                            key={date.value}
                            type="button"
                            onClick={() => setSelectedDate(date.value)}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              selectedDate === date.value
                                ? 'bg-[#c9a84c] text-[#050d1f]'
                                : 'bg-[rgba(255,255,255,0.04)] text-[#8892a4] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.3)]'
                            }`}
                          >
                            {date.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slot Selection */}
                    <div>
                      <label className="block text-sm font-medium text-[#f0f4ff] mb-3">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Select Time Slot
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {timeSlots.map((time) => {
                          const isAvailable = selectedLawyer.availability.includes(time)
                          return (
                            <button
                              key={time}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => setSelectedTime(time)}
                              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                selectedTime === time
                                  ? 'bg-[#c9a84c] text-[#050d1f]'
                                  : isAvailable
                                  ? 'bg-[rgba(255,255,255,0.04)] text-[#8892a4] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.3)]'
                                  : 'bg-[rgba(255,255,255,0.02)] text-[#555] border border-[rgba(255,255,255,0.04)] cursor-not-allowed'
                              }`}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Case Description */}
                    <div>
                      <label className="block text-sm font-medium text-[#f0f4ff] mb-3">
                        Describe Your Case
                      </label>
                      <textarea
                        value={caseDescription}
                        onChange={(e) => setCaseDescription(e.target.value)}
                        placeholder="Briefly describe your legal matter so the lawyer can prepare for your consultation..."
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(201,168,76,0.3)] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!selectedDate || !selectedTime || !caseDescription}
                      className="w-full py-4 rounded-xl font-semibold text-[#050d1f] bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] hover:shadow-lg hover:shadow-[rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      Confirm Booking - ₹{selectedLawyer.price}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Confirmation View */}
            {bookingStep === 'confirmation' && selectedLawyer && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="rounded-2xl p-8 md:p-12 bg-[rgba(255,255,255,0.02)] border border-[rgba(201,168,76,0.2)]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#050d1f]" />
                  </motion.div>

                  <h2 className="font-serif text-3xl font-bold text-[#f0f4ff] mb-3">
                    Booking Confirmed!
                  </h2>
                  <p className="text-[#8892a4] mb-8">
                    Your consultation has been successfully scheduled. You will receive a confirmation email shortly.
                  </p>

                  <div className="bg-[rgba(255,255,255,0.02)] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] mb-8 text-left">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                      <span className="text-sm text-[#8892a4]">Booking ID</span>
                      <span className="font-mono text-[#c9a84c] font-semibold">{bookingId}</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-[#8892a4]">Lawyer</span>
                        <span className="text-[#f0f4ff] font-medium">{selectedLawyer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#8892a4]">Specialization</span>
                        <span className="text-[#f0f4ff]">{selectedLawyer.specializationLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#8892a4]">Date</span>
                        <span className="text-[#f0f4ff]">
                          {new Date(selectedDate).toLocaleDateString('en-IN', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#8892a4]">Time</span>
                        <span className="text-[#f0f4ff]">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="text-sm text-[#8892a4]">Amount Paid</span>
                        <span className="text-[#c9a84c] font-bold text-lg">₹{selectedLawyer.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleNewBooking}
                      className="flex-1 py-3 rounded-xl font-medium text-[#c9a84c] border border-[rgba(201,168,76,0.3)] hover:border-[#c9a84c] transition-colors"
                    >
                      Book Another Consultation
                    </button>
                    <a
                      href="/"
                      className="flex-1 py-3 rounded-xl font-medium text-[#050d1f] bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] hover:shadow-lg hover:shadow-[rgba(201,168,76,0.2)] transition-all duration-300 text-center"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  )
}
