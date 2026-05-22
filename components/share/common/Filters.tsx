'use client'
import { useState } from 'react'

import type { FilterValues } from '@/components/data-table/action-filters'

import ActionFilters from '@/components/data-table/action-filters'
import useActionFilters from '@/hooks/useActionFilters'

const Filters = ({
  onFilterChange,
  admin,
}: {
  onFilterChange: (val: FilterValues) => void
  admin: boolean
}) => {
  const [controlledFilters, setControlledFilters] = useState<FilterValues>({})
  const filterConfigs = useActionFilters()

  return (
    <div className="w-full shadow-sm bg-white p-4">
      <ActionFilters
        filters={filterConfigs}
        value={controlledFilters}
        onFiltersChange={(val) => {
          if (val) {
            setControlledFilters(val)
            onFilterChange?.(val)
          }
        }}
        onReset={() => setControlledFilters({})}
        collapsible={false}
        admin={{ isAdmin: admin, setModalOpen: () => {} }}
      />
    </div>
  )
}

export default Filters
