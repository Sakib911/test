# ActionFilters Component

A comprehensive, reusable filter component for data tables and lists with support for multiple filter types, query string persistence, and controlled/uncontrolled modes.

## Features

- **Multiple Filter Types**: Search, select, date, date-range, number-range, boolean, and currency filters
- **Query String Support**: Automatically save and restore filters from URL parameters
- **Controlled/Uncontrolled Modes**: Use as controlled component or let it manage its own state
- **Real-time Updates**: Filters update immediately as users interact with them
- **Active Filter Count**: Shows a badge with the number of active filters
- **Reset Functionality**: Clear individual filters or all filters at once
- **Collapsible**: Option to hide/show the filter panel
- **TypeScript Support**: Fully typed with comprehensive interfaces
- **Responsive Design**: Works well on desktop and mobile devices

## Quick Start

### Uncontrolled Mode with Query String

```tsx
import ActionFilters, { FilterConfig, FilterValues } from './action-filters'

const MyComponent = () => {
  const [filters, setFilters] = useState<FilterValues>({})

  const filterConfigs: FilterConfig[] = [
    {
      key: 'search',
      type: 'search',
      label: 'Search',
      placeholder: 'Search items...',
    },
    {
      key: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ]

  return (
    <ActionFilters
      filters={filterConfigs}
      onFiltersChange={setFilters}
      useQueryString={true}
    />
  )
}
```

### Controlled Mode

```tsx
const MyControlledComponent = () => {
  const [filters, setFilters] = useState<FilterValues>({})

  return (
    <ActionFilters
      filters={filterConfigs}
      value={filters}
      onFiltersChange={setFilters}
    />
  )
}
```

## Filter Types

### Search Filter

```tsx
{
  key: 'search',
  type: 'search',
  label: 'Search',
  placeholder: 'Search by name, email, or ID...',
}
```

### Select Filter

```tsx
{
  key: 'status',
  type: 'select',
  label: 'Status',
  placeholder: 'Select status',
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ],
}
```

### Date Filter

```tsx
{
  key: 'createdAt',
  type: 'date',
  label: 'Created Date',
  placeholder: 'Select date',
}
```

### Date Range Filter

```tsx
{
  key: 'dateRange',
  type: 'date-range',
  label: 'Date Range',
  placeholder: 'Select date range',
}
```

### Number Range Filter

```tsx
{
  key: 'price',
  type: 'number-range',
  label: 'Price',
  min: 0,
  max: 10000,
}
```

### Boolean Filter

```tsx
{
  key: 'isActive',
  type: 'boolean',
  label: 'Active Status',
  placeholder: 'Filter by status',
}
```

### Currency Filter

```tsx
{
  key: 'budget',
  type: 'currency',
  label: 'Budget',
  placeholder: 'Enter budget amount',
  currency: 'USD',
  currencySymbol: '$',
  locale: 'en-US',
  allowNegative: false,
}
```

## Props

| Prop              | Type                              | Required | Default | Description                              |
| ----------------- | --------------------------------- | -------- | ------- | ---------------------------------------- |
| `filters`         | `FilterConfig[]`                  | ✅       | -       | Array of filter configurations           |
| `onFiltersChange` | `(filters: FilterValues) => void` | ✅       | -       | Callback when filter values change       |
| `onReset`         | `() => void`                      | ❌       | -       | Optional callback when filters are reset |
| `className`       | `string`                          | ❌       | -       | Additional CSS classes                   |
| `showFilterCount` | `boolean`                         | ❌       | `true`  | Show active filter count badge           |
| `collapsible`     | `boolean`                         | ❌       | `false` | Allow hiding/showing filters             |

## Types

### FilterConfig

```tsx
interface FilterConfig {
  key: string // Unique identifier for the filter
  type: FilterType // Type of filter (see FilterType below)
  label: string // Display label for the filter
  placeholder?: string // Placeholder text
  options?: SelectOption[] // Options for select filters
  min?: number // Minimum value for number-range filters
  max?: number // Maximum value for number-range filters
  defaultValue?: any // Default value for the filter
}
```

### FilterType

```tsx
type FilterType =
  | 'search'
  | 'select'
  | 'date'
  | 'date-range'
  | 'number-range'
  | 'boolean'
```

### FilterValues

```tsx
interface FilterValues {
  [key: string]: any
}
```

## Integration with Data Tables

Use with existing data table components:

```tsx
const DataTableWithFilters = () => {
  const [filters, setFilters] = useState<FilterValues>({})
  const [data, setData] = useState(originalData)

  // Apply filters to data
  useEffect(() => {
    let filteredData = originalData

    // Apply search filter
    if (filters.search) {
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Apply status filter
    if (filters.status) {
      filteredData = filteredData.filter(item => item.status === filters.status)
    }

    // Apply date range filter
    if (filters.dateRange?.from && filters.dateRange?.to) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.createdAt)
        return (
          itemDate >= filters.dateRange.from && itemDate <= filters.dateRange.to
        )
      })
    }

    setData(filteredData)
  }, [filters, originalData])

  return (
    <div>
      <ActionFilters
        filters={filterConfigs}
        onFiltersChange={setFilters}
        className='mb-6'
      />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
```

## Styling

The component uses Tailwind CSS classes and follows the existing design system. All filter inputs have a consistent height of `h-10` and proper spacing.

## Accessibility

- All filter inputs have proper labels
- Keyboard navigation is supported
- Screen reader friendly
- Focus management for popover elements

## Examples

See `action-filters-example.tsx` for a complete working example with all filter types.
