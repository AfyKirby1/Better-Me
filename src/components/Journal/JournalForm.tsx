import React, { useState, useEffect } from 'react'
import { XMarkIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '../../hooks/redux'

interface JournalFormProps {
  onClose: () => void
  onSubmit: (entryData: any) => void
  entryId?: string | null
}

const JournalForm = ({ onClose, onSubmit, entryId }: JournalFormProps) => {
  const { entries } = useAppSelector((state) => state.journal)
  const existingEntry = entryId ? entries.find(e => e.id === entryId) : null
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 5,
    content: '',
    gratitude: '',
    tags: '',
  })

  useEffect(() => {
    if (existingEntry) {
      setFormData({
        date: existingEntry.date,
        mood: existingEntry.mood,
        content: existingEntry.content,
        gratitude: existingEntry.gratitude,
        tags: existingEntry.tags.join(', '),
      })
    }
  }, [existingEntry])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.content || formData.gratitude) {
      onSubmit({
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      })
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {existingEntry ? 'Edit Entry' : 'New Journal Entry'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Mood */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="input-gentle"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mood (1-10)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getMoodEmoji(formData.mood)}</span>
                    <span className="text-sm font-medium text-slate-700">
                      {formData.mood}/10 - {getMoodLabel(formData.mood)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.mood}
                    onChange={(e) => handleChange('mood', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>1 - Awful</span>
                    <span>10 - Amazing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How was your day? What's on your mind?
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="input-gentle h-32 resize-none"
                placeholder="Reflect on your day, your thoughts, feelings, or anything that's important to you..."
              />
            </div>

            {/* Gratitude */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <HeartIcon className="w-5 h-5 text-pink-500" />
                <label className="text-sm font-medium text-slate-700">
                  What are you grateful for today?
                </label>
              </div>
              <textarea
                value={formData.gratitude}
                onChange={(e) => handleChange('gratitude', e.target.value)}
                className="input-gentle h-24 resize-none"
                placeholder="Write about something you're grateful for, no matter how small..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="input-gentle"
                placeholder="e.g., productive, focused, grateful, challenging"
              />
              <p className="text-xs text-slate-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!formData.content && !formData.gratitude}
              >
                {existingEntry ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JournalForm
