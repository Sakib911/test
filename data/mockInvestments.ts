import { InvestmentData } from '@/types/investment'

/**
 * Mock investment data for demonstration purposes
 * This follows the Interface Segregation Principle by providing
 * only the data structure needed by the InvestmentCard component
 */
export const mockInvestments: InvestmentData[] = [
  {
    id: 'treasury-001',
    title: 'Treasury',
    imageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    investmentAmount: 50000,
    metrics: {
      contractDuration: '3Y contract',
      roi: '3-5% ROI',
      onboardingTime: '60s Onboarding',
    },
    returns: {
      threeYearTotal: '108%-180%',
      yearlyTotal: '36%-60%',
      monthlyTotal: '3-5%',
    },
    isAvailable: true,
    description:
      'Secure government-backed treasury investment with stable returns',
  },
  {
    id: 'private-001',
    title: 'Private',
    imageUrl:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    investmentAmount: 100000,
    metrics: {
      contractDuration: '3Y contract',
      roi: '3-6% ROI',
      onboardingTime: '60s Onboarding',
    },
    returns: {
      threeYearTotal: '108%-216%',
      yearlyTotal: '36%-72%',
      monthlyTotal: '3-6%',
    },
    isAvailable: true,
    description:
      'Exclusive private investment opportunities with higher potential returns',
  },
  {
    id: 'equity-001',
    title: 'Equity',
    imageUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
    investmentAmount: 25000,
    metrics: {
      contractDuration: '5Y contract',
      roi: '5-8% ROI',
      onboardingTime: '90s Onboarding',
    },
    returns: {
      threeYearTotal: '150%-240%',
      yearlyTotal: '50%-80%',
      monthlyTotal: '4-7%',
    },
    isAvailable: false,
    description: 'High-growth equity investment with variable returns',
  },
  {
    id: 'realestate-001',
    title: 'Real Estate',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    investmentAmount: 75000,
    metrics: {
      contractDuration: '7Y contract',
      roi: '6-10% ROI',
      onboardingTime: '120s Onboarding',
    },
    returns: {
      threeYearTotal: '118%-210%',
      yearlyTotal: '39%-70%',
      monthlyTotal: '3.25-5.8%',
    },
    isAvailable: true,
    description: 'Diversified real estate portfolio for long-term growth',
  },
  {
    id: 'crypto-001',
    title: 'Crypto Fund',
    imageUrl:
      'https://images.unsplash.com/photo-1518544801345-7a3c1ffb3aef?w=400&h=300&fit=crop',
    investmentAmount: 15000,
    metrics: {
      contractDuration: '2Y contract',
      roi: '10-25% ROI',
      onboardingTime: '30s Onboarding',
    },
    returns: {
      threeYearTotal: '180%-375%',
      yearlyTotal: '60%-125%',
      monthlyTotal: '5-10%',
    },
    isAvailable: true,
    description: 'High-risk, high-reward cryptocurrency investment fund',
  },
  {
    id: 'green-001',
    title: 'Green Energy',
    imageUrl:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
    investmentAmount: 40000,
    metrics: {
      contractDuration: '4Y contract',
      roi: '4-7% ROI',
      onboardingTime: '75s Onboarding',
    },
    returns: {
      threeYearTotal: '112%-168%',
      yearlyTotal: '37%-56%',
      monthlyTotal: '3-4.7%',
    },
    isAvailable: true,
    description: 'Invest in renewable energy projects for a sustainable future',
  },
  {
    id: 'startup-001',
    title: 'Startup Seed',
    imageUrl:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    investmentAmount: 20000,
    metrics: {
      contractDuration: '6Y contract',
      roi: '8-20% ROI',
      onboardingTime: '180s Onboarding',
    },
    returns: {
      threeYearTotal: '124%-260%',
      yearlyTotal: '41%-87%',
      monthlyTotal: '3.4-7.2%',
    },
    isAvailable: false,
    description: 'Early-stage startup investment with high growth potential',
  },
  {
    id: 'commodities-001',
    title: 'Commodities',
    imageUrl:
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop',
    investmentAmount: 30000,
    metrics: {
      contractDuration: '3Y contract',
      roi: '4-6% ROI',
      onboardingTime: '60s Onboarding',
    },
    returns: {
      threeYearTotal: '112%-148%',
      yearlyTotal: '37%-49%',
      monthlyTotal: '3-4.1%',
    },
    isAvailable: true,
    description: 'Diversified commodities investment for portfolio stability',
  },
  {
    id: 'tech-001',
    title: 'Tech Growth',
    imageUrl:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    investmentAmount: 60000,
    metrics: {
      contractDuration: '5Y contract',
      roi: '7-12% ROI',
      onboardingTime: '90s Onboarding',
    },
    returns: {
      threeYearTotal: '121%-200%',
      yearlyTotal: '40%-67%',
      monthlyTotal: '3.3-5.5%',
    },
    isAvailable: true,
    description: 'Invest in leading technology companies for superior returns',
  },
  {
    id: 'custom-001',
    title: 'Custom',
    imageUrl:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    investmentAmount: 500,
    metrics: {
      contractDuration: 'Flexible',
      roi: '4-8% ROI',
      onboardingTime: '30s Onboarding',
    },
    returns: {
      threeYearTotal: '112%-200%',
      yearlyTotal: '37%-67%',
      monthlyTotal: '3-5.5%',
    },
    isAvailable: true,
    description:
      'Customize your investment amount for flexible portfolio management',
    isCustomAmount: true,
    minAmount: 100,
    maxAmount: 500000,
    amountStep: 50,
  },
]

/**
 * Helper function to get investment by ID
 * Demonstrates Single Responsibility Principle
 */
export const getInvestmentById = (id: string): InvestmentData | undefined => {
  return mockInvestments.find((investment) => investment.id === id)
}

/**
 * Helper function to get available investments
 * Demonstrates Single Responsibility Principle
 */
export const getAvailableInvestments = (): InvestmentData[] => {
  return mockInvestments.filter((investment) => investment.isAvailable)
}
