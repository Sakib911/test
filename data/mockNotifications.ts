import { Notification, NotificationGroup } from '@/types/notification'

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Investment Opportunity',
    message:
      'A new Treasury investment with 5% ROI is now available for investment.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isRead: false,
    actionUrl: '/investment-model',
    icon: 'trending-up',
  },
  {
    id: '2',
    title: 'Portfolio Update',
    message: 'Your portfolio value has increased by 2.5% this week.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    actionUrl: '/portfolio',
    icon: 'bar-chart',
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Your monthly return of $1,250 has been deposited to your wallet.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: true,
    actionUrl: '/wallet',
    icon: 'dollar-sign',
  },
  {
    id: '4',
    title: 'Security Alert',
    message:
      "New login detected from a different device. If this wasn't you, please secure your account.",
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    isRead: true,
    actionUrl: '/settings',
    icon: 'shield',
  },
  {
    id: '5',
    title: 'Investment Matured',
    message:
      'Your Private investment has matured. Returns are now available in your wallet.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    actionUrl: '/wallet',
    icon: 'check-circle',
  },
  {
    id: '6',
    title: 'System Maintenance',
    message:
      'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
    actionUrl: '/help',
    icon: 'settings',
  },
]

export const getNotificationGroups = (): NotificationGroup[] => {
  const groups: { [key: string]: Notification[] } = {}

  mockNotifications.forEach((notification) => {
    const date = notification.timestamp.toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(notification)
  })

  return Object.entries(groups)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([date, notifications]) => ({
      date,
      notifications: notifications.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      ),
    }))
}

export const getUnreadCount = (): number => {
  return mockNotifications.filter((notification) => !notification.isRead).length
}
