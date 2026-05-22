/**
 * Utility functions for file handling
 */
// get file type from url
export const getFileTypeFromUrl = (
  url?: string
): 'pdf' | 'image' | 'doc' | 'N/A' => {
  if (!url) return 'N/A'

  const lowercaseUrl = url.toLowerCase()

  // Check for PDF
  if (lowercaseUrl.includes('.pdf') || lowercaseUrl.includes('pdf')) {
    return 'pdf'
  }

  // Check for Word documents
  if (
    lowercaseUrl.includes('.doc') ||
    lowercaseUrl.includes('.docx') ||
    lowercaseUrl.includes('word')
  ) {
    return 'doc'
  }

  // Check for common image formats
  if (
    lowercaseUrl.includes('.jpg') ||
    lowercaseUrl.includes('.jpeg') ||
    lowercaseUrl.includes('.png') ||
    lowercaseUrl.includes('.gif') ||
    lowercaseUrl.includes('.webp') ||
    lowercaseUrl.includes('image')
  ) {
    return 'image'
  }

  return 'N/A'
}
// get file type from mime type
export const getFileTypeFromMimeType = (
  mimeType: string
): 'pdf' | 'image' | 'doc' | 'unknown' => {
  if (!mimeType) return 'unknown'

  if (mimeType === 'application/pdf') {
    return 'pdf'
  }

  if (mimeType.startsWith('image/')) {
    return 'image'
  }

  // Word documents
  if (
    mimeType === 'application/msword' || // .doc
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
  ) {
    return 'doc'
  }

  return 'unknown'
}
