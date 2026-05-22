'use client'

export const dynamic = 'force-dynamic'

import { useAuth } from '@/contexts/auth-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  Activity,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Eye,
  Download,
  Settings,
} from 'lucide-react'

// Mock dashboard data
const dashboardStats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Orders',
    value: '1,293',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-green-600',
  },
  {
    title: 'Products',
    value: '468',
    change: '+2.1%',
    trend: 'up',
    icon: Package,
    color: 'text-purple-600',
  },
  {
    title: 'Revenue',
    value: '$24,500',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-orange-600',
  },
]

const recentActivities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'created a new order',
    time: '2 minutes ago',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    type: 'order',
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    action: 'updated product catalog',
    time: '15 minutes ago',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
    type: 'product',
  },
  {
    id: 3,
    user: 'Mike Wilson',
    action: 'completed user verification',
    time: '1 hour ago',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    type: 'user',
  },
  {
    id: 4,
    user: 'Emily Davis',
    action: 'generated monthly report',
    time: '2 hours ago',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    type: 'report',
  },
]

const quickStats = [
  {
    label: 'Active Sessions',
    value: 127,
    max: 200,
    color: 'bg-green-500',
  },
  {
    label: 'Server Load',
    value: 68,
    max: 100,
    color: 'bg-yellow-500',
  },
  {
    label: 'Storage Used',
    value: 82,
    max: 100,
    color: 'bg-red-500',
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className=" rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getWelcomeMessage()}, {user?.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              <Activity className="w-4 h-4 mr-1" />
              Live
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest actions and updates from your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>
                      {activity.user
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" className="w-full text-sm">
                <Eye className="w-4 h-4 mr-2" />
                View all activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
              <CardDescription>
                Current system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </span>
                    <span className="font-medium">{stat.value}%</span>
                  </div>
                  <Progress value={stat.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add New User
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Create Product
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tasks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Completed Tasks
            </CardTitle>
            <CardDescription>Tasks completed today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">24</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +6 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Pending Tasks
            </CardTitle>
            <CardDescription>Tasks requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">8</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              -2 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
