import Image from 'next/image'
import React from 'react'

import type { StaticImageData } from 'next/image'

interface ImageProps {
  src?: string | StaticImageData
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

/**
 * ImageComponent - Enhanced Next.js Image component with responsive features
 *
 * Features:
 * - Responsive image loading with proper sizing
 * - Priority loading for above-the-fold images
 * - Automatic responsive sizing with sizes attribute
 * - Fallback dimensions for better performance
 */
const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  width = 500,
  height = 500,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw',
}) => {
  return (
    <Image
      src={src || 'N/A'}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={100}
    />
  )
}

export default ImageComponent
