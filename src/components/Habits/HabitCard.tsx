import React from 'react'
import { Habit } from '../../store/slices/habitsSlice'
import { TrashIcon, CheckIcon } from '@heroicons/react/24/outline'

interface HabitCardProps {
  habit: Habit
  onComplete: () => void
  onDelete: () => void
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete, onDelete }) => {
  const isCompletedToday = habit.lastCompleted?.startsWith(
    new Date().toISOString().split('T')[0]
  )

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-emerald-600'
    if (streak >= 3) return 'text-yellow-600'
    return 'text-slate-500'
  }

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return '🏆'
    if (streak >= 7) return '🔥'
    if (streak >= 3) return '⭐'
    return '🌱'
  }

  return (
    <div className={`card transition-all duration-200 hover:shadow-md ${
      isCompletedToday ? 'ring-2 ring-emerald-500/20 bg-emerald-50' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{habit.icon}</div>
          <div>
            <h3 className="font-semibold text-slate-900">{habit.name}</h3>
            <p className="text-sm text-slate-600">{habit.description}</p>
          </div>
        </div>
        
        <button
          onClick={onDelete}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {/* Streak */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Current Streak</span>
          <div className="flex items-center space-x-1">
            <span className="text-lg">{getStreakIcon(habit.streak)}</span>
            <span className={`font-semibold ${getStreakColor(habit.streak)}`}>
              {habit.streak} days
            </span>
          </div>
        </div>

        {/* Target */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Target</span>
          <span className="text-sm font-medium text-slate-900">
            {habit.targetValue} {habit.unit}
          </span>
        </div>

        {/* Frequency */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Frequency</span>
          <span className="text-sm font-medium text-slate-900 capitalize">
            {habit.frequency}
          </span>
        </div>

        {/* Complete Button */}
        <button
          onClick={onComplete}
          disabled={isCompletedToday}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            isCompletedToday
              ? 'bg-emerald-600 text-white cursor-not-allowed'
              : 'btn-primary hover:shadow-md'
          }`}
        >
          {isCompletedToday ? (
            <div className="flex items-center justify-center space-x-2">
              <CheckIcon className="w-4 h-4" />
              <span>Completed Today</span>
            </div>
          ) : (
            'Complete Today'
          )}
        </button>
      </div>
    </div>
  )
}

export default HabitCard

