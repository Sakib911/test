import { PROJECT_NAME } from './Constants'

export interface RouteMetadata {
    title: string
    description: string
    keywords?: string[]
    openGraph?: {
        title?: string
        description?: string
        type?: string
        image?: string
    }
}

export const routeMetadataMap: Record<string, RouteMetadata> = {
    // Auth routes
    '/auth/login': {
        title: `Sign In - ${PROJECT_NAME}`,
        description:
            `Sign in to your ${PROJECT_NAME} account to access the management system.`,
        keywords: ['login', 'sign in', 'admin', 'dashboard', 'authentication'],
        openGraph: {
            title: `Sign In - ${PROJECT_NAME}`,
            description: `Access your ${PROJECT_NAME} with secure authentication.`,
            type: 'website',
        },
    },
    '/auth/register': {
        title: `Register - ${PROJECT_NAME}`,
        description:
            `Create a new ${PROJECT_NAME} account to get started with the management system.`,
        keywords: ['register', 'sign up', 'create account', 'admin', 'dashboard'],
        openGraph: {
            title: `Create Account - ${PROJECT_NAME}`,
            description: `Join the ${PROJECT_NAME} with a new account.`,
            type: 'website',
        },
    },
    '/reset-password': {
        title: `Change Password - ${PROJECT_NAME}`,
        description:
            `Change your password to access the management system.`,
        keywords: ['change password', 'admin', 'dashboard'],
        openGraph: {
            title: `Change Password - ${PROJECT_NAME}`,
            description: `Change your password to access the management system.`,
            type: 'website',
        },
    },
    '/otp-verify': {
        title: `OTP Verify - ${PROJECT_NAME}`,
        description:
            `Verify your OTP to access the management system.`,
        keywords: ['otp verify', 'verify otp', 'admin', 'dashboard'],
        openGraph: {
            title: `OTP Verify - ${PROJECT_NAME}`,
            description: `Verify your OTP to access the management system.`,
            type: 'website',
        },
    },
    '/forgot-password': {
        title: `Forgot Password - ${PROJECT_NAME}`,
        description:
            `Forgot your password? Reset it here.`,
        keywords: ['forgot password', 'reset password', 'admin', 'dashboard'],
        openGraph: {
            title: `Forgot Password - ${PROJECT_NAME}`,
            description: `Forgot your password? Reset it here.`,
            type: 'website',
        },
    },
    '/anfragen': {
        title: `Anfragen - ${PROJECT_NAME}`,
        description:
            `Anfragen to access the management system.`,
        keywords: ['anfragen', 'admin', 'dashboard'],
        openGraph: {
            title: `Anfragen - ${PROJECT_NAME}`,
            description: `Anfragen to access the management system.`,
            type: 'website',
        },
    },
    '/portfolio': {
        title: `Portfolio - ${PROJECT_NAME}`,
        description:
            `Portfolio to access the management system.`,
        keywords: ['portfolio', 'admin', 'dashboard'],
        openGraph: {
            title: `Portfolio - ${PROJECT_NAME}`,
            description: `Portfolio to access the management system.`,
            type: 'website',
        },
    },
    '/profile': {
        title: `Profile - ${PROJECT_NAME}`,
        description:
            `Profile to access the management system.`,
        keywords: ['profile', 'admin', 'dashboard'],
        openGraph: {
            title: `Profile - ${PROJECT_NAME}`,
            description: `Profile to access the management system.`,
            type: 'website',
        },
    },
    '/security': {
        title: `Security - ${PROJECT_NAME}`,
        description:
            `Security to access the management system.`,
        keywords: ['security', 'admin', 'dashboard'],
        openGraph: {
            title: `Security - ${PROJECT_NAME}`,
            description: `Security to access the management system.`,
            type: 'website',
        },
    },
    '/bank': {
        title: `Bank - ${PROJECT_NAME}`,
        description:
            `Bank to access the management system.`,
        keywords: ['bank', 'admin', 'dashboard'],
        openGraph: {
            title: `Bank - ${PROJECT_NAME}`,
            description: `Bank to access the management system.`,
            type: 'website',
        },
    },
    // Dashboard routes
    '/dashboard': {
        title: `Dashboard - ${PROJECT_NAME}`,
        description:
            `Main dashboard for managing your ${PROJECT_NAME} panel and viewing key metrics.`,
        keywords: ['dashboard', 'admin', 'panel', 'overview', 'metrics'],
        openGraph: {
            title: `Dashboard - ${PROJECT_NAME}`,
            description: `Comprehensive overview of your ${PROJECT_NAME} panel.`,
            type: 'website',
        },
    },
    '/dashboard/settings': {
        title: `Settings - ${PROJECT_NAME}`,
        description: `Configure your ${PROJECT_NAME} settings and preferences.`,
        keywords: [
            'settings',
            'configuration',
            'admin',
            'dashboard',
            'preferences',
        ],
        openGraph: {
            title: `Settings - ${PROJECT_NAME}`,
            description: `Customize your ${PROJECT_NAME} experience.`,
            type: 'website',
        },
    },
    '/dashboard/users': {
        title: `User Management - ${PROJECT_NAME}`,
        description:
            `Manage users, roles, and permissions in your ${PROJECT_NAME}.`,
        keywords: ['users', 'user management', 'roles', 'permissions', 'admin'],
        openGraph: {
            title: `User Management - ${PROJECT_NAME}`,
            description: `Comprehensive user management system.`,
            type: 'website',
        },
    },

    // Default metadata
    default: {
        title: `${PROJECT_NAME}`,
        description: `Professional ${PROJECT_NAME} and management system`,
        keywords: ['admin', 'dashboard', 'management', 'system'],
        openGraph: {
            title: `${PROJECT_NAME}`,
            description: `Professional ${PROJECT_NAME} and management system`,
            type: 'website',
        },
    },
}

/**
 * Get metadata for a specific route
 * @param pathname - The current route pathname
 * @returns RouteMetadata object for the route
 */
export function getRouteMetadata(pathname: string): RouteMetadata {
    // Remove trailing slash for consistent matching
    const cleanPath = pathname.replace(/\/$/, '')

    // Try to find exact match first
    if (routeMetadataMap[cleanPath]) {
        return routeMetadataMap[cleanPath]
    }

    // Try to find partial matches for nested routes
    const matchingRoute = Object.keys(routeMetadataMap).find(route => {
        if (route === 'default') return false
        return cleanPath.startsWith(route)
    })

    if (matchingRoute) {
        return routeMetadataMap[matchingRoute]
    }

    // Return default metadata if no match found
    return routeMetadataMap.default
}

/**
 * Generate dynamic metadata object for Next.js
 * @param pathname - The current route pathname
 * @returns Metadata object compatible with Next.js
 */
export function generateMetadata(pathname: string) {
    const metadata = getRouteMetadata(pathname)

    return {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords?.join(', '),
        openGraph: metadata.openGraph,
        robots: {
            index: true,
            follow: true,
        },
        viewport: 'width=device-width, initial-scale=1',
        themeColor: '#000000',
    }
}
