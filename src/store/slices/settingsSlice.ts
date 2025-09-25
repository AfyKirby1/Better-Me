import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Neurotype = 'neurotypical' | 'adhd' | 'autism' | 'audhd'
export type Theme = 'light' | 'dark' | 'high-contrast'
export type NotificationLevel = 'minimal' | 'gentle' | 'encouraging' | 'motivating'

interface SettingsState {
  neurotype: Neurotype
  theme: Theme
  notificationLevel: NotificationLevel
  soundEnabled: boolean
  animationsEnabled: boolean
  highContrast: boolean
  reducedMotion: boolean
  customColors: {
    primary: string
    secondary: string
    accent: string
  }
  gamification: {
    xpMultiplier: number
    achievementNotifications: boolean
    streakCelebrations: boolean
    surpriseRewards: boolean
  }
}

const initialState: SettingsState = {
  neurotype: 'neurotypical',
  theme: 'light',
  notificationLevel: 'gentle',
  soundEnabled: true,
  animationsEnabled: true,
  highContrast: false,
  reducedMotion: false,
  customColors: {
    primary: '#1e3a8a',
    secondary: '#059669',
    accent: '#f59e0b',
  },
  gamification: {
    xpMultiplier: 1.0,
    achievementNotifications: true,
    streakCelebrations: true,
    surpriseRewards: true,
  },
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setNeurotype: (state, action: PayloadAction<Neurotype>) => {
      state.neurotype = action.payload
      
      // Apply neurotype-specific defaults
      switch (action.payload) {
        case 'adhd':
          state.notificationLevel = 'motivating'
          state.animationsEnabled = true
          state.gamification.xpMultiplier = 1.5
          break
        case 'autism':
          state.notificationLevel = 'minimal'
          state.animationsEnabled = false
          state.reducedMotion = true
          state.gamification.xpMultiplier = 1.0
          break
        case 'audhd':
          state.notificationLevel = 'gentle'
          state.animationsEnabled = true
          state.gamification.xpMultiplier = 1.2
          break
        default:
          state.notificationLevel = 'gentle'
          state.animationsEnabled = true
          state.gamification.xpMultiplier = 1.0
      }
    },
    
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    
    setNotificationLevel: (state, action: PayloadAction<NotificationLevel>) => {
      state.notificationLevel = action.payload
    },
    
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled
    },
    
    toggleAnimations: (state) => {
      state.animationsEnabled = !state.animationsEnabled
    },
    
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast
    },
    
    toggleReducedMotion: (state) => {
      state.reducedMotion = !state.reducedMotion
    },
    
    updateCustomColors: (state, action: PayloadAction<Partial<SettingsState['customColors']>>) => {
      state.customColors = { ...state.customColors, ...action.payload }
    },
    
    updateGamificationSettings: (state, action: PayloadAction<Partial<SettingsState['gamification']>>) => {
      state.gamification = { ...state.gamification, ...action.payload }
    },
  },
})

export const {
  setNeurotype,
  setTheme,
  setNotificationLevel,
  toggleSound,
  toggleAnimations,
  toggleHighContrast,
  toggleReducedMotion,
  updateCustomColors,
  updateGamificationSettings,
} = settingsSlice.actions

export default settingsSlice.reducer

