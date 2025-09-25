import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Goal {
  id: string
  title: string
  description: string
  category: 'health' | 'career' | 'relationships' | 'learning' | 'finance' | 'creativity' | 'other'
  targetValue: number
  currentValue: number
  unit: string
  deadline?: string
  priority: 1 | 2 | 3 | 4 | 5
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  createdAt: string
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  goalId: string
  title: string
  targetValue: number
  achievedAt?: string
  createdAt: string
}

interface GoalsState {
  goals: Goal[]
  loading: boolean
  error: string | null
}

const initialState: GoalsState = {
  goals: [
    {
      id: '1',
      title: 'Learn Spanish',
      description: 'Achieve conversational fluency in Spanish',
      category: 'learning',
      targetValue: 100,
      currentValue: 25,
      unit: 'hours studied',
      deadline: '2024-06-01',
      priority: 3,
      status: 'active',
      createdAt: new Date().toISOString(),
      milestones: [
        {
          id: '1-1',
          goalId: '1',
          title: 'Complete basic vocabulary',
          targetValue: 20,
          achievedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
        {
          id: '1-2',
          goalId: '1',
          title: 'Finish grammar fundamentals',
          targetValue: 50,
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
  loading: false,
  error: null,
}

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Omit<Goal, 'id' | 'createdAt' | 'currentValue' | 'milestones'>>) => {
      const newGoal: Goal = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        currentValue: 0,
        milestones: [],
      }
      state.goals.push(newGoal)
    },
    
    updateGoal: (state, action: PayloadAction<{ id: string; updates: Partial<Goal> }>) => {
      const index = state.goals.findIndex(goal => goal.id === action.payload.id)
      if (index !== -1) {
        state.goals[index] = { ...state.goals[index], ...action.payload.updates }
      }
    },
    
    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(goal => goal.id !== action.payload)
    },
    
    updateGoalProgress: (state, action: PayloadAction<{ goalId: string; value: number }>) => {
      const goal = state.goals.find(g => g.id === action.payload.goalId)
      if (goal) {
        goal.currentValue = Math.min(goal.currentValue + action.payload.value, goal.targetValue)
        
        // Check if goal is completed
        if (goal.currentValue >= goal.targetValue && goal.status === 'active') {
          goal.status = 'completed'
        }
      }
    },
    
    addMilestone: (state, action: PayloadAction<{ goalId: string; milestone: Omit<Milestone, 'id' | 'goalId' | 'createdAt'> }>) => {
      const goal = state.goals.find(g => g.id === action.payload.goalId)
      if (goal) {
        const newMilestone: Milestone = {
          ...action.payload.milestone,
          id: Date.now().toString(),
          goalId: action.payload.goalId,
          createdAt: new Date().toISOString(),
        }
        goal.milestones.push(newMilestone)
      }
    },
    
    completeMilestone: (state, action: PayloadAction<{ goalId: string; milestoneId: string }>) => {
      const goal = state.goals.find(g => g.id === action.payload.goalId)
      if (goal) {
        const milestone = goal.milestones.find(m => m.id === action.payload.milestoneId)
        if (milestone) {
          milestone.achievedAt = new Date().toISOString()
        }
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  addGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress,
  addMilestone,
  completeMilestone,
  setLoading,
  setError,
} = goalsSlice.actions

export default goalsSlice.reducer

