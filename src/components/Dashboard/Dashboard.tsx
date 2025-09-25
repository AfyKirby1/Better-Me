import { useAppSelector } from '../../hooks/redux'
import DashboardWidget from './DashboardWidget'
import QuickStats from './QuickStats'
import MotivationalQuote from './MotivationalQuote'
import RecentHabits from './RecentHabits'
import GoalProgress from './GoalProgress'

const Dashboard = () => {
  const { userStats } = useAppSelector((state) => state.achievements)

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back! 🌱
        </h1>
        <p className="text-slate-600">
          Ready to continue your journey of growth and self-improvement?
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Habits */}
          <RecentHabits />
          
          {/* Goal Progress */}
          <GoalProgress />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Motivational Quote */}
          <MotivationalQuote />
          
          {/* Level Progress */}
          <DashboardWidget title="Your Progress" className="card-gentle">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Level {userStats.level}</span>
                <span className="text-sm text-slate-500">{userStats.totalXP} XP</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(userStats.currentLevelXP / userStats.nextLevelXP) * 100}%` }}
                />
              </div>
              
              <div className="text-xs text-slate-500 text-center">
                {userStats.nextLevelXP - userStats.currentLevelXP} XP to next level
              </div>
            </div>
          </DashboardWidget>

          {/* Achievements Preview */}
          <DashboardWidget title="Recent Achievements" className="card-gentle">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-achievement-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👣</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">First Step</div>
                  <div className="text-xs text-slate-500">Started tracking habits</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-emerald rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🔥</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">Consistency</div>
                  <div className="text-xs text-slate-500">3-day streak achieved</div>
                </div>
              </div>
            </div>
          </DashboardWidget>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

