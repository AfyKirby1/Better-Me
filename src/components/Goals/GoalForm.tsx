import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface GoalFormProps {
  onClose: () => void
  onSubmit: (goalData: any) => void
}

const GoalForm = ({ onClose, onSubmit }: GoalFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'health' as const,
    targetValue: '',
    unit: '',
    deadline: '',
    priority: 3 as const,
  })

  const categories = [
    { value: 'health', label: 'Health & Wellness', icon: '🏃‍♀️' },
    { value: 'career', label: 'Career & Professional', icon: '💼' },
    { value: 'relationships', label: 'Relationships', icon: '❤️' },
    { value: 'learning', label: 'Learning & Education', icon: '📚' },
    { value: 'finance', label: 'Finance & Money', icon: '💰' },
    { value: 'creativity', label: 'Creativity & Hobbies', icon: '🎨' },
    { value: 'other', label: 'Other', icon: '🌟' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.targetValue) {
      onSubmit({
        ...formData,
        targetValue: parseFloat(formData.targetValue),
        priority: formData.priority as 1 | 2 | 3 | 4 | 5,
      })
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Create New Goal</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Goal Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="input-gentle"
                placeholder="e.g., Learn Spanish, Run a Marathon, Save $10,000"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="input-gentle h-24 resize-none"
                placeholder="Describe your goal in detail..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleChange('category', category.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                      formData.category === category.value
                        ? 'border-trust-blue bg-blue-50 text-trust-blue'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Value and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Value *
                </label>
                <input
                  type="number"
                  value={formData.targetValue}
                  onChange={(e) => handleChange('targetValue', e.target.value)}
                  className="input-gentle"
                  placeholder="100"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  className="input-gentle"
                  placeholder="e.g., hours, miles, dollars, books"
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deadline (Optional)
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className="input-gentle"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority Level
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleChange('priority', level)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                      formData.priority === level
                        ? 'border-trust-blue bg-blue-50 text-trust-blue'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
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
                disabled={!formData.title || !formData.targetValue}
              >
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GoalForm
