import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard/Dashboard'
import Habits from './components/Habits/Habits'
import Goals from './components/Goals/Goals'
import Journal from './components/Journal/Journal'
import Settings from './components/Settings/Settings'
import Navigation from './components/Common/Navigation'
import { useAppSelector } from './hooks/redux'

function App() {
  const { theme, neurotype } = useAppSelector((state) => state.settings)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="flex h-screen">
        {/* Navigation Sidebar */}
        <Navigation />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: neurotype === 'autism' ? '#fef3c7' : '#ffffff',
            color: neurotype === 'autism' ? '#1e3a8a' : '#1f2937',
            border: neurotype === 'autism' ? '1px solid #ddd6fe' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  )
}

export default App

