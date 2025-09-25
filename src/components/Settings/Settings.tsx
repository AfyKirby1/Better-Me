import React from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import {
  setNeurotype,
  setTheme,
  setNotificationLevel,
  toggleSound,
  toggleAnimations,
  toggleHighContrast,
  toggleReducedMotion,
  updateGamificationSettings,
} from '../../store/slices/settingsSlice'
import { 
  UserIcon, 
  PaintBrushIcon, 
  BellIcon, 
  SpeakerWaveIcon,
  Cog6ToothIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const Settings = () => {
  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()

  const neurotypeOptions = [
    { value: 'neurotypical', label: 'Neurotypical', description: 'Standard experience' },
    { value: 'adhd', label: 'ADHD', description: 'High-energy, frequent rewards' },
    { value: 'autism', label: 'Autism', description: 'Predictable, sensory-friendly' },
    { value: 'audhd', label: 'AuDHD', description: 'Balanced approach' },
  ]

  const themeOptions = [
    { value: 'light', label: 'Light', description: 'Clean and bright' },
    { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
    { value: 'high-contrast', label: 'High Contrast', description: 'Enhanced visibility' },
  ]

  const notificationOptions = [
    { value: 'minimal', label: 'Minimal', description: 'Only essential notifications' },
    { value: 'gentle', label: 'Gentle', description: 'Soft, encouraging reminders' },
    { value: 'encouraging', label: 'Encouraging', description: 'More frequent motivation' },
    { value: 'motivating', label: 'Motivating', description: 'High-energy encouragement' },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Customize your Better-Me experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Neurotype Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <UserIcon className="w-6 h-6 text-trust-blue" />
              <h2 className="text-xl font-semibold text-slate-900">Neurotype</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Choose your neurotype to optimize the app experience for your brain
            </p>
            <div className="space-y-3">
              {neurotypeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    settings.neurotype === option.value
                      ? 'border-trust-blue bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="neurotype"
                    value={option.value}
                    checked={settings.neurotype === option.value}
                    onChange={(e) => dispatch(setNeurotype(e.target.value as any))}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">{option.label}</div>
                      <div className="text-sm text-slate-600">{option.description}</div>
                    </div>
                    {settings.neurotype === option.value && (
                      <div className="w-4 h-4 bg-trust-blue rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <PaintBrushIcon className="w-6 h-6 text-trust-blue" />
              <h2 className="text-xl font-semibold text-slate-900">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => dispatch(setTheme(option.value as any))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        settings.theme === option.value
                          ? 'border-trust-blue bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-medium text-sm text-slate-900">{option.label}</div>
                      <div className="text-xs text-slate-600">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">High Contrast</span>
                  <button
                    onClick={() => dispatch(toggleHighContrast())}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.highContrast ? 'bg-trust-blue' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Reduced Motion</span>
                  <button
                    onClick={() => dispatch(toggleReducedMotion())}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.reducedMotion ? 'bg-trust-blue' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Notifications */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <BellIcon className="w-6 h-6 text-trust-blue" />
              <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notification Level
                </label>
                <div className="space-y-2">
                  {notificationOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        settings.notificationLevel === option.value
                          ? 'border-trust-blue bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="notificationLevel"
                        value={option.value}
                        checked={settings.notificationLevel === option.value}
                        onChange={(e) => dispatch(setNotificationLevel(e.target.value as any))}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-slate-900">{option.label}</div>
                          <div className="text-xs text-slate-600">{option.description}</div>
                        </div>
                        {settings.notificationLevel === option.value && (
                          <div className="w-4 h-4 bg-trust-blue rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Sound Effects</span>
                  <button
                    onClick={() => dispatch(toggleSound())}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-trust-blue' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>
          </div>

          {/* Gamification */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <TrophyIcon className="w-6 h-6 text-trust-blue" />
              <h2 className="text-xl font-semibold text-slate-900">Gamification</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  XP Multiplier: {settings.gamification.xpMultiplier}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings.gamification.xpMultiplier}
                  onChange={(e) => dispatch(updateGamificationSettings({ 
                    xpMultiplier: parseFloat(e.target.value) 
                  }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0.5x (Minimal)</span>
                  <span>2.0x (Maximum)</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Achievement Notifications</span>
                  <button
                    onClick={() => dispatch(updateGamificationSettings({ 
                      achievementNotifications: !settings.gamification.achievementNotifications 
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.gamification.achievementNotifications ? 'bg-trust-blue' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.gamification.achievementNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Streak Celebrations</span>
                  <button
                    onClick={() => dispatch(updateGamificationSettings({ 
                      streakCelebrations: !settings.gamification.streakCelebrations 
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.gamification.streakCelebrations ? 'bg-trust-blue' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.gamification.streakCelebrations ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Surprise Rewards</span>
                  <button
                    onClick={() => dispatch(updateGamificationSettings({ 
                      surpriseRewards: !settings.gamification.surpriseRewards 
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.gamification.surpriseRewards ? 'bg-trust-blue' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.gamification.surpriseRewards ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Cog6ToothIcon className="w-6 h-6 text-trust-blue" />
              <h2 className="text-xl font-semibold text-slate-900">Accessibility</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Animations</span>
                <button
                  onClick={() => dispatch(toggleAnimations())}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.animationsEnabled ? 'bg-trust-blue' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
