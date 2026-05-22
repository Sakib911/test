# Reusable Table System

This directory contains a flexible and reusable table system that allows you to easily customize table styles across different components.

## Components

### ExpandableDataTable

The main table component with customizable styling options.

### Table Style Presets

Pre-defined table styles that can be used consistently across the application.

## Available Style Presets

1. **default** - Standard table with borders
2. **investmentCalculation** - Only bottom borders, clean look
3. **clean** - No borders, minimal styling
4. **bordered** - Full borders around all cells (no padding for clean borders)
5. **minimal** - Subtle borders, professional look
6. **card** - Rounded corners with shadow
7. **fixedDeposit** - Professional banking look with primary header
8. **fixedDepositBordered** - Professional banking look with no padding for clean borders

## Usage

### Basic Usage

```tsx
import { getTableStyles } from '@/components/data-table/table-style-presets'
;<ExpandableDataTable
  columns={columns}
  data={data}
  {...getTableStyles('default')}
/>
```

### Custom Styling

```tsx
import { mergeTableStyles } from '@/components/data-table/table-style-presets'
;<ExpandableDataTable
  columns={columns}
  data={data}
  {...mergeTableStyles('default', {
    tableRowClassName: 'hover:bg-blue-50',
    tableCellClassName: 'py-3',
    tableCellPadding: 'p-0', // Remove all padding for clean borders
  })}
/>
```

### Custom Header Styling

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  headerClassName='text-white bg-primary font-bold'
  {...getTableStyles('card')}
/>
```

## Props

### ExpandableDataTable Props

- `columns` - Table column definitions
- `data` - Table data array
- `headerClassName` - Custom header styling
- `tableClassName` - Custom table container styling
- `tableHeaderClassName` - Custom table header styling
- `tableBodyClassName` - Custom table body styling
- `tableRowClassName` - Custom table row styling
- `tableCellClassName` - Custom table cell styling
- `tableHeadClassName` - Custom table head styling
- `tableCellPadding` - Custom cell padding (e.g., 'p-0', 'px-4', 'py-2')
- `tableHeadPadding` - Custom header padding (e.g., 'p-0', 'px-4', 'py-2')

## Creating New Style Presets

Add new presets to `table-style-presets.ts`:

```tsx
export const tableStylePresets = {
  // ... existing presets

  myCustomStyle: {
    tableClassName: 'custom-table-class',
    tableBodyClassName: 'custom-body-class',
    tableRowClassName: 'custom-row-class',
    tableCellClassName: 'custom-cell-class',
    tableHeadClassName: 'custom-head-class',
    tableCellPadding: 'p-0', // Control cell padding
    tableHeadPadding: 'px-4', // Control header padding
  },
}
```

## Padding Control

The table system now provides flexible padding control:

- **`tableCellPadding`** - Controls padding inside table cells
- **`tableHeadPadding`** - Controls padding inside table headers

### Common Padding Values:

- `p-0` - No padding (useful for clean borders)
- `px-4` - Horizontal padding only
- `py-2` - Vertical padding only
- `px-4 py-2` - Custom horizontal and vertical padding

### Example: Clean Borders

```tsx
// For tables with borders, use no padding
{...getTableStyles('fixedDepositBordered')}
// or
{...mergeTableStyles('default', { tableCellPadding: 'p-0' })}
```

## Examples

See `table-style-examples.tsx` for comprehensive examples of all available presets.

## Expandable Data Table

The `ExpandableDataTable` component supports the same styling options as the regular data table, plus additional features for expandable rows.

### Basic Usage with Styling

```tsx
import { ExpandableDataTable } from '@/components/data-table/expandable-data-table'
import { getTableStyles } from '@/components/data-table/table-style-presets'

// Use predefined expandable table styles
;<ExpandableDataTable
  columns={columns}
  data={data}
  tableStylePreset='expandable'
  renderExpandedContent={row => (
    <div className='p-4'>{/* Your expanded content here */}</div>
  )}
/>
```

### Available Expandable Table Styles

- **`expandable`** - Default expandable table with clean borders and hover effects
- **`expandableWithExpanded`** - Expandable table with special styling for expanded rows

### Custom Styling

You can still override any style property:

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  tableStylePreset='expandable'
  tableRowClassName='custom-row-class'
  tableCellClassName='custom-cell-class'
  renderExpandedContent={row => (
    <div className='p-4'>{/* Your expanded content here */}</div>
  )}
/>
```

### Expanded Row Styling

The expanded rows automatically use consistent styling that matches the table design:

- Subtle background color (`bg-gray-50`)
- Proper padding (`p-4`)
- Consistent borders and spacing

**Technical Implementation:**

- **Row Gaps**: Custom CSS classes like `table-row-with-gap` that force `margin-bottom` to work
- **Column Gaps**: Tailwind classes like `px-4`, `px-6` applied to `<td>` elements
- **Cell Spacing**: Additional Tailwind padding classes for internal cell spacing

### Row and Column Gap Control

New props allow you to add spacing between rows and columns without changing existing table designs:

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  // Control gaps between rows and columns
  rowGap='gap-y-4' // Adds 16px gap between rows
  columnGap='gap-x-6' // Adds 24px gap between columns
  cellSpacing='p-4' // Adds 16px padding inside cells
  renderExpandedContent={row => (
    <div className='p-4'>{/* Your expanded content here */}</div>
  )}
/>
```

**Available Gap Options:**

- **Row Gaps**: `gap-y-1`, `gap-y-2`, `gap-y-4`, `gap-y-6`, `gap-y-8`
- **Column Gaps**: `gap-x-1`, `gap-x-2`, `gap-x-4`, `gap-x-6`, `gap-x-8`
- **Cell Spacing**: `p-2`, `p-4`, `p-6`, `px-4 py-2`, `px-6 py-3`

**Important Notes:**

- These props are **additive** - they add to existing styles without replacing them
- Existing table designs remain unchanged
- Perfect for fine-tuning spacing without modifying the reusable component
- Works with all table layouts and existing styles
