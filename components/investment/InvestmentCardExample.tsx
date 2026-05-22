'use client'

import React, { useCallback } from 'react'
import InvestmentCard from './InvestmentCard'
import InvestmentGrid from './InvestmentGrid'
import { mockInvestments } from '@/data/mockInvestments'
import { InvestmentData } from '@/types/investment'

/**
 * Example component demonstrating how to use InvestmentCard
 * This component shows the Open/Closed Principle in action -
 * it's open for extension (can add new investment types) but
 * closed for modification (doesn't need to change when new features are added)
 */
const InvestmentCardExample: React.FC = () => {
  const handleInvest = useCallback((investmentId: string) => {
    console.log(`Investing in: ${investmentId}`)
    // Here you would typically:
    // 1. Open a modal for investment details
    // 2. Navigate to investment flow
    // 3. Call an API to process the investment
    alert(`Investment selected: ${investmentId}`)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}

      <InvestmentGrid variant="auto-fit">
        {mockInvestments.map((investment: InvestmentData) => (
          <InvestmentCard
            key={investment.id}
            investment={investment}
            onInvest={handleInvest}
          />
        ))}
      </InvestmentGrid>
    </div>
  )
}

export default InvestmentCardExample
