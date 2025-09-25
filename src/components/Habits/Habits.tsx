import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { addHabit, deleteHabit, completeHabit } from '../../store/slices/habitsSlice'
import { addXP } from '../../store/slices/achievementsSlice'
import HabitCard from './HabitCard'
import HabitForm from './HabitForm'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Habits = () => {
  const { habits } = useAppSelector((state) => state.habits)
  const { neurotype } = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const [showForm, setShowForm] = useState(false)

  // Debug logging
  console.log('Habits component rendered:', { habits, neurotype, showForm })

  const handleCompleteHabit = (habitId: string) => {
    console.log('Completing habit:', habitId)
    dispatch(completeHabit({ habitId, value: 1 }))
    dispatch(addXP(10))
    
    // Show celebration based on neurotype
    if (neurotype === 'adhd') {
      toast.success('🎉 Awesome! +10 XP', {
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
      toast.success('Great job! +10 XP')
    }
  }

  const handleDeleteHabit = (habitId: string) => {
    dispatch(deleteHabit(habitId))
    toast.success('Habit removed')
  }

  const activeHabits = habits.filter(habit => habit.isActive)
  const completedToday = habits.filter(habit => {
    const today = new Date().toISOString().split('T')[0]
    return habit.lastCompleted?.startsWith(today)
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Habits</h1>
          <p className="text-slate-600 mt-1">
            Build meaningful habits, one day at a time
          </p>
        </div>
        
        <button
          onClick={() => {
            console.log('Add habit button clicked')
            setShowForm(true)
          }}
          className={`btn-primary flex items-center space-x-2 ${
            neurotype === 'adhd' ? 'bounce-gentle' : ''
          }`}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Habit</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{activeHabits.length}</div>
          <div className="text-sm text-slate-600">Active Habits</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{completedToday.length}</div>
          <div className="text-sm text-slate-600">Completed Today</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">
            {activeHabits.length > 0 
              ? Math.round((completedToday.length / activeHabits.length) * 100)
              : 0}%
          </div>
          <div className="text-sm text-slate-600">Today's Progress</div>
        </div>
      </div>

      {/* Habits List */}
      {activeHabits.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Start Your Journey
          </h3>
          <p className="text-slate-600 mb-6">
            Create your first habit and begin building the life you want
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Create Your First Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={() => handleCompleteHabit(habit.id)}
              onDelete={() => handleDeleteHabit(habit.id)}
            />
          ))}
        </div>
      )}

      {/* Add Habit Form Modal */}
      {showForm && (
        <HabitForm
          onClose={() => setShowForm(false)}
          onSubmit={(habitData) => {
            dispatch(addHabit(habitData))
            setShowForm(false)
            toast.success('Habit created successfully!')
          }}
        />
      )}
    </div>
  )
}

export default Habits

