'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

const upcomingHearings = [
  {
    id: 1,
    client: 'Priya Sharma',
    caseType: 'Divorce Petition',
    date: 'Today',
    time: '10:30 AM',
    court: 'Family Court, Delhi',
    color: 'bg-red-500',
  },
  {
    id: 2,
    client: 'Meena Gupta',
    caseType: 'Domestic Violence',
    date: 'Tomorrow',
    time: '2:00 PM',
    court: 'District Court, Noida',
    color: 'bg-orange-500',
  },
  {
    id: 3,
    client: 'Rahul Verma',
    caseType: 'Property Dispute',
    date: 'Mar 28',
    time: '11:00 AM',
    court: 'Civil Court, Gurgaon',
    color: 'bg-blue-500',
  },
  {
    id: 4,
    client: 'Anita Singh',
    caseType: 'Child Custody',
    date: 'Mar 30',
    time: '3:30 PM',
    court: 'Family Court, Delhi',
    color: 'bg-purple-500',
  },
]

export function CalendarWidget() {
  return (
    <div className="rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8d48a]">
            <Calendar className="w-5 h-5 text-[#050d1f]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#f0f4ff]">Upcoming Hearings</h3>
            <p className="text-xs text-[#8892a4]">This week</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-medium">
          {upcomingHearings.length} scheduled
        </span>
      </div>

      {/* Hearings List */}
      <div className="divide-y divide-[rgba(255,255,255,0.05)]">
        {upcomingHearings.map((hearing, index) => (
          <motion.div
            key={hearing.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`w-1 h-full min-h-[60px] rounded-full ${hearing.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-[#f0f4ff] truncate">{hearing.client}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    hearing.date === 'Today' 
                      ? 'bg-red-500/20 text-red-400' 
                      : hearing.date === 'Tomorrow'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-[rgba(255,255,255,0.1)] text-[#8892a4]'
                  }`}>
                    {hearing.date}
                  </span>
                </div>
                <p className="text-sm text-[#8892a4] mb-2">{hearing.caseType}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#8892a4]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {hearing.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {hearing.court}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
        <button className="w-full py-2.5 rounded-xl border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-sm font-medium hover:bg-[rgba(201,168,76,0.1)] transition-colors">
          View Full Calendar
        </button>
      </div>
    </div>
  )
}
