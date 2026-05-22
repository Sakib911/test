'use client'

import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableSkeletonProps {
  /** Number of rows to display in skeleton */
  rows?: number
  /** Number of columns to display in skeleton */
  columns?: number
  /** Show search bar skeleton */
  showSearch?: boolean
  /** Show pagination skeleton */
  showPagination?: boolean
  /** Show column visibility toggle skeleton */
  showColumnToggle?: boolean
  /** Custom header class name */
  headerClassName?: string
  /** Custom row height */
  rowHeight?: string
  /** Show expandable rows skeleton */
  showExpandableRows?: boolean
  /** Custom table class name */
  tableClassName?: string
}

export const DataTableSkeleton = ({
  columns = 6,
  showSearch = true,
  showPagination = true,
  showColumnToggle = false,
  headerClassName,
  tableClassName,
}: DataTableSkeletonProps) => {
  return (
    <div className="space-y-4">
      {/* Search and Actions Bar Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {showSearch && (
            <div className="relative">
              <Skeleton className="h-9 w-64" />
            </div>
          )}
        </div>
        {showColumnToggle && <Skeleton className="h-9 w-20" />}
      </div>

      {/* Table Skeleton */}
      <div className="max-h-[80dvh] overflow-hidden overflow-y-auto">
        <Table className={tableClassName}>
          {/* Header Skeleton */}
          <TableHeader>
            <TableRow className={headerClassName}>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead
                  key={`header-${index}`}
                  className={`h-[40px] ${headerClassName || ''}`}
                >
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body Skeleton */}
          <TableBody className="border"></TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      {showPagination && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      )}
    </div>
  )
}

// const ExpandableContentSkeleton = () => {
//   return (
//     <div className="w-full border-x-0 px-1">
//       {/* Section Headers (like tabs) */}
//       <div className="grid grid-cols-5 gap-0">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <div key={`tab-${index}`} className="my-1 bg-accent-foreground py-2">
//             <div className="flex items-center justify-center">
//               <Skeleton className="h-4 w-24" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Content Area */}
//       <div className="p-6">
//         <div className="bg-slate-800 px-3 py-2 text-white">
//           <Skeleton className="h-5 w-32 bg-slate-600" />
//         </div>
//         <div className="space-y-2 bg-white p-4">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div
//               key={`content-${index}`}
//               className={`flex w-full justify-between p-3 ${
//                 index % 2 === 0 ? 'bg-[#EEF2FA]' : ''
//               }`}
//             >
//               <Skeleton className="h-4 w-32" />
//               <Skeleton className="h-4 w-24" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// Smart skeleton component that adapts based on context
export const SmartDataTableSkeleton = ({
  variant = 'offers',
  ...props
}: DataTableSkeletonProps & {
  variant?: 'offers' | 'users' | 'investments' | 'generic'
}) => {
  const getSkeletonConfig = () => {
    switch (variant) {
      case 'offers':
        return {
          columns: 6,
          rows: 8,
          showExpandableRows: true,
          headerClassName: 'bg-primary text-white border-[1px] border-primary',
          rowHeight: 'h-[100px]',
        }
      case 'users':
        return {
          columns: 5,
          rows: 10,
          showExpandableRows: false,
          rowHeight: 'h-[60px]',
        }
      case 'investments':
        return {
          columns: 7,
          rows: 6,
          showExpandableRows: true,
          rowHeight: 'h-[80px]',
        }
      default:
        return {
          columns: 5,
          rows: 5,
          showExpandableRows: false,
          rowHeight: 'h-[60px]',
        }
    }
  }

  const config = getSkeletonConfig()

  return <DataTableSkeleton {...config} {...props} />
}

export default DataTableSkeleton
