'use client'
import React, { useCallback } from 'react'
import { InvestmentData } from '@/types/investment'
import { Clock, TrendingUp, Timer } from 'lucide-react'
import Image from 'next/image'
import ApproximateReturnCard from './ApproximateReturnCard'
import { Card } from '../ui/card'

interface TreasuryCardProps {
  investment: InvestmentData
  onInvest: (id: string, amount: number) => void
}

const TreasuryCard: React.FC<TreasuryCardProps> = ({
  investment,
  onInvest,
}) => {
  const { title, imageUrl, description, metrics, investmentAmount } = investment

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }
  const handleInvestClick = useCallback(() => {
    if (onInvest) {
      onInvest(investment.id, investment.investmentAmount)
    }
  }, [onInvest, investment.id, investment.investmentAmount])

  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex-shrink-0">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-blue-200">
            <Image
              src={imageUrl}
              alt={`${title} investment opportunity`}
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
          </div>
        </div>

        <div className="flex-1 space-y-6 col-span-2">
          <Card className="p-5 bg-white">
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">
                  {metrics.contractDuration}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{metrics.roi}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <Timer className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">
                  {metrics.onboardingTime}
                </span>
              </div>
            </div>

            {/* Title and Amount */}
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
              <div className="text-4xl font-bold text-green-600">
                {formatCurrency(investmentAmount)}
              </div>
            </div>

            {description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            )}

            {/* Return Details */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">3 Year total return</span>
                <span className="font-semibold text-gray-900">108%-180%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Yearly total Return</span>
                <span className="font-semibold text-gray-900">36%-60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Monthly total return</span>
                <span className="font-semibold text-gray-900">3-5%</span>
              </div>
            </div>
          </Card>
          <ApproximateReturnCard
            investmentAmount={investment.investmentAmount}
            onInvest={handleInvestClick}
          />
        </div>
      </div>
    </div>
  )
}

export default TreasuryCard
