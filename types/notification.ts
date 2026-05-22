export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  isRead: boolean
  actionUrl?: string
  icon?: string
}

export interface NotificationGroup {
  date: string
  notifications: Notification[]
}

export type NotificationType = 'all' | 'unread' | 'read'
