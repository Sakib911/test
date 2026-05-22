'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import './investment-grid.css'

interface InvestmentGridProps {
  children: React.ReactNode
  className?: string
  variant?: 'auto-fit' | 'fixed'
}

/**
 * InvestmentGrid Component
 *
 * A responsive grid component that adapts to different screen sizes.
 * Uses CSS Grid with responsive breakpoints for optimal layout.
 * Optimized for screens up to 2800px width with dynamic column sizing.
 */
const InvestmentGrid: React.FC<InvestmentGridProps> = ({
  children,
  className,
  variant = 'auto-fit',
}) => {
  const gridClasses =
    variant === 'auto-fit'
      ? 'investment-grid-ultra-wide grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return <div className={cn(gridClasses, className)}>{children}</div>
}

export default InvestmentGrid
