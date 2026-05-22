'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { useState, useRef } from 'react'

import { cn } from '../../lib/utils'

import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  headerClassName?: string
  headerColumnClassName?: string
  isLoading?: boolean
  loadingRows?: number
  customLoadingComponent?: ReactNode
  enableColumnResizing?: boolean
  // Pagination props
  showPagination?: boolean
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  totalItems?: number
  searchTerm?: string
  // Layout props
  tableContainerClassName?: string
  // Infinite scroll props
  enableInfiniteScroll?: boolean
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  tableCellClassName?: string
  tableRowClassName?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  isLoading = false,
  loadingRows = 5,
  customLoadingComponent,
  enableColumnResizing = false,
  headerClassName = 'bg-primary text-white hover:bg-primary',
  headerColumnClassName = 'text-white dark:text-black border-x border-white',
  // Pagination props
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  // pageSize = 10,
  totalItems = 0,
  searchTerm = '',
  // Layout props
  tableContainerClassName = '',
  // Infinite scroll props
  enableInfiniteScroll = false,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  tableCellClassName,
  tableRowClassName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // Setup infinite scroll when enabled
  const { sentinelRef } = useInfiniteScroll({
    rootRef: scrollContainerRef,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    loading: isLoading,
    enabled: enableInfiniteScroll,
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableColumnResizing: enableColumnResizing,
    columnResizeMode: 'onChange',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Fallback scroll handler in case IntersectionObserver doesn't fire
  const handleScroll = () => {
    if (!enableInfiniteScroll || !scrollContainerRef.current) return
    if (!hasNextPage || isFetchingNextPage || isLoading) return

    const el = scrollContainerRef.current
    const bottomOffset = 200
    const nearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - bottomOffset
    if (nearBottom && onLoadMore) onLoadMore()
  }

  return (
    <div
      className={`space-y-4 ${tableContainerClassName ? 'flex flex-col' : ''}`}
    >
      <div className="flex items-center justify-between flex-shrink-0">
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
                className="pl-8"
              />
            </div>
          )}
        </div>
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger> */}
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
      </div>
      <div
        className={`${tableContainerClassName || ''}`}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className={headerClassName} key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={headerColumnClassName}
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
          <TableBody>
            {isLoading ? (
              // Custom loading component or default skeleton rows
              customLoadingComponent ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="p-0">
                    {customLoadingComponent}
                  </TableCell>
                </TableRow>
              ) : (
                // Default skeleton loading rows based on columns
                Array.from({ length: loadingRows }, (_, rowIndex) => (
                  <TableRow key={`skeleton-${rowIndex}`}>
                    {columns.map((_, colIndex) => (
                      <TableCell
                        key={`skeleton-${rowIndex}-${colIndex}`}
                        className="border-x border-border p-4"
                      >
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={tableRowClassName}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cn(tableCellClassName, {
                        'border-x border-border': !tableCellClassName,
                      })}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            {enableInfiniteScroll && isFetchingNextPage && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-20 text-center"
                >
                  Loading more...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {enableInfiniteScroll && <div ref={sentinelRef} className="h-1" />}
      </div>
      {/* Server-side Pagination or default table pagination */}
      {showPagination && onPageChange ? (
        // Custom server-side pagination
        <div className="flex items-center justify-between mt-6 flex-shrink-0">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({totalItems} items total)
            {searchTerm && ` - Search for "${searchTerm}"`}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage + i - 2

                if (pageNum > totalPages) return null

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    disabled={isLoading}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      ) : showPagination ? (
        // Default table pagination
        <div className="flex items-center justify-between space-x-2 py-4 flex-shrink-0">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
