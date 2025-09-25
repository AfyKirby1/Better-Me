import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Habit {
  id: string
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'custom'
  targetValue: number
  unit: string
  color: string
  icon: string
  isActive: boolean
  createdAt: string
  streak: number
  lastCompleted?: string
}

export interface HabitEntry {
  id: string
  habitId: string
  date: string
  value: number
  notes?: string
  createdAt: string
}

interface HabitsState {
  habits: Habit[]
  entries: HabitEntry[]
  loading: boolean
  error: string | null
}

const initialState: HabitsState = {
  habits: [
    {
      id: '1',
      name: 'Morning Meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      frequency: 'daily',
      targetValue: 1,
      unit: 'session',
      color: '#059669',
      icon: '🧘',
      isActive: true,
      createdAt: new Date().toISOString(),
      streak: 3,
      lastCompleted: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Read for 30 minutes',
      description: 'Daily reading to expand knowledge',
      frequency: 'daily',
      targetValue: 30,
      unit: 'minutes',
      color: '#1e3a8a',
      icon: '📚',
      isActive: true,
      createdAt: new Date().toISOString(),
      streak: 7,
      lastCompleted: new Date().toISOString(),
    },
  ],
  entries: [],
  loading: false,
  error: null,
}

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Omit<Habit, 'id' | 'createdAt' | 'streak'>>) => {
      const newHabit: Habit = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        streak: 0,
      }
      state.habits.push(newHabit)
    },
    
    updateHabit: (state, action: PayloadAction<{ id: string; updates: Partial<Habit> }>) => {
      const index = state.habits.findIndex(habit => habit.id === action.payload.id)
      if (index !== -1) {
        state.habits[index] = { ...state.habits[index], ...action.payload.updates }
      }
    },
    
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(habit => habit.id !== action.payload)
      state.entries = state.entries.filter(entry => entry.habitId !== action.payload)
    },
    
    completeHabit: (state, action: PayloadAction<{ habitId: string; value: number; notes?: string }>) => {
      const { habitId, value, notes } = action.payload
      const today = new Date().toISOString().split('T')[0]
      
      // Check if already completed today
      const existingEntry = state.entries.find(
        entry => entry.habitId === habitId && entry.date === today
      )
      
      if (!existingEntry) {
        // Add new entry
        const newEntry: HabitEntry = {
          id: Date.now().toString(),
          habitId,
          date: today,
          value,
          notes,
          createdAt: new Date().toISOString(),
        }
        state.entries.push(newEntry)
        
        // Update habit streak
        const habit = state.habits.find(h => h.id === habitId)
        if (habit) {
          habit.streak += 1
          habit.lastCompleted = new Date().toISOString()
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
  addHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  setLoading,
  setError,
} = habitsSlice.actions

export default habitsSlice.reducer

