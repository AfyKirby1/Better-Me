import React, { useState } from 'react'
import { Goal } from '../../store/slices/goalsSlice'
import { 
  TrashIcon, 
  PlusIcon, 
  CheckCircleIcon,
  CalendarIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface GoalCardProps {
  goal: Goal
  onUpdateProgress: (goalId: string, value: number) => void
  onDelete: (goalId: string) => void
  onAddMilestone: (goalId: string) => void
}

const GoalCard = ({ goal, onUpdateProgress, onDelete, onAddMilestone }: GoalCardProps) => {
  const [progressValue, setProgressValue] = useState('')
  const [showProgressForm, setShowProgressForm] = useState(false)

  const progressPercentage = (goal.currentValue / goal.targetValue) * 100
  const isCompleted = goal.status === 'completed'
  const isOverdue = goal.deadline && new Date(goal.deadline) < new Date() && !isCompleted

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseFloat(progressValue)
    if (value > 0) {
      onUpdateProgress(goal.id, value)
      setProgressValue('')
      setShowProgressForm(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'bg-emerald-100 text-emerald-800',
      career: 'bg-blue-100 text-blue-800',
      relationships: 'bg-pink-100 text-pink-800',
      learning: 'bg-purple-100 text-purple-800',
      finance: 'bg-yellow-100 text-yellow-800',
      creativity: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800',
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  const getPriorityColor = (priority: number) => {
    const colors = {
      1: 'text-red-600',
      2: 'text-orange-600',
      3: 'text-yellow-600',
      4: 'text-blue-600',
      5: 'text-green-600',
    }
    return colors[priority as keyof typeof colors] || colors[3]
  }

  return (
    <div className={`card ${isCompleted ? 'opacity-75' : ''} ${isOverdue ? 'border-red-300' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{goal.title}</h3>
            {isCompleted && (
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            )}
            {isOverdue && (
              <FlagIcon className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-sm text-slate-600 mb-2">{goal.description}</p>
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <span className={`px-2 py-1 rounded-full ${getCategoryColor(goal.category)}`}>
              {goal.category}
            </span>
            <span className={getPriorityColor(goal.priority)}>
              Priority {goal.priority}
            </span>
            {goal.deadline && (
              <span className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{format(new Date(goal.deadline), 'MMM dd, yyyy')}</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onAddMilestone(goal.id)}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            title="Add Milestone"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete Goal"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Progress</span>
          <span className="text-sm text-slate-600">
            {goal.currentValue} / {goal.targetValue} {goal.unit}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="text-xs text-slate-500 mt-1">
          {Math.round(progressPercentage)}% complete
        </div>
      </div>

      {/* Milestones */}
      {goal.milestones.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Milestones</h4>
          <div className="space-y-2">
            {goal.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  milestone.achievedAt ? 'bg-green-500' : 'bg-slate-300'
                }`} />
                <span className={`text-xs ${
                  milestone.achievedAt ? 'text-green-700 line-through' : 'text-slate-600'
                }`}>
                  {milestone.title} ({milestone.targetValue} {goal.unit})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Input */}
      {!isCompleted && (
        <div className="border-t pt-4">
          {showProgressForm ? (
            <form onSubmit={handleProgressSubmit} className="flex space-x-2">
              <input
                type="number"
                value={progressValue}
                onChange={(e) => setProgressValue(e.target.value)}
                placeholder="Add progress..."
                className="input-gentle flex-1 text-sm"
                min="0"
                step="0.1"
              />
              <button type="submit" className="btn-primary text-sm">
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowProgressForm(false)}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowProgressForm(true)}
              className="btn-gentle w-full text-sm"
            >
              Update Progress
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default GoalCard
