'use client'

import { useSiteTheme, useSiteTypography } from '@/contexts/site-config-context'

/**
 * Simplified hook to get site configuration styles
 * Since styles are now applied server-side, this hook only provides
 * values for components that need inline styles or dynamic styling
 */
export const useSiteConfigStyles = () => {
    const theme = useSiteTheme()
    const typography = useSiteTypography()

    return {
        // CSS variables object for inline styles when needed
        cssVariables: {
            '--site-primary': theme.primaryColor,
            '--site-secondary': theme.secondaryColor,
            '--site-background': theme.backgroundColor,
            '--site-card': theme.cardColor,
            '--site-text-primary': theme.textPrimary,
            '--site-text-secondary': theme.textSecondary,
            '--site-border': theme.borderColor,
            '--site-success': theme.successColor,
            '--site-error': theme.errorColor,
            '--site-border-radius': theme.borderRadius,
            '--site-font-family': typography.fontFamily,
        } as React.CSSProperties,
        theme,
        typography,
    }
}

/**
 * Hook to get inline styles for components that need dynamic theming
 * Uses existing design system classes where possible
 */
export const useDynamicStyles = () => {
    const theme = useSiteTheme()

    return {
        // Primary button using site config primary color
        primaryButton: {
            backgroundColor: theme.primaryColor,
            borderColor: theme.primaryColor,
            color: '#ffffff',
        },
        // Secondary button
        secondaryButton: {
            backgroundColor: theme.secondaryColor,
            borderColor: theme.secondaryColor,
            color: '#ffffff',
        },
        // Success button
        successButton: {
            backgroundColor: theme.successColor,
            borderColor: theme.successColor,
            color: '#ffffff',
        },
        // Card styling
        card: {
            backgroundColor: theme.cardColor,
            borderColor: theme.borderColor,
            borderRadius: theme.borderRadius,
        },
        // Text styles
        primaryText: {
            color: theme.textPrimary,
        },
        secondaryText: {
            color: theme.textSecondary,
        },
        successText: {
            color: theme.successColor,
        },
        errorText: {
            color: theme.errorColor,
        },
        // Background styles
        primaryBackground: {
            backgroundColor: theme.primaryColor,
            color: '#ffffff',
        },
        cardBackground: {
            backgroundColor: theme.cardColor,
        },
    }
}

/**
 * Hook to get Tailwind-compatible class names based on site config
 * This integrates with your existing Tailwind setup
 */
export const useSiteConfigClasses = () => {
    return {
        // Use existing Tailwind classes that will be updated by CSS variables
        primaryButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondaryButton: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        successButton: 'bg-success text-white hover:bg-success/90',
        destructiveButton: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',

        // Card styles
        card: 'bg-card text-card-foreground border border-border rounded-lg',

        // Text styles
        primaryText: 'text-foreground',
        secondaryText: 'text-muted-foreground',
        mutedText: 'text-muted-foreground',

        // Background styles
        primaryBg: 'bg-primary',
        secondaryBg: 'bg-secondary',
        cardBg: 'bg-card',
        backgroundBg: 'bg-background',

        // Border styles
        border: 'border-border',
        rounded: 'rounded-lg', // Uses --radius from CSS
    }
}
