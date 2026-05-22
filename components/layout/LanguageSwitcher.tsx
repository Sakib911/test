'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
]

interface LanguageSwitcherProps {
  className?: string
  variant?: 'default' | 'sidebar' | 'header'
}

export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en'
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'

    // Create new path with locale prefix
    const newPath = `/${languageCode}${pathWithoutLocale}`

    // Use router.replace to avoid adding to history
    router.replace(newPath)
    setIsOpen(false)
  }

  if (variant === 'sidebar') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-between px-3 py-2 h-auto text-left font-medium dark:text-white text-black hover:bg-white/10',
              className
            )}
          >
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{currentLanguage.code.toUpperCase()}</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                'flex items-center space-x-2 cursor-pointer',
                currentLanguage.code === language.code && 'bg-accent'
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'header') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', className)}
          >
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                'flex items-center space-x-2 cursor-pointer',
                currentLanguage.code === language.code && 'bg-accent'
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn('flex items-center space-x-2', className)}
        >
          <Globe className="w-4 h-4" />
          <span>{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              'flex items-center space-x-2 cursor-pointer',
              currentLanguage.code === language.code && 'bg-accent'
            )}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
