'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { InvestmentCardProps } from '@/types/investment';
import { Clock, TrendingUp, Timer } from 'lucide-react';
import Image from 'next/image';
import CustomAmountInput from './CustomAmountInput';
import './investment-grid.css';
import Link from 'next/link';

/**
 * InvestmentCard Component
 *
 * A highly responsive and reusable investment card component following SOLID principles:
 * - Single Responsibility: Handles display of investment information
 * - Open/Closed: Extensible through props and variants
 * - Liskov Substitution: Can be replaced with any component implementing InvestmentCardProps
 * - Interface Segregation: Clean, focused interface
 * - Dependency Inversion: Depends on abstractions (props) not concrete implementations
 */
const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  onInvest,
  className,
}) => {
  const {
    id,
    title,
    imageUrl,
    investmentAmount: initialAmount,
    metrics,
    returns,
    isAvailable = true,
    isCustomAmount = false,
    minAmount = 100,
    maxAmount = 1000000,
    amountStep = 100,
  } = investment;

  const [customAmount, setCustomAmount] = useState(initialAmount);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  }, []);

  const currentAmount = useMemo(
    () => (isCustomAmount ? customAmount : initialAmount),
    [isCustomAmount, customAmount, initialAmount]
  );

  const handleInvestClick = useCallback(() => {
    if (onInvest && isAvailable) {
      onInvest(id);
    }
  }, [onInvest, isAvailable, id]);

  const handleAmountChange = useCallback((newAmount: number) => {
    setCustomAmount(newAmount);
  }, []);

  // Memoized components for better performance
  const ImageHeader = useMemo(
    () => (
      <Link
        href={`/investment/${id}`}
        className="relative w-full h-32 sm:h-40 md:h-48 lg:h-52 xl:h-56 overflow-hidden rounded-t-lg cursor-pointer group"
      >
        <Image
          src={imageUrl}
          alt={`${title} investment opportunity`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, (max-width: 2048px) 25vw, 20vw"
          priority={false}
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white text-black">
              Unavailable
            </Badge>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </Link>
    ),
    [id, imageUrl, title, isAvailable]
  );

  const MetricsSection = useMemo(
    () => (
      <div className="">
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 gap-1 sm:gap-2">
          <div className="flex items-center gap-1 flex-1 max-w-fit min-w-0 ">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs truncate">{metrics.contractDuration}</span>
          </div>
          <div className="flex items-center gap-1 flex-1 max-w-fit min-w-0 ">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs truncate">{metrics.roi}</span>
          </div>
          <div className="flex items-center gap-1 flex-1 max-w-fit min-w-0 ">
            <Timer className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs truncate">{metrics.onboardingTime}</span>
          </div>
        </div>
      </div>
    ),
    [metrics]
  );

  const AmountSection = useMemo(
    () => (
      <div className="my-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {title}
          </h3>
          <div className="flex-1 sm:flex-initial">
            {isCustomAmount ? (
              <CustomAmountInput
                value={currentAmount}
                onChange={handleAmountChange}
                minAmount={minAmount}
                maxAmount={maxAmount}
                step={amountStep}
                disabled={!isAvailable}
                className="justify-center sm:justify-end"
              />
            ) : (
              <div className="flex items-center justify-center sm:justify-end gap-1 text-green-600">
                <span className="text-xl sm:text-2xl font-bold">
                  {formatCurrency(currentAmount)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    [
      title,
      isCustomAmount,
      currentAmount,
      minAmount,
      maxAmount,
      amountStep,
      isAvailable,
      handleAmountChange,
      formatCurrency,
    ]
  );

  const ReturnsSection = useMemo(
    () => (
      <div className="px-3 py-5  rounded-lg bg-background">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-600">
              3 Year total return
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {returns.threeYearTotal}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-600">
              Yearly total Return
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {returns.yearlyTotal}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-600">
              Monthly total return
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {returns.monthlyTotal}
            </span>
          </div>
        </div>
      </div>
    ),
    [returns]
  );

  const ActionButton = useMemo(
    () => (
      <div className="">
        <Button onClick={handleInvestClick} disabled={!isAvailable}>
          Invest Now
        </Button>
      </div>
    ),
    [handleInvestClick, isAvailable]
  );

  const cardContent = useMemo(
    () => (
      <>
        {ImageHeader}
        <div className="p-3">
          {MetricsSection}
          {AmountSection}
          {ReturnsSection}
          {ActionButton}
        </div>
      </>
    ),
    [ImageHeader, MetricsSection, AmountSection, ReturnsSection, ActionButton]
  );

  const cardClasses = useMemo(
    () =>
      cn(
        'bg-white card-shadow-3 overflow-hidden transition-all duration-300  hover:scale-[1.02]',
        // Responsive sizing using custom CSS
        'investment-card-responsive',
        // Responsive padding
        'p-0',
        // Responsive margins
        'mx-auto',
        !isAvailable && 'opacity-75',
        className
      ),
    [isAvailable, className]
  );

  return <Card className={cardClasses}>{cardContent}</Card>;
};

export default InvestmentCard;
