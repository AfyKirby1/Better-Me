import React from 'react'
import { useAppSelector } from '../../hooks/redux'

const GoalProgress = () => {
  const { goals } = useAppSelector((state) => state.goals)

  const activeGoals = goals.filter(goal => goal.status === 'active').slice(0, 2)

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-success-emerald to-emerald-400'
    if (percentage >= 50) return 'from-achievement-gold to-yellow-400'
    return 'from-trust-blue to-blue-400'
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Goal Progress</h3>
      
      {activeGoals.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-slate-500 mb-4">No active goals yet.</p>
          <button className="btn-primary">
            Set Your First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeGoals.map((goal) => {
            const progressPercentage = getProgressPercentage(goal.currentValue, goal.targetValue)
            
            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-900">{goal.title}</h4>
                  <span className="text-sm text-slate-500">
                    {goal.currentValue}/{goal.targetValue} {goal.unit}
                  </span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(progressPercentage)} transition-all duration-500 ease-out`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{goal.category}</span>
                  <span className="font-medium text-slate-700">
                    {Math.round(progressPercentage)}% complete
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GoalProgress

