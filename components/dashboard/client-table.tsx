'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Brain, Eye, Search, Filter } from 'lucide-react'

interface Client {
  id: string
  name: string
  initials: string
  color: string
  caseType: string
  status: 'Active' | 'Pending' | 'Closed'
  nextHearing: string
  phone: string
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    initials: 'PS',
    color: 'bg-pink-500',
    caseType: 'Divorce Petition',
    status: 'Active',
    nextHearing: 'Mar 24, 2026',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    initials: 'RV',
    color: 'bg-blue-500',
    caseType: 'Property Dispute',
    status: 'Pending',
    nextHearing: 'Mar 28, 2026',
    phone: '+91 87654 32109',
  },
  {
    id: '3',
    name: 'Meena Gupta',
    initials: 'MG',
    color: 'bg-purple-500',
    caseType: 'Domestic Violence',
    status: 'Active',
    nextHearing: 'Mar 25, 2026',
    phone: '+91 76543 21098',
  },
  {
    id: '4',
    name: 'Anita Singh',
    initials: 'AS',
    color: 'bg-teal-500',
    caseType: 'Child Custody',
    status: 'Active',
    nextHearing: 'Mar 30, 2026',
    phone: '+91 65432 10987',
  },
  {
    id: '5',
    name: 'Vikram Patel',
    initials: 'VP',
    color: 'bg-orange-500',
    caseType: 'Criminal Defense',
    status: 'Pending',
    nextHearing: 'Apr 2, 2026',
    phone: '+91 54321 09876',
  },
  {
    id: '6',
    name: 'Sunita Rao',
    initials: 'SR',
    color: 'bg-green-500',
    caseType: 'Property Dispute',
    status: 'Closed',
    nextHearing: '-',
    phone: '+91 43210 98765',
  },
]

const statusStyles = {
  Active: 'bg-green-500/20 text-green-400 border-green-500/30',
  Pending: 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30',
  Closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

export function ClientTable() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.caseType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || client.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-serif text-xl font-bold text-[#f0f4ff]">
          Client Management
        </h2>
        <motion.button
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg gold-shimmer text-[#050d1f] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Client
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892a4]" />
          <input
            type="text"
            placeholder="Search clients or case types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] text-sm focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8892a4]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] text-sm focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.08)] text-sm font-medium text-[#c9a84c]">
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Case Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Next Hearing</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 hover:border-l-2 hover:border-l-[#c9a84c]"
            >
              {/* Client */}
              <div className="col-span-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${client.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                  {client.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-[#f0f4ff] truncate">{client.name}</div>
                  <div className="text-xs text-[#8892a4] lg:hidden">{client.caseType}</div>
                </div>
              </div>

              {/* Case Type */}
              <div className="hidden lg:block col-span-2 text-[#8892a4] text-sm">
                {client.caseType}
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[client.status]}`}>
                  {client.status}
                </span>
              </div>

              {/* Next Hearing */}
              <div className="col-span-2 text-sm text-[#8892a4]">
                <span className="lg:hidden text-[#c9a84c] mr-2">Hearing:</span>
                {client.nextHearing}
              </div>

              {/* Actions */}
              <div className="col-span-3 flex items-center justify-start lg:justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-br from-[#7b61ff] to-[#6b51ef] text-white text-xs font-medium"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Analyze</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.15)] text-[#f0f4ff] text-xs font-medium hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="px-6 py-12 text-center text-[#8892a4]">
            No clients found matching your search.
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl bg-[#0a1525] border border-[rgba(201,168,76,0.2)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold text-[#f0f4ff]">Add New Client</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#8892a4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Client Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Case Type</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] focus:outline-none focus:border-[rgba(201,168,76,0.4)]">
                    <option value="">Select case type</option>
                    <option value="divorce">Divorce Petition</option>
                    <option value="property">Property Dispute</option>
                    <option value="domestic">Domestic Violence</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="civil">Civil Litigation</option>
                    <option value="custody">Child Custody</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Next Hearing Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.15)] text-[#f0f4ff] font-medium hover:bg-[rgba(255,255,255,0.05)]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg gold-shimmer text-[#050d1f] font-medium"
                >
                  Add Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
