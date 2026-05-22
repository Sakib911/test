'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import type React from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { cn, getUrlFromImage } from '@/lib/utils'

type TitleProps = {
  icon?: React.ReactNode
  class: string
  content: string
}

type MenuItem = {
  label: string
  href: string
  icon?: React.ReactNode
}

type DropDownProps = {
  title: TitleProps
  subtitle: TitleProps
  avatarSrc?: string
  fallback?: string
  menuItems: MenuItem[]
  className?: string
  isMobile?: boolean
  onClose?: () => void
  showAvatar?: boolean
}

const DropDown = ({
  title,
  subtitle,
  avatarSrc,
  showAvatar,
  menuItems,
  className,
}: DropDownProps) => {
  const { logout } = useAuth()
  const t = useTranslations('forms.labels')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button
          variant='ghost'
          className='flex w-full flex-row-reverse hover:text-gray-900 items-center gap-x-1 py-2 text-sm transition-all duration-300  sm:w-auto sm:gap-x-2 sm:py-3'
        >
          <div className='flex flex-1 items-center gap-x-1 sm:gap-x-2'>
            {showAvatar && (
              <Avatar className='h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8'>
                <Image
                  src={getUrlFromImage(avatarSrc || '')}
                  alt='avatar'
                  fill
                  className='object-cover'
                />
              </Avatar>
            )}
            <div className='min-w-0 flex-1 text-left '>
              <div className='flex items-center gap-x-1  '>
                {title.icon && (
                  <span className='h-4 w-4 flex-shrink-0'>{title.icon}</span>
                )}
                <div
                  className={cn(
                    title.class,
                    'truncate',
                    'flex items-center gap-1'
                  )}
                >
                  {title.content}
                </div>
              </div>
              <div className='flex items-center gap-x-1'>
                <div className={cn(subtitle.class, 'truncate')}>
                  {subtitle.content}
                </div>
                <ChevronDown className='h-4 w-4 flex-shrink-0 text-black' />
              </div>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-40 sm:w-52'>
        {menuItems.map((item, index) => (
          <DropdownMenuItem className='cursor-pointer' key={index} asChild>
            {item.href === '/logout' ? (
              <button
                onClick={logout}
                className='flex w-full justify-start gap-2 py-1.5 text-left text-sm text-red-500 outline-none transition-colors hover:bg-gray-100 hover:text-red-600'
              >
                {item.icon && (
                  <span className='h-4 w-4 flex-shrink-0'>{item.icon}</span>
                )}
                {t(item.label)}
              </button>
            ) : (
              <Link
                href={item.href}
                className='flex w-full items-center gap-2 hover:bg-primary hover:text-white'
              >
                {item.icon && (
                  <span className='h-4 w-4 flex-shrink-0'>{item.icon}</span>
                )}
                {t(item.label)}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDown
