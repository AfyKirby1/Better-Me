import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { 
  ChartBarIcon, 
  FlagIcon, 
  BookOpenIcon, 
  FireIcon 
} from '@heroicons/react/24/outline'

const QuickStats = () => {
  const { userStats } = useAppSelector((state) => state.achievements)
  const { habits } = useAppSelector((state) => state.habits)
  const { goals } = useAppSelector((state) => state.goals)
  const { entries } = useAppSelector((state) => state.journal)

  const stats = [
    {
      label: 'Active Habits',
      value: habits.filter(h => h.isActive).length,
      icon: ChartBarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Current Streak',
      value: userStats.currentStreak,
      icon: FireIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Active Goals',
      value: goals.filter(g => g.status === 'active').length,
      icon: FlagIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Journal Entries',
      value: entries.length,
      icon: BookOpenIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card-gentle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuickStats

