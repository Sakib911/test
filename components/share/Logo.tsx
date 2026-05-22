import Image from 'next/image'

import { useBasicSiteInfo } from '../../contexts/site-config-context'

import { cn } from '@/lib/utils'
import LogoImg from '@/public/svg/logo.svg'

interface LogoProps {
  /**
   * Size variant for the logo
   * @default 'default'
   */
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Whether to prioritize loading this image
   * @default false
   */
  priority?: boolean

  /**
   * Alt text for the logo
   * @default 'Company Logo'
   */
  alt?: string

  /**
   * Whether the logo should be clickable (for navigation)
   * @default false
   */
  clickable?: boolean

  /**
   * Click handler for when logo is clickable
   */
  onClick?: () => void

  /**
   * Custom width and height (overrides size variant)
   */
  width?: number
  height?: number
}

const Logo = ({
  size = 'default',
  className,
  priority = false,
  alt = 'Company Logo',
  clickable = false,
  onClick,
  width,
  height,
}: LogoProps) => {
  const { logoUrl } = useBasicSiteInfo()

  // Size variants with responsive classes
  const sizeVariants = {
    xs: 'w-16 h-auto sm:w-20',
    sm: 'w-24 h-auto sm:w-28',
    default: 'w-32 h-auto sm:w-40 md:w-48 lg:w-52',
    lg: 'w-48 h-auto sm:w-56 md:w-64 lg:w-72',
    xl: 'w-64 h-auto sm:w-72 md:w-80 lg:w-96',
  }

  // Use custom dimensions or fallback to size variant
  const imageWidth = width || 500
  const imageHeight = height || 500
  const sizeClass = width && height ? '' : sizeVariants[size]

  const logoImage = (
    <Image
      src={logoUrl || LogoImg}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={cn(
        sizeClass,
        'object-contain',
        clickable &&
          'cursor-pointer transition-opacity hover:opacity-80 active:opacity-70',
        className
      )}
      priority={priority}
      quality={100}
      placeholder="empty"
    />
  )

  // Wrap in button if clickable
  if (clickable && onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="inline-block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        aria-label="Go to homepage"
      >
        {logoImage}
      </button>
    )
  }

  // Wrap in div for consistent styling
  return <div className="inline-block">{logoImage}</div>
}

export default Logo
