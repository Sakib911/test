import { z } from 'zod'

// Color validation helper
const colorValidator = z
    .string()
    .optional()
    .refine((val) => !val || val === '' || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val), {
        message: 'Invalid color format (use #RGB or #RRGGBB)'
    })

// URL validation helper  
const urlValidator = z
    .string()
    .optional()
    .refine((val) => !val || val === '' || z.string().url().safeParse(val).success, {
        message: 'Invalid URL format'
    })

// CSS unit validation helper
const cssUnitValidator = z
    .string()
    .optional()
    .refine((val) => !val || val === '' || /^\d+(\.\d+)?(px|rem|em)$/.test(val), {
        message: 'Invalid CSS unit (use px, rem, or em)'
    })

// Email validation
const emailValidator = z
    .string()
    .optional()
    .refine((val) => !val || val === '' || z.string().email().safeParse(val).success, {
        message: 'Invalid email format'
    })

export const siteConfigSchema = z.object({
    // Basic Information
    siteName: z.string().max(100).optional(),
    logoUrl: urlValidator,
    faviconUrl: urlValidator,
    defaultLanguage: z.enum(['en', 'de', 'fr', 'es']).optional(),

    // SEO & Metadata
    seo: z
        .object({
            metaTitle: z.string().max(60, 'Meta title must be 60 characters or less').optional(),
            metaDescription: z.string().max(160, 'Meta description must be 160 characters or less').optional(),
        })
        .optional(),

    // Contact Information
    contact: z
        .object({
            companyName: z.string().max(100, 'Company name must be 100 characters or less').optional(),
            email: emailValidator,
            phone: z.string().max(20, 'Phone must be 20 characters or less').optional(),
            address: z.string().max(500, 'Address must be 500 characters or less').optional(),
        })
        .optional(),

    // Theme & Colors
    theme: z
        .object({
            primaryColor: colorValidator,
            secondaryColor: colorValidator,
            backgroundColor: colorValidator,
            cardColor: colorValidator,
            textPrimary: colorValidator,
            textSecondary: colorValidator,
            borderColor: colorValidator,
            successColor: colorValidator,
            errorColor: colorValidator,
            borderRadius: cssUnitValidator,
        })
        .optional(),

    // Typography
    typography: z
        .object({
            fontFamily: z.string().max(50, 'Font family must be 50 characters or less').optional(),
        })
        .optional(),

    // Footer Information
    footer: z
        .object({
            copyrightText: z.string().max(200, 'Copyright text must be 200 characters or less').optional(),

        })
        .optional(),

    // Branding Assets
    assets: z
        .object({
            appleTouchIcon: urlValidator,
            manifestIcon: urlValidator,
        })
        .optional(),
})

export type SiteConfigFormData = z.infer<typeof siteConfigSchema>
