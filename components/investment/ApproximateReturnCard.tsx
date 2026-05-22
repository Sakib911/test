'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RotateCcw, DollarSign, TrendingUp } from 'lucide-react'
import { Card } from '../ui/card'

interface ApproximateReturnCardProps {
  investmentAmount: number
  onInvest?: () => void
  className?: string
}

/**
 * ApproximateReturnCard Component
 *
 * A card component that displays approximate return calculations
 * with 4 metrics in a 2x2 grid and Invest Now button.
 */
const ApproximateReturnCard: React.FC<ApproximateReturnCardProps> = ({
  investmentAmount,
  onInvest,
}) => {
  // Calculate approximate returns based on investment amount
  const calculateReturns = (amount: number) => {
    const monthlyReturn = amount * 0.043 // ~4.3% average monthly
    const threeYearReturn = amount * 1.54 // ~154% average over 3 years
    const totalAppreciation = amount * 0.915 // ~91.5% appreciation

    return {
      threeYearReturn: (amount + threeYearReturn).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      monthlyReturn: monthlyReturn.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      totalAppreciation: totalAppreciation.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      totalReturn: (amount + threeYearReturn).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    }
  }

  const returns = calculateReturns(investmentAmount)

  const returnMetrics = [
    {
      id: 'return-3year',
      title: 'Return in 3 year',
      value: returns.threeYearReturn,
      icon: RotateCcw,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'monthly-return',
      title: 'Monthly Return',
      value: returns.monthlyReturn,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'today-BTC-Value',
      title: 'Today BTC Value',
      value: returns.monthlyReturn,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'total-appreciation',
      title: 'Total Appreciation',
      value: returns.totalAppreciation,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'total-return',
      title: '3 Year Total Return',
      value: returns.totalReturn,
      icon: DollarSign,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Approximate Return
      </h2>

      {/* 2x2 Grid of Return Metrics */}
      <div className="flex flex-wrap gap-6 mb-8">
        {returnMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card
              key={metric.id}
              className="text-start min-w-80 flex-1 bg-white p-3"
            >
              <div>
                <Icon className={cn('w-8 h-8  mb-3', metric.color)} />
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {metric.title}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Invest Now Button */}
      <div className="flex justify-center">
        <Button onClick={onInvest} size="lg">
          Invest Now
        </Button>
      </div>
    </div>
  )
}

export default ApproximateReturnCard
