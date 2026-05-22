# Infinite Scrolling Implementation Guide

This document explains how infinite scrolling has been implemented for the users table and how to use it in other components.

## Overview

The infinite scrolling functionality allows tables to load data progressively as the user scrolls down, providing better performance for large datasets and a smoother user experience.

## Implementation Details

### 1. Backend API Support

The backend API supports pagination with these query parameters:

- `page`: Page number (starting from 1)
- `limit`: Number of items per page

Response format:

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1000,
    "totalPages": 50
  }
}
```

### 2. Service Layer (`frontend/services/admin-user-service.ts`)

#### New Service Method

```typescript
getAllUsersPaginated: async (params?: { page?: number; limit?: number }) => {
  const response = await api.getAllData({
    url: GET_ALL_USERS,
    params: params || {},
  })
  return response.data
}
```

#### Infinite Query Hook

```typescript
export const useInfiniteUsers = (params?: { pageSize?: number }) => {
  const pageSize = params?.pageSize || 20

  return useInfiniteQuery({
    queryKey: ['infinite-users', { pageSize }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await AdminUserService.getAllUsersPaginated({
        page: pageParam,
        limit: pageSize,
      })

      return {
        users: res.data.map(transformUserData),
        meta: res.meta,
        pagination: {
          currentPage: pageParam,
          hasNext: pageParam < res.meta.totalPages,
          totalPages: res.meta.totalPages,
          total: res.meta.total,
        },
      }
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.currentPage + 1
        : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
```

### 3. Component Implementation (`frontend/app/dashboard/users/components/UsersTable.tsx`)

#### Data Fetching

```typescript
// Use infinite users hook
const {
  data: infiniteData,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteUsers({ pageSize: 20 })

// Flatten all pages into a single array
const allUsers = useMemo(() => {
  if (!infiniteData?.pages) return []
  return infiniteData.pages.flatMap(page => page.users)
}, [infiniteData])
```

#### Infinite Scroll Handler

```typescript
const handleLoadMore = () => {
  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage()
  }
}
```

#### ExpandableDataTable Integration

```typescript
<ExpandableDataTable
  columns={columns}
  data={filteredData}
  enableInfiniteScroll={!selectedUser} // Only enable when not filtering
  onLoadMore={handleLoadMore}
  hasNextPage={hasNextPage}
  isFetchingNextPage={isFetchingNextPage}
  loading={isLoading}
  // ... other props
/>
```

## Features

### ✅ **Progressive Data Loading**

- Loads 20 users initially
- Automatically loads more when scrolling to bottom
- Smooth loading transitions

### ✅ **Smart Filtering Integration**

- Infinite scroll is **disabled** when filtering by user
- Shows filtered results from already loaded data
- Maintains performance when filtering

### ✅ **Visual Feedback**

- **Data Summary**: Shows "Showing X of Y users"
- **Loading Indicators**: "Loading more..." when fetching next page
- **Scroll Hint**: "Scroll down to load more" badge
- **Filter Status**: Clear indication when filtered

### ✅ **Error Handling**

- Graceful error states with retry options
- Loading state management
- Empty state handling

### ✅ **Performance Optimizations**

- Uses `useMemo` for data flattening
- Efficient re-renders with React.memo
- Stale-time caching (5 minutes)
- Garbage collection time (10 minutes)

## Usage Example

```typescript
// 1. Import the hook
import { useInfiniteUsers } from '@/services/admin-user-service'

// 2. Use in component
const MyComponent = () => {
  const {
    data: infiniteData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers({ pageSize: 20 })

  // 3. Flatten pages
  const allUsers = useMemo(() => {
    if (!infiniteData?.pages) return []
    return infiniteData.pages.flatMap(page => page.users)
  }, [infiniteData])

  // 4. Handle load more
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  // 5. Use with table
  return (
    <ExpandableDataTable
      data={allUsers}
      enableInfiniteScroll={true}
      onLoadMore={handleLoadMore}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      // ... other props
    />
  )
}
```

## Visual States

### Normal State (No Filter)

```
┌─ Data Summary ──────────────────────────────────┐
│ Showing 40 of 1,250 users  [Scroll to load more] │
└─────────────────────────────────────────────────┘

┌─ Table ─────────────────────────────────────────┐
│ [User Data Rows...]                             │
│ [User Data Rows...]                             │
│ [Loading more...]  ← Shows when fetching        │
│ [Sentinel Element] ← Invisible scroll trigger   │
└─────────────────────────────────────────────────┘
```

### Filtered State

```
┌─ Filter Indicator ──────────────────────────────┐
│ 🔍 Filtered by user: John Doe [1 result] [Clear] │
└─────────────────────────────────────────────────┘

┌─ Table ─────────────────────────────────────────┐
│ [Filtered User Data Only]                       │
│ (Infinite scroll disabled when filtering)       │
└─────────────────────────────────────────────────┘
```

## Best Practices

1. **Page Size**: Use 20-50 items per page for optimal performance
2. **Filter Handling**: Disable infinite scroll when filtering to avoid confusion
3. **Loading States**: Always provide clear loading feedback
4. **Error Handling**: Implement retry mechanisms
5. **Memory Management**: Use appropriate cache times
6. **Accessibility**: Ensure keyboard navigation works with infinite scroll

## Integration with Other Tables

To add infinite scrolling to other tables:

1. **Create API method** with pagination support
2. **Create infinite query hook** using `useInfiniteQuery`
3. **Update component** to use the new hook
4. **Add ExpandableDataTable props** for infinite scroll
5. **Handle filtering** appropriately

This implementation provides a solid foundation for infinite scrolling across the application! 🚀
