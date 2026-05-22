/**
 * Download utility for handling file downloads
 */

export interface DownloadOptions {
  filename?: string
}

/**
 * Download a file from URL
 * @param fileUrl - The URL of the file to download
 * @param options - Download options including custom filename
 */
export const downloadFile = async (
  fileUrl: string,
  options: DownloadOptions = {}
): Promise<void> => {
  if (!fileUrl) return

  const filename = options.filename || fileUrl.split('/').pop() || 'download'

  try {
    const response = await fetch(fileUrl)
    if (!response.ok) throw new Error('Failed to fetch file')

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    window.open(fileUrl, '_blank')
  }
}
