// Table Style Presets for consistent table styling across the application
export const tableStylePresets = {
    // Default table style (existing behavior)
    default: {
        tableBodyClassName: 'border',
        tableRowClassName: '',
        tableCellClassName: '',
        tableHeadClassName: '',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
    },

    // Investment calculation table style (only bottom borders)
    investmentCalculation: {
        tableBodyClassName: 'border-b-0',
        tableRowClassName: 'border-b-2 border-border',
        tableCellClassName: 'border-0 bg-sand ',
        tableHeadClassName: 'border-t-4 border-b-2 border-border border-t-primary',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
    },

    // Clean table style (no borders)
    clean: {
        tableBodyClassName: 'border-0',
        tableRowClassName: 'border-0',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'border-0',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
    },

    // Bordered table style (all borders)
    bordered: {
        tableBodyClassName: 'border border-gray-200',
        tableRowClassName: 'border-b border-gray-200',
        tableCellClassName: 'border-r border-gray-200 last:border-r-0',
        tableHeadClassName: 'border-b-2 border-gray-300',
        tableCellPadding: 'p-0',
        tableHeadPadding: 'p-4',
    },

    // Minimal table style (subtle borders)
    minimal: {
        tableBodyClassName: 'border-0',
        tableRowClassName: 'border-b border-gray-100',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'border-b border-gray-200',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
    },

    // Card table style (rounded corners with shadow)
    card: {
        tableClassName: 'rounded-lg shadow-sm border border-gray-200',
        tableBodyClassName: 'border-0',
        tableRowClassName: 'border-b border-gray-100 last:border-b-0',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'border-b border-gray-200 bg-gray-50',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
    },

    // Fixed deposit table style (professional banking look)
    fixedDeposit: {
        tableClassName: 'rounded-lg shadow-md border border-gray-300',
        tableBodyClassName: 'border-0',
        tableRowClassName: '',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'bg-primary text-white',
        tableCellPadding: 'px-0',
        tableHeadPadding: 'px-4',
    },

    // Fixed deposit with borders style (no padding for clean borders)
    fixedDepositBordered: {
        tableClassName: 'rounded-lg  border border-gray-300',
        tableBodyClassName: 'border-0 bg-sand',
        tableRowClassName: 'border-b border-border',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'bg-primary text-white',
        tableCellPadding: 'p-0',
        tableHeadPadding: 'p-0',
    },

    // Fixed deposit with no padding style (completely clean borders)
    fixedDepositNoPadding: {
        tableClassName: '',
        tableBodyClassName: ' bg-sand',
        tableRowClassName: 'border-b border-border',
        tableCellClassName: '',
        tableHeadClassName: 'bg-primary text-white',
        tableCellPadding: 'p-0',
        tableHeadPadding: 'p-0',
    },

    // Expandable table style (consistent with table design)
    expandable: {
        tableClassName: 'rounded-lg shadow-sm border border-gray-200',
        tableBodyClassName: 'border-0',
        tableRowClassName:
            'border-b border-gray-100 hover:bg-muted/50 transition-colors',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'border-b-2 border-gray-200 bg-gray-50',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
    },

    // Expandable table with expanded row styling
    expandableWithExpanded: {
        tableClassName: 'rounded-lg shadow-sm border border-gray-200',
        tableBodyClassName: 'border-0',
        tableRowClassName:
            'border-b border-gray-100 hover:bg-muted/50 transition-colors',
        tableCellClassName: 'border-0',
        tableHeadClassName: 'border-b-2 border-gray-200 bg-gray-50',
        tableCellPadding: 'px-4',
        tableHeadPadding: 'px-4',
        // Special styling for expanded rows
        expandedRowClassName: 'border-b-0 bg-gray-50',
        expandedCellClassName: 'border-0 bg-gray-50 ',
    },
}

// Type for table style preset names
export type TableStylePreset = keyof typeof tableStylePresets

// Helper function to get table styles
export const getTableStyles = (preset: TableStylePreset) => {
    return tableStylePresets[preset]
}

// Helper function to merge custom styles with preset styles
export const mergeTableStyles = (
    preset: TableStylePreset,
    customStyles: Partial<(typeof tableStylePresets)[TableStylePreset]> = {}
) => {
    return {
        ...tableStylePresets[preset],
        ...customStyles,
    }
}
