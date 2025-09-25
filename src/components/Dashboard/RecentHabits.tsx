import React from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { completeHabit } from '../../store/slices/habitsSlice'
import { addXP } from '../../store/slices/achievementsSlice'
import toast from 'react-hot-toast'

const RecentHabits = () => {
  const { habits } = useAppSelector((state) => state.habits)
  const { neurotype } = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()

  const activeHabits = habits.filter(habit => habit.isActive).slice(0, 3)

  const handleCompleteHabit = (habitId: string) => {
    dispatch(completeHabit({ habitId, value: 1 }))
    dispatch(addXP(10))
    
    // Show celebration based on neurotype
    if (neurotype === 'adhd') {
      toast.success('🎉 Great job! +10 XP', {
        duration: 2000,
        style: {
          background: '#fef3c7',
          color: '#1e3a8a',
        },
      })
    } else if (neurotype === 'autism') {
      toast.success('Well done! +10 XP', {
        duration: 3000,
        style: {
          background: '#fef3c7',
          color: '#1e3a8a',
        },
      })
    } else {
      toast.success('Nice work! +10 XP')
    }
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-success-emerald'
    if (streak >= 3) return 'text-achievement-gold'
    return 'text-slate-500'
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Habits</h3>
      
      {activeHabits.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🌱</div>
          <p className="text-slate-500 mb-4">No habits yet. Start your journey!</p>
          <button className="btn-primary">
            Create Your First Habit
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeHabits.map((habit) => (
            <div key={habit.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{habit.icon}</div>
                <div>
                  <h4 className="font-medium text-slate-900">{habit.name}</h4>
                  <p className="text-sm text-slate-500">{habit.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm font-medium ${getStreakColor(habit.streak)}`}>
                      🔥 {habit.streak} day streak
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleCompleteHabit(habit.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  neurotype === 'adhd'
                    ? 'btn-success bounce-gentle'
                    : neurotype === 'autism'
                    ? 'btn-gentle'
                    : 'btn-primary'
                }`}
              >
                Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentHabits

