/**
 * Centralized Color Management System
 * 
 * This file contains all colors used throughout the application.
 * Colors are organized by category for easy management and consistency.
 */

export const Colors = {
    // Primary Brand Colors
    primary: {
        DEFAULT: '#44ade2',
        rgb: '68 173 226',
        disabled: '#a9d6f0',
        foreground: '#ffffff',
        fade: '#e7f7ff',
    },

    // Secondary Colors
    secondary: {
        DEFAULT: '#0d2c40',
        alt: '#64748b', // Alternative secondary used in site config
        foreground: '#171717',
    },

    // Background Colors
    background: {
        DEFAULT: '#ffffff',
        light: '#f8faf9',
        card: '#ffffff',
        cardAlt: '#f8fafc', // Alternative card background
        sand: '#f4f5f7',
        sandTwo: '#e4e4e4',
        accent: '#f5f5f5',
        fade: '#EEF2FA',
    },

    // Text Colors
    text: {
        primary: '#000000',
        primaryAlt: '#0f172a', // Alternative primary text
        secondary: '#292B37',
        secondaryAlt: '#64748b', // Alternative secondary text
        muted: '#9aa0a9',
        gray: '#414141',
        primaryText: '#101828',
        light: '#9A9DA4',
    },

    // Border Colors
    border: {
        DEFAULT: '#d0d5dd',
        input: '#e5e5e5',
        sand: '#b7b8ba',
        light: '#e2e8f0',
    },

    // State Colors
    success: {
        DEFAULT: '#58b11a',
        alt: '#22c55e', // Alternative success color
        site: '#4B8E17', // Site config success
    },

    error: {
        DEFAULT: '#ef4444',
        alt: '#e53935', // Alternative error color
        destructive: '#e53935',
        site: '#D01515', // Site config error
        foreground: '#fafafa',
    },

    // Utility Colors
    deepBlue: '#01377f',
    slateDark: '#555557',
    ring: '#0a0a0a',
    popover: {
        DEFAULT: '#ffffff',
        foreground: '#0a0a0a',
    },

    // Chart Colors
    chart: {
        1: '#ec6a5e',
        2: '#2ca58d',
        3: '#264653',
        4: '#f4a261',
        5: '#f77f00',
    },

    // Color Picker Palette
    colorPicker: {
        // Grayscale
        grayscale: [
            '#000000',
            '#111827',
            '#374151',
            '#6b7280',
            '#9ca3af',
            '#d1d5db',
            '#e5e7eb',
            '#f3f4f6',
            '#f9fafb',
            '#ffffff',
        ],

        // Brand Colors
        brand: [
            '#44ade2', // Primary
            '#0d2c40', // Secondary
            '#58b11a', // Success
            '#01377f', // Deep Blue
        ],

        // Extended Palette
        extended: [
            '#ef4444', // Red
            '#f97316', // Orange
            '#f59e0b', // Amber
            '#eab308', // Yellow
            '#84cc16', // Lime
            '#22c55e', // Green
            '#10b981', // Emerald
            '#14b8a6', // Teal
            '#06b6d4', // Cyan
            '#0ea5e9', // Sky
            '#3b82f6', // Blue
            '#6366f1', // Indigo
            '#8b5cf6', // Violet
            '#a855f7', // Purple
            '#d946ef', // Fuchsia
            '#ec4899', // Pink
            '#f43f5e', // Rose
        ],

        // Dark Variants
        dark: [
            '#1e40af', // Blue Dark
            '#7c3aed', // Purple Dark
            '#be185d', // Pink Dark
            '#dc2626', // Red Dark
            '#ea580c', // Orange Dark
            '#d97706', // Amber Dark
        ],
    },

    // Site Config Default Colors (for fallbacks)
    siteConfig: {
        theme: {
            primaryColor: '#44ade2',
            secondaryColor: '#64748b',
            backgroundColor: '#ffffff',
            cardColor: '#f8fafc',
            textPrimary: '#0f172a',
            textSecondary: '#64748b',
            borderColor: '#e2e8f0',
            successColor: '#22c55e',
            errorColor: '#ef4444',
            borderRadius: '0.5rem',
        },
        context: {
            primaryColor: '#44ade2',
            secondaryColor: '#0877C7',
            backgroundColor: '#ffffff',
            cardColor: '#f8fafc',
            textPrimary: '#000000',
            textSecondary: '#292B37',
            borderColor: '#D0D5DD',
            successColor: '#4B8E17',
            errorColor: '#D01515',
        },
    },

    // Message/Placeholder Colors
    placeholders: {
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        themeColor: '#000000',
        backgroundColor: '#ffffff',
        cardColor: '#ffffff',
        textPrimary: '#000000',
        textSecondary: '#666666',
        borderColor: '#d0d5dd',
        successColor: '#22c55e',
        errorColor: '#ef4444',
    },

    // Special Colors
    special: {
        danger: '255 0 0', // RGB format for Tailwind
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',
        current: 'currentColor',
        inherit: 'inherit',
    },
} as const

// Export individual color categories for easier imports
export const {
    primary,
    secondary,
    background,
    text,
    border,
    success,
    error,
    deepBlue,
    slateDark,
    ring,
    popover,
    chart,
    colorPicker,
    siteConfig,
    placeholders,
    special,
} = Colors

// Helper function to get CSS custom property value
export const getCSSVar = (property: string): string => `var(--${property})`

// Helper function to create CSS custom properties object
export const createCSSVars = (colors: Record<string, string>): Record<string, string> => {
    const cssVars: Record<string, string> = {}
    Object.entries(colors).forEach(([key, value]) => {
        cssVars[`--${key}`] = value
    })
    return cssVars
}

// Type for color values
export type ColorValue = string
export type ColorObject = Record<string, ColorValue | Record<string, ColorValue>>

export default Colors
