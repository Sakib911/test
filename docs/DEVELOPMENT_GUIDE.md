# Development Guide

Complete guide for developing with the Frontend Starter Pack. This guide covers everything from setup to deployment, following best practices and maintaining code quality.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git
- VS Code (recommended)

### Setup

```bash
# Clone repository
git clone <repository-url>
cd starter-pack

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### First Steps

1. **Visit Design System**: Go to `/design-system` to see all components
2. **Read Cursor Rules**: Review `.cursorrules` for coding standards
3. **Check Component Index**: Use `docs/COMPONENT_INDEX.md` to find existing components
4. **Follow Documentation Template**: Use `docs/MODULE_DOCUMENTATION_TEMPLATE.md` for new modules

## 🎯 Development Workflow

### 1. Planning Phase

- [ ] **Check existing components** in Component Index
- [ ] **Plan architecture** following SOLID principles
- [ ] **Define TypeScript interfaces** for all data structures
- [ ] **Plan API integration** with React Query
- [ ] **Design responsive layout** with mobile-first approach

### 2. Development Phase

- [ ] **Create components** using existing UI components
- [ ] **Implement TypeScript types** with strict typing
- [ ] **Add React Query hooks** for server state management
- [ ] **Implement error handling** and loading states
- [ ] **Add internationalization** for all user-facing text
- [ ] **Ensure accessibility** compliance (A11y)

### 3. Testing Phase

- [ ] **Write unit tests** for components
- [ ] **Test API integration** with mock data
- [ ] **Test error scenarios** and edge cases
- [ ] **Test responsive design** on multiple devices
- [ ] **Test accessibility** with screen readers
- [ ] **Test performance** with large datasets

### 4. Documentation Phase

- [ ] **Use module documentation template** for new features
- [ ] **Document all components** with usage examples
- [ ] **Update API documentation** if new endpoints added
- [ ] **Update component index** if new components created
- [ ] **Review and update** existing documentation

## 🏗️ Architecture Patterns

### Component Architecture

```typescript
// Container Component (Smart)
const UserListContainer = () => {
  const { data: users, isLoading, error } = useUsers()
  const createUserMutation = useCreateUser()

  const handleCreateUser = (userData: CreateUserData) => {
    createUserMutation.mutate(userData)
  }

  return (
    <UserList
      users={users}
      isLoading={isLoading}
      error={error}
      onCreateUser={handleCreateUser}
    />
  )
}

// Presentational Component (Dumb)
interface UserListProps {
  users: User[]
  isLoading: boolean
  error: Error | null
  onCreateUser: (userData: CreateUserData) => void
}

const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  error,
  onCreateUser
}) => {
  if (isLoading) return <UserListSkeleton />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="space-y-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### Custom Hooks Pattern

```typescript
// Business logic in custom hooks
export const useUserManagement = () => {
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleCreateUser = useCallback(
    (userData: CreateUserData) => {
      createUserMutation.mutate(userData, {
        onSuccess: () => {
          toast.success('User created successfully');
        },
        onError: error => {
          toast.error('Failed to create user');
        },
      });
    },
    [createUserMutation]
  );

  return {
    users,
    isLoading,
    error,
    createUser: handleCreateUser,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};
```

### Service Layer Pattern

```typescript
// API service with proper error handling
export const userService = {
  async getUsers(filters?: UserFilters): Promise<User[]> {
    try {
      const response = await api.getAllData<User[]>({
        url: '/api/users',
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await api.post<User>({
        url: '/api/users',
        body: userData,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
};
```

## 🎨 Design System Usage

### Component Selection Process

1. **Check UI Components** (`/components/ui/`) - Most common use case
2. **Check Form Components** (`/components/form/`) - For input fields
3. **Check Data Components** (`/components/data-table/`) - For tables
4. **Check Layout Components** (`/components/layout/`) - For structure
5. **Check Shared Components** (`/components/share/`) - For common patterns
6. **Create New Component** - Only if none exist

### Component Usage Examples

```typescript
// ✅ CORRECT - Using existing components
import { Button, Card, Input } from '@/components/ui'
import { InputField, SelectField } from '@/components/form'
import { DataTable } from '@/components/data-table'

const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <InputField
            name="search"
            label="Search Users"
            placeholder="Enter search term"
          />
          <DataTable
            columns={userColumns}
            data={users}
            searchKey="name"
          />
          <Button onClick={handleCreateUser}>
            Create User
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ❌ WRONG - Creating custom components when existing ones exist
const MyComponent = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <input className="border p-2 rounded" placeholder="Search" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create User
      </button>
    </div>
  )
}
```

### Color System Usage

```typescript
// ✅ CORRECT - Using design system colors
import { Colors } from '@/lib/Colors'

const MyComponent = () => {
  return (
    <div
      className="bg-white border border-gray-200"
      style={{
        backgroundColor: Colors.background.DEFAULT,
        borderColor: Colors.border.DEFAULT
      }}
    >
      <h2 style={{ color: Colors.text.primary }}>
        Title
      </h2>
    </div>
  )
}

// ❌ WRONG - Hardcoding colors
const MyComponent = () => {
  return (
    <div className="bg-white border border-gray-200">
      <h2 className="text-black">Title</h2>
    </div>
  )
}
```

## 🔄 State Management

### Server State (React Query)

```typescript
// Query for fetching data
const {
  data: users,
  isLoading,
  error,
} = useUsers({
  page: 1,
  limit: 10,
  search: 'john',
});

// Mutation for creating data
const createUserMutation = useCreateUser();

const handleCreateUser = (userData: CreateUserData) => {
  createUserMutation.mutate(userData, {
    onSuccess: newUser => {
      toast.success('User created successfully');
      // Optimistically update the list
      queryClient.setQueryData(['users'], (old: User[]) => [...old, newUser]);
    },
    onError: error => {
      toast.error('Failed to create user');
    },
  });
};
```

### Local State (useState/useReducer)

```typescript
// Simple local state
const [isOpen, setIsOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

// Complex local state
const [formState, dispatch] = useReducer(formReducer, {
  data: {},
  errors: {},
  isSubmitting: false,
});

const handleInputChange = (field: string, value: any) => {
  dispatch({
    type: 'SET_FIELD',
    payload: { field, value },
  });
};
```

### Global State (Context API)

```typescript
// Context for global state
const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const value = {
    user,
    setUser,
    theme,
    setTheme
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook for using context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

## 🌐 Internationalization

### Translation Setup

```typescript
// 1. Add translation keys to messages/en.json
{
  "userManagement": {
    "title": "User Management",
    "createUser": "Create User",
    "searchPlaceholder": "Search users...",
    "messages": {
      "userCreated": "User created successfully",
      "userUpdated": "User updated successfully",
      "userDeleted": "User deleted successfully"
    }
  }
}

// 2. Use translations in components
import { useTranslations } from 'next-intl'

const UserManagement = () => {
  const t = useTranslations('userManagement')

  return (
    <div>
      <h1>{t('title')}</h1>
      <Button>{t('createUser')}</Button>
      <Input placeholder={t('searchPlaceholder')} />
    </div>
  )
}
```

### Translation Key Structure

```
common.*              - Common UI elements
navigation.*          - Navigation items
forms.labels.*        - Form field labels
forms.placeholders.*  - Form placeholders
forms.validation.*    - Validation messages
components.*          - Component-specific text
pages.*              - Page-specific content
[feature].*          - Feature-specific content
```

## 📝 Form Management

### Dynamic Forms with BaseFormComponent

```typescript
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { z } from 'zod'

// 1. Define schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  isActive: z.boolean().optional()
})

// 2. Define fields
const userFields: FieldDefinition[] = [
  {
    name: 'name',
    label: 'name',
    type: 'input',
    required: true,
    className: 'col-span-6'
  },
  {
    name: 'email',
    label: 'email',
    type: 'email',
    required: true,
    className: 'col-span-6'
  },
  {
    name: 'role',
    label: 'role',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' }
    ],
    className: 'col-span-6'
  },
  {
    name: 'isActive',
    label: 'isActive',
    type: 'checkbox',
    className: 'col-span-6'
  }
]

// 3. Use in component
const UserForm = () => {
  const createUserMutation = useCreateUser()

  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    createUserMutation.mutate(data)
  }

  return (
    <BaseFormComponent
      schema={userSchema}
      fields={userFields}
      onSubmit={handleSubmit}
      actionButtons={{
        submit: true,
        reset: true,
        submitText: 'Create User'
      }}
      toastConfig={{
        showSuccessToast: true,
        successMessage: 'User created successfully',
        showErrorToast: true
      }}
    />
  )
}
```

## 📊 Data Display

### Data Tables

```typescript
import { DataTable } from '@/components/data-table/data-table'
import { ColumnDef } from '@tanstack/react-table'

// 1. Define columns
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>{row.original.name}</span>
      </div>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
        {row.original.role}
      </Badge>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(row.original.id)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }
]

// 2. Use in component
const UserList = () => {
  const { data: users, isLoading } = useUsers()

  return (
    <DataTable
      columns={userColumns}
      data={users || []}
      isLoading={isLoading}
      searchKey="name"
      searchPlaceholder="Search users..."
      showPagination={true}
    />
  )
}
```

## 🧪 Testing

### Component Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserCard } from '@/components/UserCard'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
})

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    }

    renderWithProviders(<UserCard user={user} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' }
    const onEdit = jest.fn()

    renderWithProviders(<UserCard user={user} onEdit={onEdit} />)

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalledWith('1')
  })
})
```

### API Testing

```typescript
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUsers } from '@/hooks/useUsers'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        users: [
          { id: '1', name: 'John Doe', email: 'john@example.com' }
        ]
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useUsers', () => {
  it('fetches users successfully', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )

    const { result } = renderHook(() => useUsers(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual({
      users: [
        { id: '1', name: 'John Doe', email: 'john@example.com' }
      ]
    })
  })
})
```

## 🚀 Performance Optimization

### Component Optimization

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo<Props>(({ data, onAction }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item)
    }))
  }, [data])

  const handleAction = useCallback((id: string) => {
    onAction(id)
  }, [onAction])

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onAction={handleAction} />
      ))}
    </div>
  )
})

// Use lazy loading for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

const App = () => {
  const [showHeavy, setShowHeavy] = useState(false)

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>
        Load Heavy Component
      </button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  )
}
```

### Bundle Optimization

```typescript
// Dynamic imports for large dependencies
const Chart = lazy(() =>
  import('recharts').then(module => ({
    default: module.LineChart,
  }))
);

// Tree shaking friendly imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// Instead of
import * as UI from '@/components/ui';
```

## 🔒 Security Best Practices

### Input Validation

```typescript
// Always validate inputs with Zod
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

const handleSubmit = (data: unknown) => {
  try {
    const validatedData = userSchema.parse(data);
    // Process validated data
  } catch (error) {
    // Handle validation error
  }
};
```

### XSS Prevention

```typescript
// Use React's built-in XSS protection
const UserContent = ({ content }: { content: string }) => {
  // ✅ Safe - React automatically escapes content
  return <div>{content}</div>

  // ❌ Dangerous - Don't use dangerouslySetInnerHTML unless necessary
  // return <div dangerouslySetInnerHTML={{ __html: content }} />
}
```

### Authentication

```typescript
// Protect routes with authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" />

  return <>{children}</>
}
```

## 📱 Responsive Design

### Mobile-First Approach

```typescript
const ResponsiveComponent = () => {
  return (
    <div className="
      grid grid-cols-1 gap-4
      sm:grid-cols-2 sm:gap-6
      md:grid-cols-3 md:gap-8
      lg:grid-cols-4 lg:gap-10
    ">
      {items.map(item => (
        <Card key={item.id}>
          <CardContent>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### Touch-Friendly Design

```typescript
const TouchFriendlyButton = () => {
  return (
    <Button
      className="
        min-h-[44px] min-w-[44px]  // Minimum touch target size
        p-3 sm:p-4                  // Generous padding
        text-base sm:text-lg        // Readable text size
      "
    >
      Touch Me
    </Button>
  )
}
```

## ♿ Accessibility

### Semantic HTML

```typescript
const AccessibleForm = () => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>User Information</legend>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              aria-describedby="name-error"
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </fieldset>
    </form>
  )
}
```

### Keyboard Navigation

```typescript
const KeyboardAccessibleMenu = () => {
  const [focusedIndex, setFocusedIndex] = useState(0)

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev + 1) % items.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev - 1 + items.length) % items.length)
        break
      case 'Enter':
        e.preventDefault()
        handleSelect(items[focusedIndex])
        break
    }
  }

  return (
    <div
      role="menu"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          role="menuitem"
          tabIndex={-1}
          className={cn(
            "p-2 cursor-pointer",
            focusedIndex === index && "bg-blue-100"
          )}
          onClick={() => handleSelect(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

## 🔄 Git Workflow

### Branch Naming

```bash
# Feature branches
feature/user-management
feature/investment-dashboard
feature/notification-system

# Bug fixes
bugfix/login-validation
bugfix/data-table-sorting

# Hotfixes
hotfix/security-patch
hotfix/critical-bug
```

### Commit Messages

```bash
# Use conventional commits
feat: add user management dashboard
fix: resolve data table sorting issue
docs: update API documentation
style: format code with prettier
refactor: extract user service logic
test: add unit tests for user components
chore: update dependencies
```

### Pull Request Process

1. **Create feature branch** from main
2. **Make changes** following coding standards
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Create pull request** with description
6. **Request code review** from team members
7. **Address feedback** and make changes
8. **Merge** after approval

## 📋 Code Review Checklist

### Before Submitting PR

- [ ] **Follows SOLID principles**
- [ ] **Uses existing UI components**
- [ ] **Implements proper TypeScript types**
- [ ] **Uses React Query for server state**
- [ ] **Implements proper error handling**
- [ ] **Uses translations for all text**
- [ ] **Follows component structure guidelines**
- [ ] **Includes proper documentation**
- [ ] **Tests pass successfully**
- [ ] **No console.log statements**
- [ ] **No unused imports**
- [ ] **Follows naming conventions**
- [ ] **Accessible (A11y compliant)**
- [ ] **Responsive design implemented**
- [ ] **Performance optimized**

### Reviewing PRs

- [ ] **Code quality** and adherence to standards
- [ ] **Functionality** works as expected
- [ ] **Security** considerations addressed
- [ ] **Performance** implications considered
- [ ] **Accessibility** requirements met
- [ ] **Documentation** is complete and accurate
- [ ] **Tests** cover new functionality
- [ ] **Breaking changes** documented

## 🚀 Deployment

### Environment Setup

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=https://api.example.com

# Optional
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_DEBUG=false
```

### Build Optimization

```typescript
// next.config.ts
const nextConfig = {
  // Enable compression
  compress: true,

  // Optimize images
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};
```

## 📞 Getting Help

### Resources

- **Design System**: Visit `/design-system` for live examples
- **Component Index**: Check `docs/COMPONENT_INDEX.md`
- **API Documentation**: Review `docs/API_DOCUMENTATION.md`
- **Cursor Rules**: Follow `.cursorrules` for coding standards

### Common Issues

- **"Should I create a new component?"** - Check existing UI components first
- **"How do I handle state?"** - Use React Query for server state, useState for local state
- **"How do I style components?"** - Use Tailwind CSS with the design system colors
- **"How do I add translations?"** - Use the useTranslations hook with proper key structure

### Team Support

- **Code Reviews** - Ask team members for reviews
- **Pair Programming** - Work together on complex features
- **Documentation** - Update docs when making changes
- **Knowledge Sharing** - Share learnings with the team

---

**Last Updated:** 2024-12-19  
**Next Review:** 2025-01-19  
**Maintainer:** Development Team

For questions or suggestions about this guide, please create an issue or contact the development team.
