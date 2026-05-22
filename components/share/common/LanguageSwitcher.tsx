import { Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { useLanguageSwitcher } from '@/hooks/use-language-switcher'

const LanguageSwitcher = () => {
  // Always call hooks at the top level
  const t = useTranslations()

  const { currentLocale, locales, switchLanguage } = useLanguageSwitcher()

  return (
    <div>
      {/* Language Switcher */}
      <div className="flex items-center gap-2 ml-5">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Select value={currentLocale} onValueChange={switchLanguage}>
          <SelectTrigger className="h-8 w-[90px] px-2 py-1 text-xs">
            <SelectValue placeholder={t(`common.language.${currentLocale}`)}>
              {t(`common.language.${currentLocale}`)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {locales.map((locale) => (
              <SelectItem key={locale} value={locale} className="text-xs">
                {t(`common.language.${locale}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default LanguageSwitcher
