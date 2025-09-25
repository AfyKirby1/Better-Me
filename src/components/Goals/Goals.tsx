import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { addGoal, deleteGoal, updateGoalProgress, addMilestone } from '../../store/slices/goalsSlice'
import { addXP } from '../../store/slices/achievementsSlice'
import GoalCard from './GoalCard'
import GoalForm from './GoalForm'
import MilestoneForm from './MilestoneForm'
import { PlusIcon, FlagIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Goals = () => {
  const { goals } = useAppSelector((state) => state.goals)
  const { neurotype } = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)

  const handleAddGoal = (goalData: any) => {
    dispatch(addGoal(goalData))
    setShowGoalForm(false)
    toast.success('Goal created successfully!')
  }

  const handleDeleteGoal = (goalId: string) => {
    dispatch(deleteGoal(goalId))
    toast.success('Goal deleted')
  }

  const handleUpdateProgress = (goalId: string, value: number) => {
    dispatch(updateGoalProgress({ goalId, value }))
    dispatch(addXP(25)) // More XP for goal progress
    
    if (neurotype === 'adhd') {
      toast.success('🎯 Progress updated! +25 XP', {
        duration: 2000,
        style: {
          background: '#fef3c7',
          color: '#1e3a8a',
        },
      })
    } else {
      toast.success('Great progress! +25 XP')
    }
  }

  const handleAddMilestone = (milestoneData: any) => {
    if (selectedGoalId) {
      dispatch(addMilestone({ goalId: selectedGoalId, milestone: milestoneData }))
      setShowMilestoneForm(false)
      setSelectedGoalId(null)
      toast.success('Milestone added!')
    }
  }

  const activeGoals = goals.filter(goal => goal.status === 'active')
  const completedGoals = goals.filter(goal => goal.status === 'completed')
  const totalProgress = activeGoals.reduce((sum, goal) => sum + (goal.currentValue / goal.targetValue), 0)
  const averageProgress = activeGoals.length > 0 ? (totalProgress / activeGoals.length) * 100 : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Goals</h1>
          <p className="text-slate-600 mt-1">
            Turn your dreams into achievable milestones
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowMilestoneForm(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <FlagIcon className="w-5 h-5" />
            <span>Add Milestone</span>
          </button>
          
          <button
            onClick={() => setShowGoalForm(true)}
            className={`btn-primary flex items-center space-x-2 ${
              neurotype === 'adhd' ? 'bounce-gentle' : ''
            }`}
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{activeGoals.length}</div>
          <div className="text-sm text-slate-600">Active Goals</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">{completedGoals.length}</div>
          <div className="text-sm text-slate-600">Completed</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">
            {Math.round(averageProgress)}%
          </div>
          <div className="text-sm text-slate-600">Avg Progress</div>
        </div>
        <div className="card-gentle">
          <div className="text-2xl font-bold text-slate-900">
            {goals.reduce((sum, goal) => sum + goal.milestones.length, 0)}
          </div>
          <div className="text-sm text-slate-600">Total Milestones</div>
        </div>
      </div>

      {/* Goals List */}
      {activeGoals.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Set Your First Goal
          </h3>
          <p className="text-slate-600 mb-6">
            Break down your dreams into achievable steps and start making progress
          </p>
          <button
            onClick={() => setShowGoalForm(true)}
            className="btn-primary"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Goals */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Active Goals</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdateProgress={handleUpdateProgress}
                  onDelete={handleDeleteGoal}
                  onAddMilestone={(goalId) => {
                    setSelectedGoalId(goalId)
                    setShowMilestoneForm(true)
                  }}
                />
              ))}
            </div>
          </div>

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Completed Goals</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {completedGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onUpdateProgress={handleUpdateProgress}
                    onDelete={handleDeleteGoal}
                    onAddMilestone={(goalId) => {
                      setSelectedGoalId(goalId)
                      setShowMilestoneForm(true)
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Goal Form Modal */}
      {showGoalForm && (
        <GoalForm
          onClose={() => setShowGoalForm(false)}
          onSubmit={handleAddGoal}
        />
      )}

      {/* Add Milestone Form Modal */}
      {showMilestoneForm && (
        <MilestoneForm
          onClose={() => {
            setShowMilestoneForm(false)
            setSelectedGoalId(null)
          }}
          onSubmit={handleAddMilestone}
          goalId={selectedGoalId}
        />
      )}
    </div>
  )
}

export default Goals
