import React from 'react'
import { JournalEntry as JournalEntryType } from '../../store/slices/journalSlice'
import { 
  PencilIcon, 
  TrashIcon, 
  HeartIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface JournalEntryProps {
  entry: JournalEntryType
  onEdit: () => void
  onDelete: () => void
}

const JournalEntry = ({ entry, onEdit, onDelete }: JournalEntryProps) => {
  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600 bg-green-100'
    if (mood >= 6) return 'text-yellow-600 bg-yellow-100'
    if (mood >= 4) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getMoodEmoji = (mood: number) => {
    if (mood >= 9) return '😍'
    if (mood >= 8) return '😊'
    if (mood >= 7) return '🙂'
    if (mood >= 6) return '😐'
    if (mood >= 5) return '😕'
    if (mood >= 4) return '😞'
    if (mood >= 3) return '😢'
    if (mood >= 2) return '😭'
    return '💔'
  }

  const getMoodLabel = (mood: number) => {
    if (mood >= 9) return 'Amazing'
    if (mood >= 8) return 'Great'
    if (mood >= 7) return 'Good'
    if (mood >= 6) return 'Okay'
    if (mood >= 5) return 'Meh'
    if (mood >= 4) return 'Not great'
    if (mood >= 3) return 'Bad'
    if (mood >= 2) return 'Terrible'
    return 'Awful'
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(entry.mood)}`}>
            {getMoodEmoji(entry.mood)} {entry.mood}/10 - {getMoodLabel(entry.mood)}
          </div>
          <span className="text-sm text-slate-500">
            {format(new Date(entry.date), 'MMM dd, yyyy')}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            title="Edit Entry"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete Entry"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {entry.content && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Reflection</h4>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </p>
        </div>
      )}

      {/* Gratitude */}
      {entry.gratitude && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <HeartIcon className="w-4 h-4 text-pink-500" />
            <h4 className="text-sm font-medium text-slate-700">Gratitude</h4>
          </div>
          <p className="text-slate-600 leading-relaxed italic">
            "{entry.gratitude}"
          </p>
        </div>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex items-center space-x-2 flex-wrap">
          <TagIcon className="w-4 h-4 text-slate-400" />
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default JournalEntry
