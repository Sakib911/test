'use client'

import React from 'react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

// ===== HEADER & TITLE SKELETONS =====

export const TitleSkeleton = ({
  width = 'w-32',
  height = 'h-6',
  className = '',
}: {
  width?: string
  height?: string
  className?: string
}) => (
  <div className={`mb-2 text-center ${className}`}>
    <Skeleton className={`${height} ${width} mx-auto`} />
  </div>
)

export const SubtitleSkeleton = ({
  width = 'w-24',
  height = 'h-4',
  className = '',
}: {
  width?: string
  height?: string
  className?: string
}) => (
  <div className={`text-center mb-5 ${className}`}>
    <Skeleton className={`${height} ${width} mx-auto`} />
  </div>
)

export const HeaderSkeleton = ({
  titleWidth = 'w-32',
  subtitleWidth = 'w-24',
  showDivider = true,
  className = '',
}: {
  titleWidth?: string
  subtitleWidth?: string
  showDivider?: boolean
  className?: string
}) => (
  <div className={`mt-5 ${className}`}>
    <TitleSkeleton width={titleWidth} />
    <SubtitleSkeleton width={subtitleWidth} />
    {showDivider && <hr className='mt-5 border-border' />}
  </div>
)

// ===== PROFILE & USER INFO SKELETONS =====

export const ProfileImageSkeleton = ({
  size = 100,
  className = '',
}: {
  size?: number
  className?: string
}) => (
  <Skeleton
    className={`w-[${size}px] h-[${size}px] rounded-full ${className}`}
  />
)

export const ProfileInfoSkeleton = ({
  showQuestion = true,
  showImage = true,
  showContactInfo = true,
  imageSize = 100,
  className = '',
}: {
  showQuestion?: boolean
  showImage?: boolean
  showContactInfo?: boolean
  imageSize?: number
  className?: string
}) => (
  <div
    className={`flex flex-col items-center justify-center gap-5 ${className}`}
  >
    {showQuestion && (
      <div className='text-center'>
        <Skeleton className='h-5 w-64 mx-auto mb-2' />
        <Skeleton className='h-5 w-48 mx-auto' />
      </div>
    )}

    {showImage && <ProfileImageSkeleton size={imageSize} />}

    {showContactInfo && (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Skeleton className='h-4 w-48' />
        <Skeleton className='h-4 w-36' />
      </div>
    )}
  </div>
)

// ===== TIMELINE & STEPS SKELETONS =====

export const TimelineStepSkeleton = ({
  index,
  isLast = false,
}: {
  index: number
  isLast?: boolean
}) => (
  <div key={index} className='relative flex items-center'>
    {/* Step Circle Skeleton */}
    <div className='mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full'>
      <Skeleton className='h-6 w-6 rounded-full' />
    </div>

    {/* Step Label Skeleton */}
    <Skeleton className='h-4 w-32' />

    {/* Connecting Line Skeleton (except for last step) */}
    {!isLast && <div className='absolute left-3 top-7 h-10 w-0.5 bg-border' />}
  </div>
)

export const TimelineSkeleton = ({
  steps = 5,
  showDivider = true,
  className = '',
}: {
  steps?: number
  showDivider?: boolean
  className?: string
}) => (
  <div className={`py-5 ${className}`}>
    <div className='relative'>
      <div className='space-y-8'>
        {Array.from({ length: steps }).map((_, index) => (
          <TimelineStepSkeleton
            key={index}
            index={index}
            isLast={index === steps - 1}
          />
        ))}
      </div>
    </div>
    {showDivider && <hr className='my-5 border-border' />}
  </div>
)

// ===== CARD & CONTENT SKELETONS =====

export const CardContentSkeleton = ({
  showHeader = true,
  headerLines = 2,
  showBody = true,
  bodyLines = 3,
  showFooter = false,
  className = '',
}: {
  showHeader?: boolean
  headerLines?: number
  showBody?: boolean
  bodyLines?: number
  showFooter?: boolean
  className?: string
}) => (
  <div className={`p-4 ${className}`}>
    {showHeader && (
      <div className='mb-4'>
        {Array.from({ length: headerLines }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-4 mb-2 ${
              index === 0
                ? 'w-full max-w-md'
                : index === 1
                  ? 'w-3/4 max-w-xs'
                  : 'w-2/3 max-w-sm'
            }`}
          />
        ))}
      </div>
    )}

    {showBody && (
      <div className='mb-4'>
        {Array.from({ length: bodyLines }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-4 mb-2 ${index % 2 === 0 ? 'w-full' : 'w-4/5'}`}
          />
        ))}
      </div>
    )}

    {showFooter && <Skeleton className='h-10 w-full' />}
  </div>
)

export const InvestmentCardSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <Card className={`p-4 mb-6 border border-border rounded-none ${className}`}>
    <div className='flex items-center justify-between'>
      {/* Bank Logo Skeleton */}
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center'>
          <Skeleton className='h-6 w-12' />
        </div>
      </div>

      <div className='text-center px-6 border-l border-r border-border'>
        <Skeleton className='h-8 w-24 mx-auto' />
      </div>

      <div className='text-center px-6 border-r border-border'>
        <Skeleton className='h-8 w-16 mx-auto' />
      </div>

      <div className='text-center px-6'>
        <Skeleton className='h-8 w-20 mx-auto' />
      </div>
    </div>
  </Card>
)

// ===== MODAL CONTENT SKELETONS =====

export const ModalContentSkeleton = ({
  showDescription = true,
  showCard = true,
  showButton = true,
  className = '',
}: {
  showDescription?: boolean
  showCard?: boolean
  showButton?: boolean
  className?: string
}) => (
  <div className={`p-3 ${className}`}>
    {showDescription && (
      <div className='text-center mb-6'>
        <Skeleton className='h-4 w-full max-w-md mx-auto mb-2' />
        <Skeleton className='h-4 w-3/4 max-w-xs mx-auto' />
      </div>
    )}

    {showCard && <InvestmentCardSkeleton />}

    {showButton && <Skeleton className='w-full h-10' />}
  </div>
)

// ===== FORM SKELETONS =====

export const FormFieldSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`mb-4 ${className}`}>
    <Skeleton className='h-4 w-24 mb-2' />
    <Skeleton className='h-10 w-full' />
  </div>
)

export const FormSkeleton = ({
  fields = 3,
  showButton = true,
  className = '',
}: {
  fields?: number
  showButton?: boolean
  className?: string
}) => (
  <div className={`${className}`}>
    {Array.from({ length: fields }).map((_, index) => (
      <FormFieldSkeleton key={index} />
    ))}
    {showButton && <Skeleton className='h-10 w-full mt-4' />}
  </div>
)

// ===== LIST & TABLE SKELETONS =====

export const ListItemSkeleton = ({
  showIcon = false,
  className = '',
}: {
  showIcon?: boolean
  className?: string
}) => (
  <div className={`flex items-center gap-3 p-3 ${className}`}>
    {showIcon && <Skeleton className='h-6 w-6 rounded' />}
    <div className='flex-1'>
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-3 w-3/4' />
    </div>
  </div>
)

export const ListSkeleton = ({
  items = 5,
  showIcons = false,
  className = '',
}: {
  items?: number
  showIcons?: boolean
  className?: string
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <ListItemSkeleton key={index} showIcon={showIcons} />
    ))}
  </div>
)

// ===== OFFER & INVESTMENT SKELETONS =====

export const OfferCardSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`bg-gray-50 rounded-lg mb-6 border ${className}`}>
    <div className='grid grid-cols-4 gap-4 items-center px-1 py-3'>
      {/* Bank Logo Skeleton */}
      <div className='text-center border-r border-border'>
        <div className='flex justify-center'>
          <DocumentSkeleton className='w-5 h-5 rounded' />
        </div>
      </div>

      {/* Investment Amount Skeleton */}
      <div className='text-center border-r border-border'>
        <DocumentSkeleton className='h-5 w-20 mx-auto' />
      </div>

      {/* Interest Rate Skeleton */}
      <div className='text-center border-r border-border'>
        <DocumentSkeleton className='h-5 w-16 mx-auto bg-primary/10' />
      </div>

      {/* Duration Skeleton */}
      <div className='text-center'>
        <DocumentSkeleton className='h-5 w-18 mx-auto' />
      </div>
    </div>
  </div>
)

export const PaymentProofModalSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`p-6 animate-pulse ${className}`}>
    <div className='text-center mb-6 space-y-2'>
      <DocumentSkeleton className='h-4 w-full max-w-md mx-auto transition-all duration-300' />
      <DocumentSkeleton className='h-4 w-3/4 max-w-sm mx-auto transition-all duration-300' />
    </div>

    {/* Offer Card Skeleton */}
    <div className='mb-6'>
      <OfferCardSkeleton className='transition-all duration-300' />
    </div>

    {/* Button Skeleton */}
    <div className='text-center'>
      <DocumentSkeleton className='w-full h-10 bg-primary/20 border border-primary transition-all duration-300' />
    </div>
  </div>
)

export const KycCompletionModalSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`p-6 text-center animate-pulse ${className}`}>
    {/* Description text skeleton */}
    <div className='mb-6 space-y-2'>
      <DocumentSkeleton className='h-4 w-full max-w-sm mx-auto transition-all duration-300' />
      <DocumentSkeleton className='h-4 w-4/5 max-w-xs mx-auto transition-all duration-300' />
    </div>

    {/* Button skeleton */}
    <DocumentSkeleton className='w-full h-10 bg-primary/20 border border-primary transition-all duration-300' />
  </div>
)

// ===== SECURITY PAGE SKELETONS =====

export const SecurityHeaderSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div
    className={`flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6 animate-pulse ${className}`}
  >
    <div className='flex-1 space-y-2'>
      <DocumentSkeleton className='h-8 w-3/4 max-w-md' />
      <DocumentSkeleton className='h-4 w-full max-w-lg' />
    </div>
    <div className='flex-shrink-0'>
      <DocumentSkeleton className='w-full lg:w-32 h-10 bg-sand/60 border border-border' />
    </div>
  </div>
)

export const SecurityLevelSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div
    className={`bg-white p-4 lg:p-5 rounded-lg my-4 lg:my-8 animate-pulse ${className}`}
  >
    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6'>
      <div className='flex-1 space-y-2'>
        <DocumentSkeleton className='h-7 w-48' />
        <DocumentSkeleton className='h-4 w-full max-w-md' />
      </div>
      <div className='w-14 h-14 rounded-full bg-sand/60 border border-border flex-shrink-0' />
    </div>

    {/* Progress bar skeleton */}
    <div className='my-5'>
      <DocumentSkeleton className='h-5 w-full rounded-lg' />
    </div>

    <div className='flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-4'>
      <DocumentSkeleton className='h-4 w-16' />
      <DocumentSkeleton className='h-4 w-20' />
      <DocumentSkeleton className='h-4 w-18' />
    </div>
  </div>
)

export const PasswordSetupSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div
    className={`bg-white p-4 sm:p-5 lg:p-6 rounded-lg my-4 sm:my-6 lg:my-8 animate-pulse ${className}`}
  >
    <div className='space-y-4'>
      {/* Header */}
      <div className='space-y-2'>
        <DocumentSkeleton className='h-7 w-64' />
        <DocumentSkeleton className='h-4 w-full max-w-lg' />
      </div>

      {/* Form fields */}
      <div className='space-y-4 mt-6'>
        <FormFieldSkeleton />
        <FormFieldSkeleton />

        {/* Button */}
        <div className='flex'>
          <DocumentSkeleton className='h-10 w-full sm:w-32 bg-primary/20 border border-primary' />
        </div>
      </div>
    </div>
  </div>
)

export const ChangePasswordSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`space-y-4 animate-pulse ${className}`}>
    <div className='flex justify-between items-center'>
      <div className='space-y-2'>
        <DocumentSkeleton className='h-7 w-48' />
        <DocumentSkeleton className='h-4 w-32' />
      </div>
    </div>

    {/* Form fields */}
    <div className='space-y-4'>
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />

      {/* Button */}
      <div className='flex'>
        <DocumentSkeleton className='h-10 w-full sm:w-40 bg-primary/20 border border-primary' />
      </div>
    </div>
  </div>
)

// ===== PROFILE PAGE SKELETONS =====

export const ProfilePhotoSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`space-y-4 animate-pulse ${className}`}>
    <DocumentSkeleton className='h-8 w-48' />

    <div className='flex justify-start'>
      <div className='w-32 h-32 rounded-full bg-sand border-2 border-border flex items-center justify-center'>
        <div className='text-center p-6'>
          <DocumentSkeleton className='h-4 w-20 mx-auto' />
        </div>
      </div>
    </div>
  </div>
)

export const ProfileFormSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div
    className={`bg-white p-6 rounded-lg space-y-6 animate-pulse ${className}`}
  >
    {/* Form fields in grid layout */}
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
    </div>

    {/* Submit button */}
    <div className='col-span-3'>
      <DocumentSkeleton className='h-10 w-full sm:w-40 bg-primary/20 border border-primary' />
    </div>
  </div>
)

export const PersonalInfoSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`space-y-6 ${className}`}>
    {/* Profile Photo Section */}
    <div className='mb-16'>
      <ProfilePhotoSkeleton />
    </div>

    {/* Form Section */}
    <ProfileFormSkeleton />
  </div>
)

export const ProfileTabsSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`bg-background py-8 animate-pulse ${className}`}>
    {/* Tab headers */}
    <div className='mb-6 flex space-x-4 border-b border-border'>
      <DocumentSkeleton className='h-10 w-20 mb-2' />
      <DocumentSkeleton className='h-10 w-32 mb-2' />
    </div>

    {/* Tab content */}
    <PersonalInfoSkeleton />
  </div>
)

// ===== DOCUMENT UPLOAD SKELETONS =====

// Custom DocumentSkeleton that uses project's sand color for better visibility
export const DocumentSkeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-sand', className)}
    {...props}
  />
)

export const DocumentUploadHeaderSkeleton = ({
  titleWidth = 'w-48',
  descriptionLines = 2,
  maxDescriptionWidth = 'max-w-md',
  showRequiredButton = true,
  className = '',
}: {
  titleWidth?: string
  descriptionLines?: number
  maxDescriptionWidth?: string
  showRequiredButton?: boolean
  className?: string
}) => (
  <div
    className={`flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6 mb-4 sm:mb-5 ${className}`}
  >
    <div className='flex-1'>
      {/* Title skeleton */}
      <div className='mb-2'>
        <DocumentSkeleton className={`h-6 ${titleWidth}`} />
      </div>
      {/* Description skeleton */}
      <div className='space-y-2'>
        {Array.from({ length: descriptionLines }).map((_, index) => (
          <DocumentSkeleton
            key={index}
            className={`h-4 ${
              index === 0
                ? `w-full ${maxDescriptionWidth}`
                : index === 1
                  ? 'w-3/4 max-w-sm'
                  : 'w-2/3 max-w-xs'
            }`}
          />
        ))}
      </div>
    </div>
    {/* Required button skeleton */}
    {showRequiredButton && (
      <div className='w-full lg:w-auto'>
        <DocumentSkeleton className='h-10 w-full lg:w-24' />
      </div>
    )}
  </div>
)

export const FileUploadSectionSkeleton = ({
  showDocumentPreview = false,
  showUploadButton = true,
  showActionButtons = false,
  className = '',
}: {
  showDocumentPreview?: boolean
  showUploadButton?: boolean
  showActionButtons?: boolean
  className?: string
}) => (
  <div className={`mb-6 ${className}`}>
    <div className='border border-borderColor bg-white p-4 sm:p-6'>
      <div className='flex flex-wrap sm:flex-row items-start sm:items-center gap-4 sm:gap-6'>
        {/* Left side - Status Icon, Title and Description */}
        <div className='flex-1'>
          <div className='flex items-start gap-4'>
            {/* Status icon skeleton */}
            <DocumentSkeleton className='w-5 h-5 mt-1 flex-shrink-0 rounded' />

            <div className='flex-1'>
              {/* Status title skeleton */}
              <DocumentSkeleton className='h-5 w-40 mb-1' />
              {/* Status description skeleton */}
              <DocumentSkeleton className='h-4 w-full max-w-md' />
            </div>
          </div>
        </div>

        {/* Center - Document Preview Skeleton (conditional) */}
        {showDocumentPreview && (
          <div className='flex-shrink-0 mt-4 sm:mt-0'>
            <DocumentSkeleton className='w-16 h-20 border border-sandBorder rounded' />
          </div>
        )}

        {/* Right side - Upload Button OR Action Buttons (conditional) */}
        <div className='flex-shrink-0 w-full sm:w-auto'>
          {showUploadButton ? (
            /* Upload button skeleton */
            <DocumentSkeleton className='h-10 w-full sm:w-auto min-w-[140px] border border-primary bg-primary/10' />
          ) : showActionButtons ? (
            /* View/Delete buttons skeleton */
            <div className='flex items-center gap-5'>
              <DocumentSkeleton className='h-9 w-16 bg-success/20' />
              <DocumentSkeleton className='h-9 w-20 bg-danger/20' />
            </div>
          ) : (
            /* Default loading state */
            <div className='flex items-center gap-3'>
              <DocumentSkeleton className='h-4 w-4 rounded-full' />
              <DocumentSkeleton className='h-4 w-24' />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)

export const DocumentUploadSkeleton = ({
  titleWidth = 'w-48',
  descriptionLines = 2,
  maxDescriptionWidth = 'max-w-md',
  showRequiredButton = true,
  className = '',
}: {
  titleWidth?: string
  descriptionLines?: number
  maxDescriptionWidth?: string
  showRequiredButton?: boolean
  className?: string
}) => (
  <div
    className={`bg-white p-4 sm:p-5 lg:p-6 rounded-lg my-4 sm:my-6 lg:my-8 animate-pulse ${className}`}
  >
    <DocumentUploadHeaderSkeleton
      titleWidth={titleWidth}
      descriptionLines={descriptionLines}
      maxDescriptionWidth={maxDescriptionWidth}
      showRequiredButton={showRequiredButton}
    />
    <FileUploadSectionSkeleton />
  </div>
)

// Enhanced DocumentUploadSkeleton with better FileUploadSection integration
export const EnhancedDocumentUploadSkeleton = ({
  titleWidth = 'w-48',
  descriptionLines = 2,
  maxDescriptionWidth = 'max-w-md',
  showRequiredButton = true,
  showDocumentPreview = false,
  showUploadButton = true,
  showActionButtons = false,
  className = '',
}: {
  titleWidth?: string
  descriptionLines?: number
  maxDescriptionWidth?: string
  showRequiredButton?: boolean
  showDocumentPreview?: boolean
  showUploadButton?: boolean
  showActionButtons?: boolean
  className?: string
}) => (
  <div
    className={`bg-white p-4 sm:p-5 lg:p-6 rounded-lg my-4 sm:my-6 lg:my-8 animate-pulse ${className}`}
  >
    <DocumentUploadHeaderSkeleton
      titleWidth={titleWidth}
      descriptionLines={descriptionLines}
      maxDescriptionWidth={maxDescriptionWidth}
      showRequiredButton={showRequiredButton}
    />
    <FileUploadSectionSkeleton
      showDocumentPreview={showDocumentPreview}
      showUploadButton={showUploadButton}
      showActionButtons={showActionButtons}
    />
  </div>
)

// Specific variants for different upload types with proper states
export const KycUploadSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <EnhancedDocumentUploadSkeleton
    titleWidth='w-48'
    descriptionLines={2}
    maxDescriptionWidth='max-w-md'
    showRequiredButton={true}
    showUploadButton={true}
    showDocumentPreview={false}
    showActionButtons={false}
    className={className}
  />
)

export const ContactPaperUploadSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <EnhancedDocumentUploadSkeleton
    titleWidth='w-40'
    descriptionLines={1}
    maxDescriptionWidth='max-w-sm'
    showRequiredButton={false}
    showUploadButton={true}
    showDocumentPreview={false}
    showActionButtons={false}
    className={className}
  />
)

export const PaymentProofUploadSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <EnhancedDocumentUploadSkeleton
    titleWidth='w-60'
    descriptionLines={1}
    maxDescriptionWidth='max-w-sm'
    showRequiredButton={true}
    showUploadButton={true}
    showDocumentPreview={false}
    showActionButtons={false}
    className={className}
  />
)

// Legacy DocumentUploadSkeleton for backward compatibility
export const DocumentUploadSkeletonLegacy = DocumentUploadSkeleton

// ===== COMPLEX LAYOUT SKELETONS =====

export const DashboardSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
  <div className={`space-y-6 ${className}`}>
    <HeaderSkeleton />
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className='p-4'>
          <CardContentSkeleton />
        </Card>
      ))}
    </div>
  </div>
)

export const PageSkeleton = ({
  showHeader = true,
  showContent = true,
  showSidebar = false,
  className = '',
}: {
  showHeader?: boolean
  showContent?: boolean
  showSidebar?: boolean
  className?: string
}) => (
  <div className={`min-h-screen ${className}`}>
    {showHeader && <HeaderSkeleton />}
    <div className={`flex ${showSidebar ? 'gap-6' : ''}`}>
      {showSidebar && (
        <div className='w-64 flex-shrink-0'>
          <ListSkeleton items={8} showIcons />
        </div>
      )}
      {showContent && (
        <div className='flex-1'>
          <CardContentSkeleton headerLines={3} bodyLines={6} />
        </div>
      )}
    </div>
  </div>
)
