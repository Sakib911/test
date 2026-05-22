// Investment-related type definitions following SOLID principles

export interface InvestmentMetrics {
  contractDuration: string
  roi: string
  onboardingTime: string
}

export interface InvestmentReturns {
  threeYearTotal: string
  yearlyTotal: string
  monthlyTotal: string
}

export interface InvestmentData {
  id: string
  title: string
  imageUrl: string
  investmentAmount: number
  metrics: InvestmentMetrics
  returns: InvestmentReturns
  isAvailable?: boolean
  description?: string
  isCustomAmount?: boolean
  minAmount?: number
  maxAmount?: number
  amountStep?: number
}

export interface InvestmentCardProps {
  investment: InvestmentData
  onInvest?: (investmentId: string) => void
  className?: string
  variant?: 'default' | 'compact'
}

// Extensible interface for future investment types
export interface InvestmentType {
  type: 'treasury' | 'private' | 'equity' | 'bond'
  riskLevel: 'low' | 'medium' | 'high'
  category: string
}
