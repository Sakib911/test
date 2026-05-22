'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Bell,
  Check,
  CheckCircle,
  DollarSign,
  Settings,
  Shield,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Notification } from '@/types/notification'
import { getNotificationGroups, getUnreadCount } from '@/data/mockNotifications'

const getNotificationIcon = (icon?: string) => {
  const iconMap = {
    'trending-up': TrendingUp,
    'bar-chart': BarChart3,
    'dollar-sign': DollarSign,
    shield: Shield,
    'check-circle': CheckCircle,
    settings: Settings,
  }

  return iconMap[icon as keyof typeof iconMap] || Bell
}

const getNotificationTypeStyles = (type: Notification['type']) => {
  const styles = {
    info: 'text-blue-600 bg-blue-50 border-blue-200',
    success: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    error: 'text-red-600 bg-red-50 border-red-200',
  }

  return styles[type]
}

const formatTimestamp = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else {
    return `${days}d ago`
  }
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const IconComponent = getNotificationIcon(notification.icon)

  return (
    <div
      className={cn(
        'p-4 border-l-4 transition-colors hover:bg-gray-50',
        getNotificationTypeStyles(notification.type),
        !notification.isRead && 'bg-blue-50/50'
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <IconComponent className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              {notification.title}
            </h4>
            <span className="text-xs text-gray-500">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
          {notification.actionUrl && (
            <Link
              href={notification.actionUrl}
              className="mt-2 inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
            >
              View details →
            </Link>
          )}
        </div>
        <div className="flex-shrink-0">
          {!notification.isRead && (
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  )
}

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const notificationGroups = getNotificationGroups()
  const unreadCount = getUnreadCount()

  const filteredGroups = notificationGroups
    .map((group) => ({
      ...group,
      notifications: group.notifications.filter((notification) => {
        if (filter === 'unread') return !notification.isRead
        if (filter === 'read') return notification.isRead
        return true
      }),
    }))
    .filter((group) => group.notifications.length > 0)

  const totalNotifications = filteredGroups.reduce(
    (total, group) => total + group.notifications.length,
    0
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-3 -right-1 h-5 w-5 flex items-center rounded-full justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter('all')}
                className={cn(
                  'text-xs',
                  filter === 'all' && 'bg-blue-100 text-blue-700'
                )}
              >
                All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter('unread')}
                className={cn(
                  'text-xs',
                  filter === 'unread' && 'bg-blue-100 text-blue-700'
                )}
              >
                Unread
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter('read')}
                className={cn(
                  'text-xs',
                  filter === 'read' && 'bg-blue-100 text-blue-700'
                )}
              >
                Read
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="h-96">
          {totalNotifications === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No notifications found</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredGroups.map((group) => (
                <div key={group.date}>
                  <div className="px-4 py-2 bg-gray-50">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {group.date}
                    </h4>
                  </div>
                  {group.notifications.map((notification, index) => (
                    <div key={notification.id}>
                      <NotificationItem notification={notification} />
                      {index < group.notifications.length - 1 && (
                        <Separator className="mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {totalNotifications > 0 && (
          <div className="border-t p-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-600"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark all as read
              </Button>
              <Link
                href="/notifications"
                className="text-xs text-blue-600 hover:text-blue-800"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default NotificationButton
