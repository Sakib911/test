'use client'

import { X } from 'lucide-react'
import React from 'react'

import type { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export interface ModalHeaderProps {
  title?: string
  description?: string
  icon?: ReactNode
  showCloseButton?: boolean
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  closeButtonClassName?: string
}

export interface ModalProps {
  // Modal state
  isOpen: boolean
  onOpenChange?: (open: boolean) => void

  // Header configuration
  header?: ModalHeaderProps

  // Content
  children: ReactNode

  // Styling
  className?: string
  dialogContentClassName?: string
  contentClassName?: string

  // Size options
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

  // Callbacks
  onClose?: () => void
  onOpen?: () => void

  // Dialog behavior
  modal?: boolean
  defaultOpen?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-sm ',
  md: 'max-w-md ',
  lg: 'max-w-lg ',
  xl: 'max-w-xl ',
  '2xl': 'max-w-2xl ',
  '3xl': 'max-w-3xl ',
  full: 'max-w-full ',
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  header,
  children,
  className,
  dialogContentClassName,
  contentClassName,
  maxWidth = 'md',
  onClose,
  onOpen,
  modal = true,
  defaultOpen,
}) => {
  const handleOpenChange = (open: boolean) => {
    if (open && onOpen) {
      onOpen()
    } else if (!open && onClose) {
      onClose()
    }
    onOpenChange?.(open)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      modal={modal}
      defaultOpen={defaultOpen}
    >
      <DialogContent
        className={cn(
          maxWidthClasses[maxWidth],
          'gap-0',
          dialogContentClassName
        )}
      >
        {/* Render header if header props are provided */}
        {header && (
          <DialogHeader className={cn('relative', header.headerClassName)}>
            <div
              className={cn(
                'flex items-center gap-2',
                header.icon && 'space-x-2'
              )}
            >
              {header.icon && header.icon}
              {header.title && (
                <DialogTitle
                  className={cn('text-lg font-semibold', header.titleClassName)}
                >
                  {header.title}
                </DialogTitle>
              )}
            </div>

            {header.description && (
              <DialogDescription
                className={cn(
                  'text-sm text-muted-foreground',
                  header.descriptionClassName
                )}
              >
                {header.description}
              </DialogDescription>
            )}

            {header.showCloseButton !== false && (
              <DialogClose
                className={cn(
                  'absolute right-4 top-4  ring-offset-background transition-opacity hover:opacity-100 hover:text-destructive focus:outline-none  disabled:pointer-events-none ',
                  header.closeButtonClassName
                )}
              >
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </DialogClose>
            )}
          </DialogHeader>
        )}

        {/* Content with default padding */}
        <div
          className={cn(
            'p-5', // Default padding
            contentClassName,
            className
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
