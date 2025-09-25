import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface HabitFormProps {
  onClose: () => void
  onSubmit: (habitData: any) => void
}

const HabitForm: React.FC<HabitFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily' as 'daily' | 'weekly' | 'custom',
    targetValue: 1,
    unit: 'times',
    color: '#059669',
    icon: '🌱',
  })

  const icons = ['🌱', '💧', '📚', '🏃', '🧘', '🍎', '💤', '🎯', '⭐', '🔥', '💪', '🎨']
  const colors = [
    '#059669', '#1e3a8a', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Create New Habit</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-gentle"
              placeholder="e.g., Morning Meditation"
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
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-gentle"
              rows={3}
              placeholder="Describe your habit..."
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
              className="input-gentle"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Target Value */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Target Value
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={formData.targetValue}
                onChange={(e) => setFormData({ ...formData, targetValue: parseInt(e.target.value) || 1 })}
                className="input-gentle flex-1"
                min="1"
              />
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="input-gentle w-24"
              >
                <option value="times">times</option>
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
                <option value="pages">pages</option>
                <option value="glasses">glasses</option>
              </select>
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Choose an Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                    formData.icon === icon
                      ? 'border-blue-600 bg-blue-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Choose a Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color
                      ? 'border-slate-400 scale-110'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HabitForm

