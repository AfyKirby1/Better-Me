import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '../../hooks/redux'

interface MilestoneFormProps {
  onClose: () => void
  onSubmit: (milestoneData: any) => void
  goalId?: string | null
}

const MilestoneForm = ({ onClose, onSubmit, goalId }: MilestoneFormProps) => {
  const { goals } = useAppSelector((state) => state.goals)
  const selectedGoal = goalId ? goals.find(g => g.id === goalId) : null
  
  const [formData, setFormData] = useState({
    title: '',
    targetValue: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.targetValue) {
      onSubmit({
        ...formData,
        targetValue: parseFloat(formData.targetValue),
      })
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Add Milestone</h2>
              {selectedGoal && (
                <p className="text-sm text-slate-600 mt-1">
                  For: {selectedGoal.title}
                </p>
              )}
            </div>
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
                Milestone Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="input-gentle"
                placeholder="e.g., Complete basic vocabulary, Run 5K, Save first $1,000"
                required
              />
            </div>

            {/* Target Value */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Target Value *
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={formData.targetValue}
                  onChange={(e) => handleChange('targetValue', e.target.value)}
                  className="input-gentle flex-1"
                  placeholder="20"
                  min="0"
                  step="0.1"
                  required
                />
                {selectedGoal && (
                  <span className="text-sm text-slate-500">
                    {selectedGoal.unit}
                  </span>
                )}
              </div>
              {selectedGoal && (
                <p className="text-xs text-slate-500 mt-1">
                  Goal target: {selectedGoal.targetValue} {selectedGoal.unit}
                </p>
              )}
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
                Add Milestone
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MilestoneForm
