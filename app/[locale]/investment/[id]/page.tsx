'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import { useParams } from 'next/navigation'
import { getInvestmentById } from '@/data/mockInvestments'

import TreasuryCard from '@/components/investment/TreasuryCard'

const InvestmentDetailPageRoute: React.FC = () => {
  const params = useParams()
  const investmentId = params.id as string

  // Get investment data
  const investment = getInvestmentById(investmentId)

  const handleInvest = (investmentId: string, amount?: number) => {
    console.log(
      `Investing in: ${investmentId}`,
      amount ? `Amount: ${amount}` : ''
    )

    alert(
      `Investment selected: ${investmentId}${
        amount ? ` with amount: $${amount.toLocaleString()}` : ''
      }`
    )
  }

  if (!investment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The investment you are looking for doesn&apos;t exist or has been
            removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return <TreasuryCard investment={investment} onInvest={handleInvest} />
}

export default InvestmentDetailPageRoute
