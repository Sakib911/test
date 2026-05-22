export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'de'
export const defaultTimeZone = 'Europe/Berlin' // Global timezone configuration

export type LocaleResource = Record<
  Locale,
  () => Promise<Record<string, unknown>>
>

export function getLocaleResource(): LocaleResource {
  return {
    en: () => import(`../messages/en.json`).then((module) => module.default),
    de: () => import(`../messages/de.json`).then((module) => module.default),
  }
}
