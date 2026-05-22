// Main components
export { default as InvestmentCard } from './InvestmentCard'

export { default as InvestmentGrid } from './InvestmentGrid'
export { default as InvestmentCardExample } from './InvestmentCardExample'
export { default as CustomAmountInput } from './CustomAmountInput'
export { default as TreasuryCard } from './TreasuryCard'
export { default as ApproximateReturnCard } from './ApproximateReturnCard'

// Types
export type {
  InvestmentData,
  InvestmentCardProps,
  InvestmentMetrics,
  InvestmentReturns,
  InvestmentType,
} from '@/types/investment'

// Data utilities
export {
  mockInvestments,
  getInvestmentById,
  getAvailableInvestments,
} from '@/data/mockInvestments'
