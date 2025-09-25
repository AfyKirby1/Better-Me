// Basic notification service for Better-Me
// This will be expanded with Electron's native notifications later

export interface NotificationOptions {
  title: string
  body: string
  icon?: string
  sound?: boolean
  priority?: 'low' | 'normal' | 'high'
}

class NotificationService {
  private isSupported: boolean
  private permission: NotificationPermission = 'default'

  constructor() {
    this.isSupported = 'Notification' in window
    if (this.isSupported) {
      this.permission = Notification.permission
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) return false
    
    if (this.permission === 'default') {
      this.permission = await Notification.requestPermission()
    }
    
    return this.permission === 'granted'
  }

  async showNotification(options: NotificationOptions): Promise<void> {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('Notification:', options.title, options.body)
      return
    }

    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'better-me',
      requireInteraction: false,
    })

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close()
    }, 5000)

    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }

  // Habit reminder notifications
  async showHabitReminder(habitName: string, streak: number): Promise<void> {
    const messages = [
      `Time for ${habitName}! Keep your ${streak}-day streak going! 🔥`,
      `Don't break the chain! ${habitName} awaits. You're on day ${streak}! 💪`,
      `Your ${streak}-day streak is impressive! Ready for ${habitName}? ⭐`,
      `Consistency is key! Time for ${habitName} (Day ${streak}) 🌟`,
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    
    await this.showNotification({
      title: 'Habit Reminder',
      body: randomMessage,
      priority: 'normal',
    })
  }

  // Goal progress notifications
  async showGoalProgress(goalTitle: string, progress: number, target: number): Promise<void> {
    const percentage = Math.round((progress / target) * 100)
    
    await this.showNotification({
      title: 'Goal Progress Update',
      body: `${goalTitle}: ${progress}/${target} (${percentage}%) - Keep going! 🎯`,
      priority: 'normal',
    })
  }

  // Achievement notifications
  async showAchievement(title: string, description: string): Promise<void> {
    await this.showNotification({
      title: `🏆 Achievement Unlocked: ${title}`,
      body: description,
      priority: 'high',
    })
  }

  // Level up notifications
  async showLevelUp(newLevel: number): Promise<void> {
    await this.showNotification({
      title: `🎉 Level Up!`,
      body: `Congratulations! You've reached level ${newLevel}!`,
      priority: 'high',
    })
  }

  // Streak celebration notifications
  async showStreakCelebration(habitName: string, streak: number): Promise<void> {
    const celebrations = [
      `Amazing! ${streak} days of ${habitName}! You're unstoppable! 🚀`,
      `Incredible streak! ${streak} days of ${habitName}! Keep it up! 🌟`,
      `You're on fire! ${streak} days of ${habitName}! This is amazing! 🔥`,
      `Outstanding! ${streak} days of ${habitName}! You're inspiring! ⭐`,
    ]
    
    const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)]
    
    await this.showNotification({
      title: 'Streak Celebration!',
      body: randomCelebration,
      priority: 'high',
    })
  }

  // Daily motivation notifications
  async showDailyMotivation(): Promise<void> {
    const motivations = [
      'Good morning! Ready to make today amazing? 🌅',
      'Every small step counts. What will you accomplish today? 💪',
      'You\'re capable of incredible things. Let\'s start with today! ⭐',
      'Progress, not perfection. Ready to take another step forward? 🌱',
      'Your future self will thank you for the choices you make today! 🙏',
    ]
    
    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)]
    
    await this.showNotification({
      title: 'Daily Motivation',
      body: randomMotivation,
      priority: 'low',
    })
  }
}

export const notificationService = new NotificationService()
export default notificationService
