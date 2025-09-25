import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Achievement {
  id: string
  badgeId: string
  title: string
  description: string
  category: 'streak' | 'habit' | 'goal' | 'journal' | 'special'
  tier: 'micro' | 'macro' | 'meta'
  xpReward: number
  icon: string
  color: string
  earnedAt?: string
  metadata?: Record<string, any>
}

export interface UserStats {
  totalXP: number
  level: number
  currentLevelXP: number
  nextLevelXP: number
  totalHabits: number
  activeHabits: number
  completedGoals: number
  journalEntries: number
  currentStreak: number
  longestStreak: number
}

interface AchievementsState {
  achievements: Achievement[]
  userStats: UserStats
  loading: boolean
  error: string | null
}

const initialUserStats: UserStats = {
  totalXP: 150,
  level: 2,
  currentLevelXP: 50,
  nextLevelXP: 200,
  totalHabits: 2,
  activeHabits: 2,
  completedGoals: 0,
  journalEntries: 1,
  currentStreak: 3,
  longestStreak: 7,
}

const initialState: AchievementsState = {
  achievements: [
    {
      id: '1',
      badgeId: 'first-step',
      title: 'First Step',
      description: 'Started tracking your first habit',
      category: 'habit',
      tier: 'micro',
      xpReward: 25,
      icon: '👣',
      color: '#059669',
      earnedAt: new Date().toISOString(),
    },
    {
      id: '2',
      badgeId: 'consistency',
      title: 'Consistency',
      description: 'Completed a habit 3 days in a row',
      category: 'streak',
      tier: 'micro',
      xpReward: 50,
      icon: '🔥',
      color: '#f59e0b',
      earnedAt: new Date().toISOString(),
    },
  ],
  userStats: initialUserStats,
  loading: false,
  error: null,
}

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addAchievement: (state, action: PayloadAction<Omit<Achievement, 'id' | 'earnedAt'>>) => {
      const newAchievement: Achievement = {
        ...action.payload,
        id: Date.now().toString(),
        earnedAt: new Date().toISOString(),
      }
      state.achievements.push(newAchievement)
      
      // Add XP to user stats
      state.userStats.totalXP += newAchievement.xpReward
      
      // Check for level up
      const newLevel = Math.floor(state.userStats.totalXP / 100) + 1
      if (newLevel > state.userStats.level) {
        state.userStats.level = newLevel
        state.userStats.currentLevelXP = state.userStats.totalXP % 100
        state.userStats.nextLevelXP = 100
      } else {
        state.userStats.currentLevelXP = state.userStats.totalXP % 100
      }
    },
    
    updateUserStats: (state, action: PayloadAction<Partial<UserStats>>) => {
      state.userStats = { ...state.userStats, ...action.payload }
    },
    
    addXP: (state, action: PayloadAction<number>) => {
      state.userStats.totalXP += action.payload
      
      // Check for level up
      const newLevel = Math.floor(state.userStats.totalXP / 100) + 1
      if (newLevel > state.userStats.level) {
        state.userStats.level = newLevel
        state.userStats.currentLevelXP = state.userStats.totalXP % 100
        state.userStats.nextLevelXP = 100
      } else {
        state.userStats.currentLevelXP = state.userStats.totalXP % 100
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
  addAchievement,
  updateUserStats,
  addXP,
  setLoading,
  setError,
} = achievementsSlice.actions

export default achievementsSlice.reducer

