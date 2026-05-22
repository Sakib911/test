# API Documentation

Complete reference for all API endpoints, services, and integration patterns used in the Frontend Starter Pack.

## 🔗 Base Configuration

### API Service

- **Base URL:** `process.env.NEXT_PUBLIC_API_URL`
- **Service File:** `/services/Api.ts`
- **Authentication:** Bearer token in headers
- **Content Type:** `application/json`

### Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=https://api.example.com

# Optional
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3
```

## 🛠️ API Service Methods

### Core Methods

```typescript
// GET request
api.getAllData<T>(config: ApiConfig, callback?: (response: ApiResponse<T>) => void)

// POST request
api.post<T>(config: ApiConfig, callback?: (response: ApiResponse<T>) => void)

// PUT request
api.put<T>(config: ApiConfig, callback?: (response: ApiResponse<T>) => void)

// DELETE request
api.delete<T>(config: ApiConfig, callback?: (response: ApiResponse<T>) => void)

// PATCH request
api.patch<T>(config: ApiConfig, callback?: (response: ApiResponse<T>) => void)
```

### Configuration Interface

```typescript
interface ApiConfig {
  url: string;
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  timeout?: number;
}
```

### Response Interface

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
```

## 👤 Authentication Endpoints

### Login

```typescript
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "jwt-token-here",
  "refreshToken": "refresh-token-here"
}
```

### Register

```typescript
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "jwt-token-here"
}
```

### Refresh Token

```typescript
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh-token-here"
}

Response:
{
  "token": "new-jwt-token-here",
  "refreshToken": "new-refresh-token-here"
}
```

### Logout

```typescript
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{
  "message": "Logged out successfully"
}
```

### Forgot Password

```typescript
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "message": "Password reset email sent"
}
```

### Reset Password

```typescript
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token",
  "password": "new-password"
}

Response:
{
  "message": "Password reset successfully"
}
```

## 👥 User Management Endpoints

### Get Users

```typescript
GET /api/users
Authorization: Bearer <token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - search: string (optional)
  - role: string (optional)
  - status: string (optional)

Response:
{
  "users": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "avatar": "https://example.com/avatar.jpg",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Get User by ID

```typescript
GET /api/users/:id
Authorization: Bearer <token>

Response:
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "avatar": "https://example.com/avatar.jpg",
  "joinedAt": "2024-01-01T00:00:00Z",
  "profile": {
    "bio": "Software Developer",
    "location": "New York",
    "website": "https://johndoe.com"
  }
}
```

### Create User

```typescript
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

Response:
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "joinedAt": "2024-01-01T00:00:00Z"
}
```

### Update User

```typescript
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "admin"
}

Response:
{
  "id": "123",
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "admin",
  "status": "active",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Delete User

```typescript
DELETE /api/users/:id
Authorization: Bearer <token>

Response:
{
  "message": "User deleted successfully"
}
```

### Toggle User Status

```typescript
PATCH /api/users/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "inactive"
}

Response:
{
  "id": "123",
  "status": "inactive",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 📦 Product Management Endpoints

### Get Products

```typescript
GET /api/products
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - search: string (optional)
  - category: string (optional)
  - minPrice: number (optional)
  - maxPrice: number (optional)
  - sortBy: string (optional)
  - sortOrder: 'asc' | 'desc' (optional)

Response:
{
  "products": [
    {
      "id": "123",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "category": "Electronics",
      "stock": 50,
      "rating": 4.5,
      "imageUrl": "https://example.com/product.jpg",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Get Product by ID

```typescript
GET /api/products/:id

Response:
{
  "id": "123",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "rating": 4.5,
  "imageUrl": "https://example.com/product.jpg",
  "images": [
    "https://example.com/product1.jpg",
    "https://example.com/product2.jpg"
  ],
  "specifications": {
    "weight": "1.5kg",
    "dimensions": "10x10x5cm",
    "color": "Black"
  },
  "reviews": [
    {
      "id": "456",
      "userId": "789",
      "rating": 5,
      "comment": "Great product!",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Create Product

```typescript
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/product.jpg"
}

Response:
{
  "id": "123",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/product.jpg",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Update Product

```typescript
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 129.99,
  "stock": 75
}

Response:
{
  "id": "123",
  "name": "Updated Product Name",
  "price": 129.99,
  "stock": 75,
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Delete Product

```typescript
DELETE /api/products/:id
Authorization: Bearer <token>

Response:
{
  "message": "Product deleted successfully"
}
```

## 💰 Investment Endpoints

### Get Investments

```typescript
GET /api/investments
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - search: string (optional)
  - category: string (optional)
  - minAmount: number (optional)
  - maxAmount: number (optional)
  - status: string (optional)

Response:
{
  "investments": [
    {
      "id": "123",
      "title": "Real Estate Investment",
      "description": "Commercial real estate opportunity",
      "imageUrl": "https://example.com/investment.jpg",
      "investmentAmount": 100000,
      "metrics": {
        "contractDuration": "3 years",
        "roi": "12%",
        "onboardingTime": "1 week"
      },
      "returns": {
        "threeYearTotal": "$136,000",
        "yearlyTotal": "$12,000",
        "monthlyTotal": "$1,000"
      },
      "isAvailable": true,
      "isCustomAmount": false,
      "minAmount": 10000,
      "maxAmount": 1000000,
      "amountStep": 1000,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Get Investment by ID

```typescript
GET /api/investments/:id

Response:
{
  "id": "123",
  "title": "Real Estate Investment",
  "description": "Commercial real estate opportunity",
  "imageUrl": "https://example.com/investment.jpg",
  "investmentAmount": 100000,
  "metrics": {
    "contractDuration": "3 years",
    "roi": "12%",
    "onboardingTime": "1 week"
  },
  "returns": {
    "threeYearTotal": "$136,000",
    "yearlyTotal": "$12,000",
    "monthlyTotal": "$1,000"
  },
  "isAvailable": true,
  "isCustomAmount": false,
  "minAmount": 10000,
  "maxAmount": 1000000,
  "amountStep": 1000,
  "details": {
    "riskLevel": "Medium",
    "location": "New York",
    "propertyType": "Commercial",
    "expectedReturn": "12%",
    "minimumInvestment": 10000,
    "maximumInvestment": 1000000
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Create Investment

```typescript
POST /api/investments
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Investment Opportunity",
  "description": "Investment description",
  "imageUrl": "https://example.com/investment.jpg",
  "investmentAmount": 50000,
  "metrics": {
    "contractDuration": "2 years",
    "roi": "10%",
    "onboardingTime": "2 weeks"
  },
  "returns": {
    "threeYearTotal": "$110,000",
    "yearlyTotal": "$5,000",
    "monthlyTotal": "$417"
  },
  "isAvailable": true,
  "isCustomAmount": true,
  "minAmount": 5000,
  "maxAmount": 500000,
  "amountStep": 1000
}

Response:
{
  "id": "123",
  "title": "New Investment Opportunity",
  "description": "Investment description",
  "imageUrl": "https://example.com/investment.jpg",
  "investmentAmount": 50000,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Invest in Opportunity

```typescript
POST /api/investments/:id/invest
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25000,
  "paymentMethod": "bank_transfer",
  "termsAccepted": true
}

Response:
{
  "investmentId": "123",
  "userId": "456",
  "amount": 25000,
  "status": "pending",
  "transactionId": "txn_789",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 💳 Wallet Endpoints

### Get Wallet

```typescript
GET /api/wallet
Authorization: Bearer <token>

Response:
{
  "id": "123",
  "userId": "456",
  "balance": 50000.00,
  "currency": "USD",
  "lastUpdated": "2024-01-01T00:00:00Z"
}
```

### Get Transactions

```typescript
GET /api/wallet/transactions
Authorization: Bearer <token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - type: string (optional)
  - status: string (optional)
  - startDate: string (optional)
  - endDate: string (optional)

Response:
{
  "transactions": [
    {
      "id": "123",
      "type": "deposit",
      "amount": 1000.00,
      "status": "completed",
      "description": "Bank transfer deposit",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Create Transaction

```typescript
POST /api/wallet/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "deposit",
  "amount": 1000.00,
  "description": "Bank transfer deposit",
  "paymentMethod": "bank_transfer"
}

Response:
{
  "id": "123",
  "type": "deposit",
  "amount": 1000.00,
  "status": "pending",
  "description": "Bank transfer deposit",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 🔔 Notification Endpoints

### Get Notifications

```typescript
GET /api/notifications
Authorization: Bearer <token>
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - unreadOnly: boolean (optional)

Response:
{
  "notifications": [
    {
      "id": "123",
      "title": "Investment Update",
      "message": "Your investment has been processed",
      "type": "investment",
      "isRead": false,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  },
  "unreadCount": 5
}
```

### Mark Notification as Read

```typescript
PATCH /api/notifications/:id/read
Authorization: Bearer <token>

Response:
{
  "id": "123",
  "isRead": true,
  "readAt": "2024-01-01T00:00:00Z"
}
```

### Mark All Notifications as Read

```typescript
PATCH /api/notifications/read-all
Authorization: Bearer <token>

Response:
{
  "message": "All notifications marked as read",
  "updatedCount": 5
}
```

## 🔧 React Query Integration

### Query Keys

```typescript
export const queryKeys = {
  // Users
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  usersList: (filters: UserFilters) => ['users', 'list', filters] as const,

  // Products
  products: ['products'] as const,
  product: (id: string) => ['products', id] as const,
  productsList: (filters: ProductFilters) =>
    ['products', 'list', filters] as const,

  // Investments
  investments: ['investments'] as const,
  investment: (id: string) => ['investments', id] as const,
  investmentsList: (filters: InvestmentFilters) =>
    ['investments', 'list', filters] as const,

  // Wallet
  wallet: ['wallet'] as const,
  transactions: ['transactions'] as const,
  transactionsList: (filters: TransactionFilters) =>
    ['transactions', 'list', filters] as const,

  // Notifications
  notifications: ['notifications'] as const,
  notificationsList: (filters: NotificationFilters) =>
    ['notifications', 'list', filters] as const,
} as const;
```

### Custom Hooks

```typescript
// Users
export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: queryKeys.usersList(filters || {}),
    queryFn: () => userService.getUsers(filters),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

// Products
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.productsList(filters || {}),
    queryFn: () => productService.getProducts(filters),
  });
};

// Investments
export const useInvestments = (filters?: InvestmentFilters) => {
  return useQuery({
    queryKey: queryKeys.investmentsList(filters || {}),
    queryFn: () => investmentService.getInvestments(filters),
  });
};

// Wallet
export const useWallet = () => {
  return useQuery({
    queryKey: queryKeys.wallet,
    queryFn: walletService.getWallet,
  });
};

export const useTransactions = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: queryKeys.transactionsList(filters || {}),
    queryFn: () => walletService.getTransactions(filters),
  });
};

// Notifications
export const useNotifications = (filters?: NotificationFilters) => {
  return useQuery({
    queryKey: queryKeys.notificationsList(filters || {}),
    queryFn: () => notificationService.getNotifications(filters),
  });
};
```

## 🚨 Error Handling

### Error Response Format

```typescript
interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
  timestamp: string;
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

### Error Handling Example

```typescript
const { data, error, isLoading } = useUsers()

if (error) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || 'Failed to load users'}
      </AlertDescription>
    </Alert>
  )
}
```

## 🔐 Authentication

### Token Management

```typescript
// Set token
localStorage.setItem('auth_token', token);

// Get token
const token = localStorage.getItem('auth_token');

// Remove token
localStorage.removeItem('auth_token');
```

### Request Interceptor

```typescript
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor

```typescript
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 📊 Pagination

### Pagination Interface

```typescript
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Pagination Usage

```typescript
const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
});

const { data, isLoading } = useUsers(pagination);

const handlePageChange = (newPage: number) => {
  setPagination(prev => ({ ...prev, page: newPage }));
};
```

## 🔍 Search & Filtering

### Search Implementation

```typescript
const [searchTerm, setSearchTerm] = useState('');
const [filters, setFilters] = useState({});

const { data, isLoading } = useUsers({
  search: searchTerm,
  ...filters,
});

const handleSearch = (term: string) => {
  setSearchTerm(term);
  setPagination(prev => ({ ...prev, page: 1 }));
};
```

### Filter Implementation

```typescript
const [filters, setFilters] = useState({
  role: '',
  status: '',
  dateRange: null,
});

const handleFilterChange = (key: string, value: any) => {
  setFilters(prev => ({ ...prev, [key]: value }));
  setPagination(prev => ({ ...prev, page: 1 }));
};
```

## 🚀 Performance Optimization

### Caching Strategy

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Optimistic Updates

```typescript
const updateUserMutation = useMutation({
  mutationFn: userService.updateUser,
  onMutate: async newData => {
    await queryClient.cancelQueries({ queryKey: queryKeys.users });
    const previousUsers = queryClient.getQueryData(queryKeys.users);
    queryClient.setQueryData(queryKeys.users, old =>
      updateUserInList(old, newData)
    );
    return { previousUsers };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(queryKeys.users, context.previousUsers);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users });
  },
});
```

---

**Last Updated:** 2024-12-19  
**API Version:** 1.0.0  
**Maintainer:** Development Team
