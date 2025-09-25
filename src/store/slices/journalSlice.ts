import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface JournalEntry {
  id: string
  date: string
  mood: number // 1-10 scale
  content: string
  gratitude: string
  tags: string[]
  createdAt: string
}

interface JournalState {
  entries: JournalEntry[]
  loading: boolean
  error: string | null
}

const initialState: JournalState = {
  entries: [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      mood: 8,
      content: 'Had a great day today! Completed my morning meditation and felt really focused throughout the day. The new habit tracking system is really helping me stay motivated.',
      gratitude: 'I\'m grateful for the beautiful weather and the opportunity to learn new things.',
      tags: ['productive', 'focused', 'grateful'],
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
  error: null,
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<Omit<JournalEntry, 'id' | 'createdAt'>>) => {
      const newEntry: JournalEntry = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.entries.push(newEntry)
    },
    
    updateEntry: (state, action: PayloadAction<{ id: string; updates: Partial<JournalEntry> }>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id)
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...action.payload.updates }
      }
    },
    
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload)
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
  addEntry,
  updateEntry,
  deleteEntry,
  setLoading,
  setError,
} = journalSlice.actions

export default journalSlice.reducer

