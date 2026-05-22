# Design System - Starter Pack

A comprehensive component library built with Next.js 15, TypeScript, React Query, and internationalization support. This design system provides everything you need to build modern, accessible web applications.

## 🚀 Quick Start

### View the Design System

Visit the design system page to see all components in action:

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to:
   - **Home Page**: [http://localhost:3000](http://localhost:3000)
   - **Design System**: [http://localhost:3000/design-system](http://localhost:3000/design-system)

## 📋 Features

### ⚡ React Query Integration

- **Server state management** with automatic caching
- **Optimistic updates** for better UX
- **Background refetching** and synchronization
- **Error handling** with proper fallbacks
- **Loading states** and loading indicators

### 🌍 Internationalization (i18n)

- **Multi-language support** (English & German)
- **Type-safe translations** with next-intl
- **Server-side rendering** compatible
- **Locale routing** and detection
- **Middleware integration** for seamless routing

### 🎨 UI Components (50+)

Built on shadcn/ui with consistent design patterns:

#### Form Components

- **BaseFormComponent**: Dynamic form generation with validation
- **Input Fields**: Text, email, password, number, phone
- **Selection Components**: Select, multi-select, radio, checkbox
- **Special Fields**: Date, date-range, file upload, currency
- **Advanced Features**: Conditional rendering, file uploads with API integration

#### Data Display

- **DataTable**: Advanced table with sorting, filtering, pagination
- **Cards**: Flexible card layouts with headers, content, actions
- **Badges**: Status indicators and labels
- **Avatars**: User profile images with fallbacks

#### Feedback

- **Alerts**: Information, warning, error states
- **Progress**: Loading bars and completion indicators
- **Skeletons**: Loading state placeholders
- **Toasts**: Success, error, and info notifications

#### Navigation

- **Tabs**: Organized content sections
- **Breadcrumbs**: Navigation hierarchy
- **Buttons**: Multiple variants and sizes

### 🛠 Technical Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Full type safety
- **React Query** - Server state management
- **next-intl** - Internationalization
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component foundation
- **Radix UI** - Accessibility primitives

## 📁 Project Structure

```
├── app/
│   ├── design-system/         # Design system showcase page
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Base UI components (50+)
│   ├── form/                 # Form components and fields
│   │   └── form-management/  # Dynamic form system
│   ├── data-table/          # Advanced table components
│   └── share/               # Shared/common components
├── hooks/
│   ├── useApiQueries.ts     # React Query hooks
│   └── ...                  # Other custom hooks
├── lib/
│   ├── i18n-config.ts       # Internationalization config
│   ├── Constants.ts         # API endpoints and constants
│   └── utils.ts             # Utility functions
├── messages/
│   ├── en.json              # English translations
│   └── de.json              # German translations
├── providers/
│   ├── QueryProvider.tsx   # React Query provider
│   └── ...                 # Other providers
└── services/
    └── Api.ts              # API service layer
```

## 🔧 How to Use Components

### 1. Dynamic Forms with BaseFormComponent

```typescript
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const fields = [
  {
    name: 'name',
    label: 'name',
    type: 'input',
    required: true,
    className: 'col-span-6',
  },
  {
    name: 'email',
    label: 'email',
    type: 'email',
    required: true,
    className: 'col-span-6',
  },
]

<BaseFormComponent
  schema={schema}
  fields={fields}
  onSubmit={(data) => console.log(data)}
  actionButtons={{ submit: true, reset: true }}
/>
```

### 2. Data Tables with React Query

```typescript
import { DataTable } from '@/components/data-table/data-table'
import { useUsers } from '@/hooks/useApiQueries'

const { data: users, isLoading } = useUsers()

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  // ... more columns
]

<DataTable
  columns={columns}
  data={users || []}
  isLoading={isLoading}
  searchKey="name"
  showPagination={true}
/>
```

### 3. React Query with API Integration

```typescript
import { useUsers, useCreateUser } from '@/hooks/useApiQueries';

// Fetch data
const { data: users, isLoading, error } = useUsers();

// Mutations
const createUserMutation = useCreateUser();

const handleCreateUser = userData => {
  createUserMutation.mutate(userData, {
    onSuccess: () => {
      // Handle success
    },
    onError: error => {
      // Handle error
    },
  });
};
```

### 4. Internationalization

```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations()

// Usage in components
<Button>{t('common.submit')}</Button>
<h1>{t('designSystem.title')}</h1>
```

## 🔗 API Integration

The design system includes a built-in API service (`/services/Api.ts`) that provides:

- **Authentication handling** with token management
- **Error handling** with toast notifications
- **Loading state management**
- **Request/response interceptors**

### API Service Usage

```typescript
import api from '@/services/Api';

// GET request
api.getAllData(
  {
    url: '/users',
    params: { page: 1 },
  },
  response => {
    console.log(response.data);
  }
);

// POST request
api.post(
  {
    url: '/users',
    body: userData,
  },
  response => {
    console.log('User created:', response.data);
  }
);
```

## 🎯 React Query Patterns

### Query Keys Organization

```typescript
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  products: ['products'] as const,
};
```

### Optimistic Updates

```typescript
const toggleStatusMutation = useMutation({
  mutationFn: updateUserStatus,
  onMutate: async newData => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['users'] });

    // Snapshot previous value
    const previousUsers = queryClient.getQueryData(['users']);

    // Optimistically update
    queryClient.setQueryData(['users'], old => updateUserInList(old, newData));

    return { previousUsers };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['users'], context.previousUsers);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries(['users']);
  },
});
```

## 🌐 Localization Setup

### Adding New Languages

1. Create translation file:

   ```bash
   touch messages/fr.json
   ```

2. Update i18n config:

   ```typescript
   // lib/i18n-config.ts
   export const locales = ['en', 'de', 'fr'] as const;
   ```

3. Add translations:
   ```json
   {
     "common": {
       "submit": "Soumettre",
       "cancel": "Annuler"
     }
   }
   ```

### Translation Keys Structure

```
common.*          - Common UI elements
navigation.*      - Navigation items
forms.labels.*    - Form field labels
forms.placeholders.*  - Form placeholders
forms.validation.*    - Validation messages
components.*      - Component-specific text
```

## 🔨 Customization

### Theme Customization

The design system uses Tailwind CSS with CSS variables for theming:

```css
/* globals.css */
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* ... more custom properties */
}
```

### Component Variants

Most components support multiple variants:

```typescript
// Button variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Card with different styles
<Card className="border-2 hover:shadow-lg">
  <CardHeader>...</CardHeader>
</Card>
```

## 📊 Performance

### Optimizations Included

- **Code splitting** with dynamic imports
- **Image optimization** with Next.js Image
- **Bundle analysis** ready
- **React Query caching** for API calls
- **Memoization** for expensive operations

### Bundle Size

- **Core bundle**: ~200KB gzipped
- **Component library**: ~150KB gzipped
- **Minimal runtime**: Only load what you use

## 🧪 Testing

### Component Testing

```bash
# Run component tests
npm run test

# Run with coverage
npm run test:coverage
```

### E2E Testing

```bash
# Run end-to-end tests
npm run test:e2e
```

## 🚀 Production Deployment

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=https://api.yoursite.com

# Optional
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📖 Additional Resources

- **Shadcn/ui Documentation**: [ui.shadcn.com](https://ui.shadcn.com)
- **React Query Docs**: [tanstack.com/query](https://tanstack.com/query)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **next-intl Docs**: [next-intl-docs.vercel.app](https://next-intl-docs.vercel.app)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Ready to get started?** Run `npm run dev` and visit [http://localhost:3000/design-system](http://localhost:3000/design-system) to explore all components!
