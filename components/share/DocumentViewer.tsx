'use client'

import React from 'react'

import { ImageComponent } from '@/components/share'
import { getFileTypeFromUrl } from '@/lib/fileUtils'

interface DocumentViewerProps {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  showFullSize?: boolean
}

// document viewer
const DocumentViewer: React.FC<DocumentViewerProps> = ({
  src,
  alt = 'Document',
  width,
  height,
  className = '',
  showFullSize = false,
}) => {
  const fileType = getFileTypeFromUrl(src)

  // pdf file
  if (fileType === 'pdf') {
    return (
      <div className=''>
        {showFullSize ? (
          <iframe
            src={src}
            width='100%'
            height='800px'
            title={alt}
            className='p-4'
          />
        ) : (
          <div className='text-4xl py-2 border flex items-center justify-center'>
            📄
          </div>
        )}
      </div>
    )
  }

  // word document file
  if (fileType === 'doc') {
    return (
      <div className={`  ${className}`}>
        {showFullSize ? (
          <div className='flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200'>
            <div className='text-7xl mb-6'>📝</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Word Document
            </h3>
            <p className='text-gray-600 mb-6 text-center max-w-md'>
              Word documents cannot be previewed directly in the browser. You
              can download the document to view it on your device.
            </p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <a
                href={src}
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center justify-center gap-2'
                onClick={e => {
                  // Prevent any modal close or other side effects
                  e.stopPropagation()
                }}
              >
                <span>📥</span>
                Download Document
              </a>
              <a
                href={src}
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium inline-flex items-center justify-center gap-2'
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <span>👁️</span>
                Open in New Tab
              </a>
            </div>
            <p className='text-xs text-gray-400 mt-4'>
              Supported formats: .doc, .docx
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center p-5 bg-sand rounded'>
            <div className='text-4xl '>📝</div>
            <p className='text-xs text-gray-500 mt-1'>Word Document</p>
          </div>
        )}
      </div>
    )
  }
  // image file
  if (fileType === 'image') {
    return (
      <ImageComponent
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    )
  }
  // unknown file type
  // Fallback for unknown file types
  return (
    <div className={` rounded p-4 bg-gray-50 ${className}`}>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-sm text-gray-600 mb-2'>Document</p>
      </div>
    </div>
  )
}

export default DocumentViewer
