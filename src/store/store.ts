import { configureStore } from '@reduxjs/toolkit'
import habitsReducer from './slices/habitsSlice'
import goalsReducer from './slices/goalsSlice'
import journalReducer from './slices/journalSlice'
import settingsReducer from './slices/settingsSlice'
import achievementsReducer from './slices/achievementsSlice'

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    goals: goalsReducer,
    journal: journalReducer,
    settings: settingsReducer,
    achievements: achievementsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

