'use client'

import { useTranslations } from 'next-intl'
import React, { useState, useEffect } from 'react'

import DocumentViewer from './DocumentViewer'
import ImageComponent from './ImageComponent'

import checkIcon from '@/public/svg/check.svg'
import uploadImg from '@/public/svg/cloud.svg'
import infoImg from '@/public/svg/info.svg'
import redInfoIcon from '@/public/svg/redInfo.svg'
// import deleteImg from '@/public/svg/delete.svg'

interface FileUploadSectionProps {
  title?: string
  titleKey?: string
  subtitle?: string
  subtitleKey?: string
  description: string
  descriptionKey?: string
  accept?: string
  multiple?: boolean
  onFileSelect?: (files: FileList | null) => void
  className?: string
  buttonText?: string
  buttonTextKey?: string
  infoIcon?: string
  uploadIcon?: string
  isLoading?: boolean
  loadingText?: string
  uploadedFileTitle?: string
  uploadedFileDescription?: string
  verifiedFileTitle?: string
  verifiedFileDescription?: string
  isContractPaperRejected?: boolean
  isConfirmationRejected?: boolean
  isProofOfPaymentRejected?: boolean
  // Document-specific props
  documentUrl?: string | null
  isUploaded?: boolean
  isVerified?: boolean
  isApproved?: boolean
  isKycRejected?: boolean
  handleView?: () => void
  handleDelete?: () => void
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  title,
  titleKey,
  description,
  descriptionKey,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  multiple = true,
  onFileSelect,
  className = '',
  buttonText,
  buttonTextKey,
  infoIcon = infoImg,
  uploadIcon = uploadImg,
  isLoading = false,
  uploadedFileTitle,
  uploadedFileDescription,
  verifiedFileTitle,
  verifiedFileDescription,
  loadingText = 'Uploading...',
  documentUrl,
  isUploaded: propIsUploaded = false,
  isVerified: propIsVerified = false,
  isApproved: propIsApproved = false,
  handleView,
  handleDelete,
  isContractPaperRejected = false,
  isProofOfPaymentRejected = false,
  isKycRejected = false,
}) => {
  const t = useTranslations('forms.labels')
  const [, setUploadedFiles] = useState<File[]>([])
  const [isUploaded, setIsUploaded] = useState(false)

  // Reset local state when document is deleted
  useEffect(() => {
    // Only reset if documentUrl is explicitly null or empty string
    // This prevents resetting on initial load when documentUrl is undefined
    if (documentUrl === null || documentUrl === '') {
      setIsUploaded(false)
      setUploadedFiles([])
    }
  }, [documentUrl])

  // Use localized text if keys are provided, otherwise use direct text props
  const displayTitle = title || (titleKey ? t(titleKey) : '')
  const displayDescription = descriptionKey ? t(descriptionKey) : description
  const displayButtonText =
    buttonText || (buttonTextKey ? t(buttonTextKey) : t('uploadFilesDefault'))

  // Determine status based on props
  const getStatusInfo = () => {
    // Check if we have a document URL first
    const hasDocument = documentUrl && documentUrl.trim() !== ''

    if ((propIsVerified || propIsApproved) && hasDocument) {
      return {
        title: verifiedFileTitle,
        description: verifiedFileDescription,
      }
    } else if (propIsUploaded || hasDocument) {
      return {
        title: uploadedFileTitle,
        description: uploadedFileDescription,
      }
    } else {
      return {
        title: displayTitle,
        description: displayDescription,
      }
    }
  }

  const statusInfo = getStatusInfo()

  // Check if we should show uploaded state
  // Priority: propIsUploaded > hasDocument > local isUploaded
  const hasDocument = documentUrl && documentUrl.trim() !== ''
  const shouldShowUploadedState = propIsUploaded || hasDocument || isUploaded

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setUploadedFiles(filesArray)
      setIsUploaded(true)

      if (onFileSelect) {
        onFileSelect(e.target.files)
      } else {
        // Default behavior - log files to console
      }
    }
  }

  // Final rejection state

  // Compute border color based on rejection status
  const borderClass =
    isContractPaperRejected || isProofOfPaymentRejected || isKycRejected
      ? 'border border-danger'
      : 'border border-gray-200'

  return (
    <div className={`bg-white p-4 ${className} ${borderClass}`}>
      <div className="flex flex-wrap justify-between sm:flex-row items-start sm:items-center gap-2 md:gap-4 sm:gap-6">
        {/* Left side - Title and Description */}
        <div className="w-fit">
          <div className="flex items-start gap-4">
            {(propIsVerified || propIsApproved) && hasDocument ? (
              <ImageComponent
                src={checkIcon}
                alt="verified"
                width={20}
                height={20}
                className="mt-1"
              />
            ) : propIsUploaded || documentUrl ? (
              <ImageComponent
                src={redInfoIcon}
                alt="pending"
                width={20}
                height={20}
                className="mt-1"
              />
            ) : (
              <ImageComponent
                src={infoIcon}
                alt="info"
                width={20}
                height={20}
                className="mt-1"
              />
            )}
            <div className="flex-1">
              {statusInfo.title && (
                <h3 className=" mb-1 text-base sm:text-lg fotn-regular ">
                  {statusInfo.title}
                </h3>
              )}
              <p className="text-sm sm:text-base text-light">
                {statusInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Center - Image Preview (only when uploaded or KYC data exists) */}

        {/* Right side - File Upload Button or Delete Button */}
        <div className=" w-fit sm:w-auto ml-[34px] ">
          {!shouldShowUploadedState ? (
            <label className="cursor-pointer block w-full  sm:w-auto  mt-1 sm:mt-0">
              <div
                className={`flex items-center justify-center sm:justify-start sm:gap-5 gap-3 border border-primary  sm:px-10 sm:py-3 py-2 transition-colors hover:bg-blue-50 w-full sm:w-auto relative ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  </div>
                )}
                <ImageComponent
                  src={uploadIcon}
                  alt="upload"
                  width={20}
                  height={20}
                />
                <span className="fotn-regular text-primary ">
                  {isLoading ? loadingText : displayButtonText}
                </span>
              </div>
              <input
                type="file"
                multiple={multiple}
                accept={accept}
                className="hidden w-fit "
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          ) : (
            <div className="flex items-center lg:gap-5 gap-3 mt-2 sm:mt-0">
              {shouldShowUploadedState && (
                <div className="flex-shrink-0  sm:mt-0 ">
                  {/* Show loading state when deleting */}
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm text-gray-600">
                        {loadingText}
                      </span>
                    </div>
                  ) : (
                    /* Show document if available */
                    documentUrl &&
                    !((propIsVerified || propIsApproved) && hasDocument) &&
                    typeof documentUrl === 'string' && (
                      <div className="flex items-center gap-3">
                        <DocumentViewer
                          src={documentUrl}
                          alt="Document"
                          width={64}
                          height={80}
                          className="w-16 h-18 object-cover rounded border"
                          showFullSize={false}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
              {documentUrl && (
                <button
                  onClick={handleView}
                  className={`w-fit sm:w-auto lg:px-8 px-6  lg:py-2 py-1 bg-success text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                    (propIsVerified || propIsApproved) &&
                    hasDocument &&
                    (propIsUploaded || documentUrl) &&
                    '-ml-[10px]'
                  }`}
                  disabled={isLoading}
                >
                  {t('view')}
                </button>
              )}

              {!((propIsVerified || propIsApproved) && hasDocument) &&
                (propIsUploaded || documentUrl) && (
                  <button
                    onClick={handleDelete}
                    className="w-fit sm:w-auto lg:px-8 px-6  lg:py-2 py-1 bg-danger text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {t('delete')}
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploadSection
