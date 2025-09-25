import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  ChartBarIcon, 
  FlagIcon, 
  BookOpenIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline'
import { useAppSelector } from '../../hooks/redux'

const Navigation = () => {
  const { neurotype, theme } = useAppSelector((state) => state.settings)

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/habits', icon: ChartBarIcon, label: 'Habits' },
    { path: '/goals', icon: FlagIcon, label: 'Goals' },
    { path: '/journal', icon: BookOpenIcon, label: 'Journal' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ]

  const getNavClasses = (isActive: boolean) => {
    const baseClasses = "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200"
    
    if (isActive) {
      return `${baseClasses} ${
        neurotype === 'autism' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-blue-800 text-white'
      }`
    }
    
    return `${baseClasses} ${
      theme === 'dark' 
        ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`
  }

  return (
    <nav className={`w-64 h-full ${
      theme === 'dark' ? 'bg-slate-800 border-r border-slate-700' : 'bg-white border-r border-slate-200'
    }`}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-800 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Better-Me</h1>
            <p className="text-sm text-slate-500">Your gentle companion</p>
          </div>
        </div>
        
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => getNavClasses(isActive)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Neurotype indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className={`px-3 py-2 rounded-lg text-xs font-medium ${
          neurotype === 'adhd' 
            ? 'bg-yellow-200 text-slate-900' 
            : neurotype === 'autism'
            ? 'bg-yellow-100 text-slate-800'
            : 'bg-slate-100 text-slate-600'
        }`}>
          {neurotype === 'adhd' && '⚡ ADHD Mode'}
          {neurotype === 'autism' && '🌟 Autism Mode'}
          {neurotype === 'audhd' && '🌈 AuDHD Mode'}
          {neurotype === 'neurotypical' && '✨ Standard Mode'}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

