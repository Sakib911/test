import { useTranslations } from 'next-intl'

import type { FilterConfig } from '@/components/data-table/action-filters'

import { durationOptions, investmentOptions } from '@/lib/utils'

const useActionFilters = () => {
  const t = useTranslations('dashboard')
  const filterConfigs: FilterConfig[] = [
    {
      key: 'searchTerm',
      type: 'currency',
      label: t('columns.investmentAmount'),
      min: 0,
      className: 'col-span-3',
    },
    {
      key: 'investmentPeriod',
      type: 'select',
      label: t('columns.duration'),
      placeholder: t('columns.selectduration'),
      options: durationOptions.map(opt => ({
        label: opt.label,
        value: String(opt.value),
      })),
      className: 'col-span-3',
    },
    {
      key: 'investmentType',
      type: 'select',
      label: t('columns.investmentType'),
      placeholder: t('columns.selecttype'),
      options: investmentOptions,
      className: 'col-span-3',
    },
  ]
  return filterConfigs
}
export default useActionFilters
