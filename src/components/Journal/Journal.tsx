import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { addEntry, deleteEntry } from '../../store/slices/journalSlice'
import { addXP } from '../../store/slices/achievementsSlice'
import JournalEntry from './JournalEntry'
import JournalForm from './JournalForm'
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { format, startOfWeek, endOfWeek } from 'date-fns'
import toast from 'react-hot-toast'

const Journal = () => {
  const { entries } = useAppSelector((state) => state.journal)
  const { neurotype } = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const [showForm, setShowForm] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  const handleAddEntry = (entryData: any) => {
    dispatch(addEntry(entryData))
    dispatch(addXP(25)) // XP for journaling
    setShowForm(false)
    
    if (neurotype === 'adhd') {
      toast.success('📝 Journal entry saved! +25 XP', {
        duration: 2000,
        style: {
          background: '#fef3c7',
          color: '#1e3a8a',
        },
      })
    } else {
      toast.success('Journal entry saved! +25 XP')
    }
  }

  const handleDeleteEntry = (entryId: string) => {
    dispatch(deleteEntry(entryId))
    toast.success('Entry deleted')
  }

  const handleEditEntry = (entryId: string) => {
    setSelectedEntry(entryId)
    setShowForm(true)
  }

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Calculate mood statistics
  const moodStats = {
    average: entries.length > 0 
      ? Math.round(entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length * 10) / 10
      : 0,
    high: entries.filter(entry => entry.mood >= 8).length,
    low: entries.filter(entry => entry.mood <= 4).length,
  }

  // Get this week's entries
  const now = new Date()
  const weekStart = startOfWeek(now)
  const weekEnd = endOfWeek(now)
  const thisWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date)
    return entryDate >= weekStart && entryDate <= weekEnd
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Journal</h1>
          <p className="text-slate-600 mt-1">
            Reflect, track your mood, and practice gratitude
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className={`btn-primary flex items-center space-x-2 ${
            neurotype === 'adhd' ? 'bounce-gentle' : ''
          }`}
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{entries.length}</div>
          <div className="text-sm text-slate-600">Total Entries</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{moodStats.average}</div>
          <div className="text-sm text-slate-600">Avg Mood</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{moodStats.high}</div>
          <div className="text-sm text-slate-600">High Mood Days</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{thisWeekEntries.length}</div>
          <div className="text-sm text-slate-600">This Week</div>
        </div>
      </div>

      {/* Mood Overview */}
      {entries.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Mood Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Average Mood</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-2 rounded-full"
                    style={{ width: `${(moodStats.average / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900">{moodStats.average}/10</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">High Mood Days (8+)</span>
                <span className="font-medium text-green-600">{moodStats.high}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Low Mood Days (4-)</span>
                <span className="font-medium text-red-600">{moodStats.low}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entries List */}
      {sortedEntries.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Start Your Journal
          </h3>
          <p className="text-slate-600 mb-6">
            Begin your journey of self-reflection and growth
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Write Your First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Recent Entries</h2>
          {sortedEntries.map((entry) => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              onEdit={() => handleEditEntry(entry.id)}
              onDelete={() => handleDeleteEntry(entry.id)}
            />
          ))}
        </div>
      )}

      {/* Journal Form Modal */}
      {showForm && (
        <JournalForm
          onClose={() => {
            setShowForm(false)
            setSelectedEntry(null)
          }}
          onSubmit={handleAddEntry}
          entryId={selectedEntry}
        />
      )}
    </div>
  )
}

export default Journal
