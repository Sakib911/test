'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  getExpandedRowModel,
  type ExpandedState,
} from '@tanstack/react-table'
import { ChevronDown, Search } from 'lucide-react'
import { Fragment, useRef, useState } from 'react'

import DataTableSkeleton from './data-table-skeleton'

import type React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

export interface InvestmentData {
  id: string
  zinssatz: string
  investitionszeitraum: string
  bank: string
  bankLogo?: string
  anlagesumme: string
  zinsausschuttung: string
  details: {
    angebotsdetails: {
      zinssatzEffektiv: string
      zinssatzNominal: string
      zinssatzins: string
      laufzeit: string
      verfugbarkeit: string
      zinsgutschrift: string
      zinsauszahlung: string
      zinsanderungen: string
    }
    bank: {
      name: string
      logo?: string
      additionalInfo?: string
    }
    einlagensicherung: {
      sicherungssumme: string
      wahrung: string
      details: string
    }
  }
}

interface ExpandableDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  userOffer?: boolean
  searchKey?: string
  searchPlaceholder?: string
  headerClassName?: string
  headerColumnClassName?: string
  renderExpandedContent?: (row: TData) => React.ReactNode
  actionBar?: boolean
  loading?: boolean
  // Infinite load more controls
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  enableInfiniteScroll?: boolean
  // New props for table styling customization
  tableClassName?: string
  tableHeaderClassName?: string
  tableBodyClassName?: string
  tableRowClassName?: string
  tableCellClassName?: string
  tableHeadClassName?: string
  // New props for padding control
  tableCellPadding?: string
  tableHeadPadding?: string
  // New gap and spacing props with defaults
  rowGap?: string
  columnGap?: string
  cellSpacing?: string
  loadMoreButton?: boolean
}

const ExpandableDataTable = <TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  headerClassName,
  headerColumnClassName = 'h-[40px]',
  renderExpandedContent,
  actionBar = false,
  loading = false,
  userOffer = false,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  enableInfiniteScroll = false,
  // New props with defaults
  tableClassName,
  tableHeaderClassName,
  tableBodyClassName,
  tableRowClassName,
  tableCellClassName,
  tableHeadClassName,
  // New padding props with defaults
  // tableCellPadding = 'p-0',
  tableHeadPadding = 'p-0',
  // New gap and spacing props with defaults
  rowGap,
  columnGap,
  cellSpacing,
  loadMoreButton = false,
}: ExpandableDataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // Helper functions to convert gap values to working CSS classes
  const getRowGapClass = (gap: string | undefined) => {
    if (!gap) return ''
    switch (gap) {
      case 'gap-y-1':
        return 'table-row-with-gap-sm'
      case 'gap-y-2':
        return 'table-row-with-gap'
      case 'gap-y-4':
        return 'table-row-with-gap'
      case 'gap-y-6':
        return 'table-row-with-gap-lg'
      case 'gap-y-8':
        return 'table-row-with-gap-xl'
      default:
        return 'table-row-with-gap'
    }
  }

  const getColumnGapClass = (gap: string | undefined) => {
    if (!gap) return ''
    switch (gap) {
      case 'gap-x-1':
        return 'px-1'
      case 'gap-x-2':
        return 'px-2'
      case 'gap-x-4':
        return 'px-4'
      case 'gap-x-6':
        return 'px-6'
      case 'gap-x-8':
        return 'px-8'
      default:
        return 'px-4'
    }
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      pagination: {
        pageIndex: 0,
        pageSize: data.length, // 👈 show ALL rows
      },
    },
  })

  // Infinite scroll observer via reusable hook
  const { sentinelRef } = useInfiniteScroll({
    rootRef: scrollContainerRef,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    loading,
    enabled: enableInfiniteScroll,
  })
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {searchKey && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="max-w-sm pl-8"
              />
            </div>
          )}
        </div>
        {actionBar && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto bg-transparent">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="max-h-[70dvh] overflow-auto" ref={scrollContainerRef}>
        <Table className={`min-w-full ${tableClassName || ''}`}>
          <TableHeader
            className={`sticky top-0 z-20 ${tableHeaderClassName || ''}`}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={`${headerClassName || ''}  ${
                  tableRowClassName || ''
                }`}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={`${headerColumnClassName} ${
                        headerClassName || ''
                      } ${tableHeadClassName || ''} ${tableHeadPadding}`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <DataTableSkeleton columns={columns?.length || 0} rows={7} />
          ) : (
            <TableBody className={`${tableBodyClassName || ''}`}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <Fragment key={index}>
                    <TableRow
                      className={`${tableRowClassName || ''} ${getRowGapClass(
                        rowGap
                      )}`}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className={`h-[100px] ${tableCellClassName || ''} ${
                            cellSpacing || ''
                          } ${getColumnGapClass(columnGap)}`}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {userOffer
                      ? renderExpandedContent &&
                        row.getIsExpanded() && (
                          <TableRow
                            className={`border-b bg-accent-foreground ${
                              tableRowClassName || ''
                            } ${getRowGapClass(rowGap)}`}
                            key={`${row.id}-expanded`}
                          >
                            <TableCell
                              colSpan={columns.length}
                              className={`bg-gray-50 p-0 ${
                                tableCellClassName || ''
                              }`}
                            >
                              {renderExpandedContent(row.original)}
                            </TableCell>
                          </TableRow>
                        )
                      : renderExpandedContent && (
                          <TableRow
                            className={`border-b bg-accent-foreground ${
                              tableRowClassName || ''
                            } ${getRowGapClass(rowGap)}`}
                            key={`${row.id}-expanded`}
                          >
                            <TableCell
                              colSpan={columns.length}
                              className={`bg-gray-50 p-0 ${
                                tableCellClassName || ''
                              }`}
                            >
                              {renderExpandedContent(row.original)}
                            </TableCell>
                          </TableRow>
                        )}
                  </Fragment>
                ))
              ) : (
                <TableRow className={tableRowClassName}>
                  <TableCell
                    colSpan={columns.length}
                    className={`h-24 border-t-4 border-transparent text-center ${
                      tableCellClassName || ''
                    }`}
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
        {/* Sentinel for intersection observer to trigger load more */}
        {enableInfiniteScroll && <div ref={sentinelRef} />}
      </div>
      {loadMoreButton && hasNextPage && (
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="mx-auto"
            onClick={() => onLoadMore && onLoadMore()}
            disabled={!hasNextPage || !!isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading...'
              : hasNextPage
              ? 'Load more'
              : 'No more results'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ExpandableDataTable
