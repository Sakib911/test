'use client'

import { useMutation } from '@tanstack/react-query'
import {
  UploadCloud,
  X,
  Eye,
  Upload,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController } from 'react-hook-form'

import Loading from '../share/common/Loading'

import type { Control, FieldValues, Path } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { UPLOAD_DOCUMENT, UPLOAD_PDF_FILE } from '@/lib/Constants'
import { cn } from '@/lib/utils'
import api from '@/services/Api'

// File type detection utilities
const getFileTypeFromUrl = (url: string): 'image' | 'pdf' | 'other' => {
  const extension = url.toLowerCase().split('.').pop()?.split('?')[0]

  if (
    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(
      extension || ''
    )
  ) {
    return 'image'
  }
  if (extension === 'pdf') {
    return 'pdf'
  }
  return 'other'
}

const getFileIcon = (fileType: 'image' | 'pdf' | 'other') => {
  switch (fileType) {
    case 'pdf':
      return FileText
    case 'image':
      return Eye
    default:
      return FileText
  }
}

const _formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Generic upload service
const uploadFile = async (file: File, endpoint: string = UPLOAD_DOCUMENT) => {
  const formData = new FormData()
  const type = file.type.split('/')[1]
  if (type === 'pdf') {
    formData.append('pdf', file)
  } else {
    formData.append('image', file)
  }

  const response = await api.post({
    url: endpoint,
    body: formData,
  })

  // Handle different response structures
  const responseData = response as { data?: { data?: unknown } | unknown }
  if (
    responseData?.data &&
    typeof responseData.data === 'object' &&
    responseData.data !== null &&
    'data' in responseData.data
  ) {
    return (responseData.data as { data: unknown }).data
  } else if (responseData?.data) {
    return responseData.data
  }

  throw new Error('Failed to upload file')
}

interface EnhancedFileUploadFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  multiple?: boolean
  accept?: string
  uploadApi?: boolean
  uploadEndpoint?: string
  maxFileSize?: number // in MB
  useDefaultStyling?: boolean // Use simple default styling instead of dropzone
  showImageViewer?: boolean // Show image viewer modal (only for dropzone styling)
  showPreview?: boolean // Show preview modal (only for dropzone styling)
}

interface UploadedFile {
  url: string
  file?: File
  isUploaded: boolean
}

const EnhancedFileUploadField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  multiple = false,
  accept = 'image/*',
  uploadApi = true,
  uploadEndpoint = UPLOAD_DOCUMENT,
  maxFileSize = 5,
  useDefaultStyling = false,
  showImageViewer = true,
}: EnhancedFileUploadFieldProps<T>) => {
  const { toast } = useToast()
  const [viewerImage, setViewerImage] = useState<string | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })

  // Convert initial value to the correct format - FIX: Always return strings for form values
  React.useEffect(() => {
    if (value) {
      // Handle string URL - keep as string (no change needed)
      if (typeof value === 'string' && value.startsWith('http')) {
        // Value is already a string URL, no need to change it
        return
      }
      // Handle array of URLs (take first one if multiple is false)
      else if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === 'string' &&
        value[0].startsWith('http')
      ) {
        if (!multiple) {
          // For single file fields, take the first URL from array as string
          onChange(value[0])
        }
        // For multiple fields, keep as array of strings
        else {
          onChange(value)
        }
      }
    }
  }, [value, multiple, onChange])

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const type = file.type.split('/')[1]
      if (type === 'pdf') {
        return (await uploadFile(file, UPLOAD_PDF_FILE)) as string
      } else {
        return (await uploadFile(file, uploadEndpoint)) as string
      }
    },
    onSuccess: (uploadedUrl: string, file: File) => {
      // FIX: Always return string URLs, never objects
      if (multiple) {
        const currentFiles = Array.isArray(value) ? value : []
        onChange([...currentFiles, uploadedUrl]) // Return array of strings
      } else {
        onChange(uploadedUrl) // Return single string
      }

      toast('File uploaded successfully!', { type: 'success' })
    },
    onError: (error: Error) => {
      console.error('Upload error:', error)
      toast(error.message || 'Failed to upload file', { type: 'error' })
    },
  })

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      toast(`File size must be less than ${maxFileSize}MB`, { type: 'error' })
      return false
    }

    // Enhanced file type validation
    if (accept && accept !== '*') {
      const acceptedTypes = accept.split(',').map((type) => type.trim())
      const fileType = file.type.toLowerCase()
      const fileName = file.name.toLowerCase()

      let isValidType = false

      for (const acceptedType of acceptedTypes) {
        if (acceptedType === '*/*') {
          isValidType = true
          break
        }
        // Handle specific mime types
        if (acceptedType.includes('/') && fileType === acceptedType) {
          isValidType = true
          break
        }
        // Handle wildcard mime types like image/*
        if (
          acceptedType.includes('*') &&
          fileType.startsWith(acceptedType.replace('*', ''))
        ) {
          isValidType = true
          break
        }
        // Handle file extensions
        if (acceptedType.startsWith('.') && fileName.endsWith(acceptedType)) {
          isValidType = true
          break
        }
      }

      if (!isValidType) {
        const supportedTypes = acceptedTypes
          .map((type) => {
            if (type.includes('image/*')) return 'Images'
            if (type.includes('application/pdf') || type === '.pdf')
              return 'PDF'
            if (type.includes('.doc')) return 'Word documents'
            return type
          })
          .filter((type, index, arr) => arr.indexOf(type) === index)
          .join(', ')

        toast(`Invalid file type. Supported formats: ${supportedTypes}`, {
          type: 'error',
        })
        return false
      }
    }

    return true
  }

  // Handle file selection for default styling
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      for (const file of Array.from(files)) {
        if (!validateFile(file)) {
          continue
        }

        if (uploadApi) {
          // Upload to API
          uploadMutation.mutate(file)
        } else {
          // Store file locally (for manual upload) - FIX: Return string URL
          const localFileUrl = URL.createObjectURL(file)

          if (multiple) {
            const currentFiles = Array.isArray(value) ? value : []
            onChange([...currentFiles, localFileUrl]) // Return array of strings
          } else {
            onChange(localFileUrl) // Return single string
          }
        }
      }
    },
    [onChange, value, multiple, uploadApi, uploadMutation, validateFile]
  )

  // Handle dropzone for fancy styling
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        if (!validateFile(file)) {
          continue
        }

        if (uploadApi) {
          // Upload to API
          uploadMutation.mutate(file)
        } else {
          // Store file locally (for manual upload) - FIX: Return string URL
          const localFileUrl = URL.createObjectURL(file)

          if (multiple) {
            const currentFiles = Array.isArray(value) ? value : []
            onChange([...currentFiles, localFileUrl]) // Return array of strings
          } else {
            onChange(localFileUrl) // Return single string
          }
        }
      }
    },
    [
      onChange,
      value,
      multiple,
      uploadApi,
      maxFileSize,
      accept,
      uploadMutation,
      validateFile,
    ]
  )

  const handleRemove = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = [...value]
      // Revoke URL if it's a local object URL
      if (newFiles[index].startsWith('blob:')) {
        URL.revokeObjectURL(newFiles[index])
      }
      newFiles.splice(index, 1)
      onChange(newFiles)
    } else {
      // Revoke URL if it's a local object URL
      if (value && typeof value === 'string' && value.startsWith('blob:')) {
        URL.revokeObjectURL(value)
      }
      onChange(null)
    }
  }

  const handleView = (imageUrl: string) => {
    setViewerImage(imageUrl)
    setIsViewerOpen(true)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => void onDrop(acceptedFiles),
    multiple,
    accept: accept ? { [accept]: [] } : undefined,
    disabled: uploadMutation.isPending,
  })

  // FIX: Normalize value to array for display purposes only
  const displayFiles: string[] = multiple
    ? Array.isArray(value)
      ? value
      : value
      ? [value]
      : []
    : value
    ? [value]
    : []

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem
            className={
              useDefaultStyling
                ? 'flex h-[55px] flex-col items-start  bg-sand px-2'
                : ''
            }
          >
            <FormLabel>{label}</FormLabel>

            {useDefaultStyling ? (
              // Default/Simple Styling
              <FormControl>
                <div className="h-full w-full">
                  <div className="relative bg-transparent w-full">
                    <Input
                      type="file"
                      multiple={multiple}
                      accept={accept}
                      onChange={handleFileChange}
                      className={cn(
                        'file:mr-4  file:border w-full file:border-[#C5C5C5] file:text-sm file:font-medium file:p-1 file:rounded-none file:bg-transparent bg-transparent file:text-text-primary hover:file:bg-primary/90 file:cursor-pointer',
                        uploadMutation.isPending &&
                          'opacity-50 cursor-not-allowed'
                      )}
                      disabled={uploadMutation.isPending}
                    />
                    {uploadMutation.isPending && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Upload className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                    )}
                  </div>

                  {uploadMutation.isPending && (
                    <p className="text-sm text-primary">Uploading file...</p>
                  )}
                </div>
              </FormControl>
            ) : (
              // Dropzone/Fancy Styling
              <>
                <div
                  {...getRootProps()}
                  className={cn(
                    'flex cursor-pointer flex-col h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-3 px-4 text-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50',
                    isDragActive &&
                      'border-primary bg-primary/10 border-primary/60',
                    uploadMutation.isPending && 'opacity-50 cursor-not-allowed',
                    displayFiles.length > 0 && 'border-green-300 bg-green-50/30'
                  )}
                >
                  <FormControl>
                    <Input {...getInputProps()} />
                  </FormControl>
                  {uploadMutation.isPending ? (
                    <>
                      <Loading text="Uploading..." loaderClassName="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {!(displayFiles.length > 0) && (
                        <>
                          <UploadCloud className="mb-2 h-6 w-6 text-gray-400" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {isDragActive
                                ? 'Drop files here...'
                                : `Upload ${multiple ? 'files' : 'file'}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              Drag & drop or click to browse
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {displayFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-xs font-medium text-gray-600 mb-2">
                        Files ({displayFiles.length})
                      </h4>
                      <div className="space-y-1">
                        {displayFiles.map((fileUrl: string, index) => {
                          const fileName = fileUrl
                            ? fileUrl.split('/').pop()?.split('?')[0]
                            : 'File'
                          const fileType = getFileTypeFromUrl(fileUrl || '')
                          const IconComponent = getFileIcon(fileType)
                          const isUploaded = fileUrl.startsWith('http')

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200 hover:border-gray-300 transition-colors group"
                            >
                              {/* File Preview/Icon */}
                              <div className="flex-shrink-0">
                                {fileType === 'image' ? (
                                  <div className="relative">
                                    <Image
                                      width={32}
                                      height={32}
                                      src={fileUrl}
                                      alt={fileName || 'Image'}
                                      className="w-8 h-8 rounded object-cover border"
                                    />
                                    {/* Upload status badge for images */}
                                  </div>
                                ) : (
                                  <div
                                    className={cn(
                                      'w-8 h-8 rounded flex items-center justify-center relative',
                                      fileType === 'pdf'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-gray-100 text-gray-600'
                                    )}
                                  >
                                    <IconComponent className="w-4 h-4" />
                                    {/* Upload status badge for non-images */}
                                    <div
                                      className={cn(
                                        'absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs',
                                        isUploaded
                                          ? 'bg-green-500 text-white'
                                          : 'bg-yellow-500 text-white'
                                      )}
                                    >
                                      {isUploaded ? '✓' : '⏳'}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* File Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-medium text-gray-900 truncate max-w-52">
                                    {fileName}
                                  </p>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {fileType === 'pdf'
                                    ? 'PDF'
                                    : fileType === 'image'
                                    ? 'Image'
                                    : 'File'}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* View/Download button */}
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (fileType === 'pdf') {
                                      window.open(fileUrl, '_blank')
                                    } else if (
                                      showImageViewer &&
                                      fileType === 'image'
                                    ) {
                                      handleView(fileUrl)
                                    } else {
                                      window.open(fileUrl, '_blank')
                                    }
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-blue-100 hover:text-blue-600"
                                  title={
                                    fileType === 'pdf'
                                      ? 'Open PDF'
                                      : fileType === 'image'
                                      ? 'View Image'
                                      : 'Download'
                                  }
                                >
                                  {fileType === 'pdf' ? (
                                    <ExternalLink className="h-3 w-3" />
                                  ) : fileType === 'image' ? (
                                    <Eye className="h-3 w-3" />
                                  ) : (
                                    <Download className="h-3 w-3" />
                                  )}
                                </Button>

                                {/* Remove button */}
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove(index)
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                  title="Remove file"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default EnhancedFileUploadField
