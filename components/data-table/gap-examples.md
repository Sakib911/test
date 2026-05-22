# Table Gap and Spacing Examples

This document shows how to use the new gap and spacing props in the `ExpandableDataTable` component without changing existing table designs.

## How It Works

**Important**: Tables don't support CSS flexbox gaps, so we use a different approach:

- **Row Gaps**: `marginBottom` on table rows to create space between rows
- **Column Gaps**: `paddingLeft` and `paddingRight` on table cells to create space between columns
- **Cell Spacing**: Additional padding classes on table cells

## Basic Usage

### 1. Add Row Gaps Only

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  rowGap='gap-y-4' // Adds 16px gap between rows
  {...getTableStyles('investmentCalculation')}
/>
```

### 2. Add Column Gaps Only

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  columnGap='gap-x-6' // Adds 24px gap between columns
  {...getTableStyles('investmentCalculation')}
/>
```

### 3. Add Cell Spacing Only

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  cellSpacing='p-4' // Adds 16px padding inside cells
  {...getTableStyles('investmentCalculation')}
/>
```

## Combined Usage

### 4. Add Both Row and Column Gaps

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  rowGap='gap-y-4' // 16px between rows
  columnGap='gap-x-6' // 24px between columns
  {...getTableStyles('investmentCalculation')}
/>
```

### 5. Add All Spacing Controls

```tsx
<ExpandableDataTable
  columns={columns}
  data={data}
  rowGap='gap-y-6' // 24px between rows
  columnGap='gap-x-8' // 32px between columns
  cellSpacing='px-6 py-4' // 24px horizontal, 16px vertical padding
  {...getTableStyles('investmentCalculation')}
/>
```

## Available Gap Values

### Row Gaps (gap-y-\*)

- `gap-y-1` = 4px margin between rows
- `gap-y-2` = 8px margin between rows
- `gap-y-4` = 16px margin between rows
- `gap-y-6` = 24px margin between rows
- `gap-y-8` = 32px margin between rows

### Column Gaps (gap-x-\*)

- `gap-x-1` = 4px padding on left/right of cells
- `gap-x-2` = 8px padding on left/right of cells
- `gap-x-4` = 16px padding on left/right of cells
- `gap-x-6` = 24px padding on left/right of cells
- `gap-x-8` = 32px padding on left/right of cells

### Cell Spacing (padding)

- `p-2` = 8px all sides
- `p-4` = 16px all sides
- `p-6` = 24px all sides
- `px-4` = 16px horizontal only
- `py-2` = 8px vertical only
- `px-6 py-3` = 24px horizontal, 12px vertical

## Technical Details

**Why not CSS gaps?**

- Tables use `display: table` layout, not flexbox/grid
- CSS `gap` property only works with flexbox and grid layouts
- Our solution uses margins and padding which work with all layouts

**Implementation:**

- Row gaps: `style={{ marginBottom: '16px' }}` on `<tr>` elements
- Column gaps: `style={{ paddingLeft: '24px', paddingRight: '24px' }}` on `<td>` elements
- Cell spacing: Additional CSS classes for padding

## Important Notes

✅ **These props are ADDITIVE** - they add to existing styles without replacing them
✅ **Existing table designs remain unchanged** - your current styling is preserved
✅ **Perfect for fine-tuning** - adjust spacing without modifying the reusable component
✅ **No breaking changes** - all existing tables continue to work exactly as before
✅ **Works with all table layouts** - compatible with any existing table styling

## Real-World Example

```tsx
// Before: Basic table with existing design
<ExpandableDataTable
  columns={columns}
  data={data}
  {...getTableStyles('investmentCalculation')}
/>

// After: Same table with added spacing
<ExpandableDataTable
  columns={columns}
  data={data}
  rowGap='gap-y-4'      // Add space between rows
  columnGap='gap-x-6'    // Add space between columns
  cellSpacing='p-4'      // Add padding inside cells
  {...getTableStyles('investmentCalculation')}
/>
```

The table maintains its exact design while adding the spacing you need!
