import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const durationOptions = [
    { label: '1 Month', value: 1 },
    { label: '3 Months', value: 3 },
    { label: '6 Months', value: 6 },
    { label: '1 Year', value: 12 },
    { label: '2 Year', value: 24 },
    { label: '3 Year', value: 36 },
    { label: 'Unlimited', value: 'unlimited' },
]

export const investmentOptions = [
    { label: 'Festgeld', value: 'Festgeld' },
    { label: 'Tagesgeld', value: 'Tagesgeld' },
]

export const countryOption = [
    { label: 'DE - Germany', value: 'DE Germany' },
    { label: 'UK - United Kingdom', value: 'UK United Kingdom' },
    { label: 'BE - Belgium', value: 'BE Belgium' },
    { label: 'NL - Netherlands', value: 'NL Netherlands' },
    { label: 'FR - France', value: 'FR France' },
    { label: 'AT - Austria', value: 'AT Austria' },
    { label: 'CH - Switzerland', value: 'CH Switzerland' },
]

// utils/format.ts
export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    }).format(value)

export const mapGenderValue = (
    genderValue: string | undefined
): 'Mister' | 'Woman' | undefined => {
    if (!genderValue) return undefined

    // Handle old values that might exist in the database
    const lowerValue = genderValue.toLowerCase()
    if (lowerValue === 'mister' || lowerValue === 'mr.' || lowerValue === 'mr') {
        return 'Mister'
    }
    if (lowerValue === 'woman' || lowerValue === 'ms.' || lowerValue === 'ms' || lowerValue === 'mrs.' || lowerValue === 'mrs') {
        return 'Woman'
    }

    // If exact match, return as is
    if (genderValue === 'Mister' || genderValue === 'Woman') {
        return genderValue
    }

    return undefined
}

export const getUrlFromImage = (imagePathOrUrl: string) => {
    if (!imagePathOrUrl) return '/images/placeholder.png'

    // If it's already a full URL (starts with http/https), return as is
    if (imagePathOrUrl.startsWith('http')) {
        return imagePathOrUrl
    }

    // If it's a path that starts with '/', it's relative to the domain
    if (imagePathOrUrl.startsWith('/')) {
        return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}${imagePathOrUrl}`
    }

    // Otherwise, assume it's a filename and prepend the uploads path
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/uploads/${imagePathOrUrl}`
}

export const formatDate = (dateString: string | Date) => {
    if (!dateString) return 'N/A'

    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    } catch (error) {
        console.error('Error formatting date:', error)
        return 'Invalid Date'
    }
}

// site config utils
export const fontFamilyOptions = [
    { label: 'Proxima Nova', value: 'Proxima Nova' },
    { label: 'Inter', value: 'Inter' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Verdana', value: 'Verdana' },
]