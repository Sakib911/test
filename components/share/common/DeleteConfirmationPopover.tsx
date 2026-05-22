import { Trash2, AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DeleteConfirmationPopoverProps {
  onConfirm: () => void
  triggerButton?: React.ReactNode
  title?: string
  description?: string
  isLoading?: boolean
  disabled?: boolean
}

const DeleteConfirmationPopover = ({
  onConfirm,
  triggerButton,
  title,
  description,
  isLoading = false,
  disabled = false,
}: DeleteConfirmationPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('dashboard')

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const defaultTrigger = (
    <Button
      variant='outline'
      size='sm'
      className='rounded-none border-red-500 bg-transparent px-2 py-1 text-xs text-red-500 hover:bg-red-500 hover:text-white sm:px-3 sm:py-2 sm:text-sm min-w-[70px] sm:min-w-[90px] whitespace-nowrap'
      disabled={disabled}
    >
      <Trash2 className='h-3 w-3 sm:h-4 sm:w-4 mr-1' />
      <span className='hidden sm:inline'>
        {t('actions.delete') || 'Delete'}
      </span>
      <span className='sm:hidden'>Del</span>
    </Button>
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{triggerButton || defaultTrigger}</PopoverTrigger>
      <PopoverContent className='w-80 p-4' align='end'>
        <div className='flex items-start space-x-3'>
          <div className='flex-shrink-0'>
            <AlertTriangle className='h-5 w-5 text-red-500' />
          </div>
          <div className='flex-1 space-y-3'>
            <div>
              <h3 className='text-sm font-medium text-gray-900'>
                {title || t('confirmDelete.title') || 'Confirm Deletion'}
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                {description ||
                  t('confirmDelete.description') ||
                  'Are you sure you want to delete this item? This action cannot be undone.'}
              </p>
            </div>
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleCancel}
                disabled={isLoading}
                className='text-xs sm:text-sm'
              >
                {t('common.cancel') || 'Cancel'}
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={handleConfirm}
                disabled={isLoading}
                className='text-xs sm:text-sm'
              >
                {isLoading ? (
                  <>
                    <div className='h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent mr-2' />
                    {t('common.deleting') || 'Deleting...'}
                  </>
                ) : (
                  t('actions.delete') || 'Delete'
                )}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteConfirmationPopover
