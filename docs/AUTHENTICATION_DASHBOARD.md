# Authentication & Dashboard System Documentation

## Overview

This documentation covers the complete authentication and dashboard system built following best practices for a Next.js application with TypeScript, React Query, and internationalization support.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Authentication System](#authentication-system)
- [Dashboard Features](#dashboard-features)
- [Theme System](#theme-system)
- [Internationalization](#internationalization)
- [API Integration](#api-integration)
- [Setup & Usage](#setup--usage)
- [Future Enhancements](#future-enhancements)

## Architecture Overview

The application follows a modern Next.js App Router architecture with:

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API for global state
- **Server State**: React Query for API state management
- **Authentication**: Context-based with mock data (ready for API integration)
- **Routing**: Next.js App Router with middleware protection
- **Internationalization**: next-intl for multi-language support
- **Theme**: next-themes for dark/light mode switching

## Authentication System

### 🔐 Features

- **Login/Logout**: Secure user authentication
- **Registration**: New user account creation
- **Password Reset**: Forgot password flow with email simulation
- **Password Change**: Authenticated users can change passwords
- **Role-Based Access**: Admin, User, and Moderator roles
- **Session Management**: Persistent login state
- **Route Protection**: Middleware-based route guarding

### 📁 File Structure

```
app/
├── auth/
│   ├── login/page.tsx              # Login page
│   ├── signup/page.tsx             # Registration page
│   ├── forgot-password/page.tsx    # Password reset request
│   └── reset-password/page.tsx     # Password reset form
├── dashboard/
│   ├── page.tsx                    # Dashboard home
│   └── change-password/page.tsx    # Password change for authenticated users
contexts/
└── auth-context.tsx                # Authentication context and logic
middleware.ts                       # Route protection and i18n handling
```

### 🔧 Implementation Details

#### AuthContext (`contexts/auth-context.tsx`)

The authentication system is built around a React Context that provides:

```typescript
interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
}
```

**Key Features:**

- Form validation using Zod schemas
- Mock API simulation with realistic delays
- Error handling with toast notifications
- Persistent state with localStorage
- Type-safe form interfaces

#### Demo Accounts

The system includes pre-configured demo accounts for testing:

| Email                 | Password | Role      |
| --------------------- | -------- | --------- |
| admin@example.com     | admin123 | Admin     |
| user@example.com      | user123  | User      |
| moderator@example.com | mod123   | Moderator |

#### Route Protection (`middleware.ts`)

The middleware handles:

- **Authentication Checks**: Redirects unauthenticated users to login
- **Role-Based Access**: Restricts admin routes to admin users
- **Internationalization**: Manages locale detection and routing
- **Public Routes**: Allows access to auth pages and homepage

```typescript
// Protected routes require authentication
// Public routes: /, /auth/*, /design-system
// Admin routes: /dashboard/admin/* (admin role only)
```

## Dashboard Features

### 🏠 Dashboard Layout (`components/dashboard/DashboardLayout.tsx`)

The dashboard provides a comprehensive layout with:

#### Responsive Sidebar

- **Desktop**: Fixed sidebar with navigation links
- **Mobile**: Collapsible sheet overlay
- **Role-Based Navigation**: Menu items filtered by user role
- **Visual Indicators**: Active route highlighting

#### Header Features

- **Language Switcher**: Dropdown for English/German
- **Theme Toggle**: Dark/light/system mode switching
- **User Profile**: Avatar with dropdown menu
- **Quick Actions**: Settings, profile, logout

#### Navigation Structure

```typescript
const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['Admin', 'User', 'Moderator'],
  },
  { title: 'Users', href: '/dashboard/users', icon: Users, roles: ['Admin'] },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['Admin', 'User', 'Moderator'],
  },
  {
    title: 'Change Password',
    href: '/dashboard/change-password',
    icon: KeyRound,
    roles: ['Admin', 'User', 'Moderator'],
  },
  {
    title: 'Design System',
    href: '/design-system',
    icon: Palette,
    roles: ['Admin', 'User', 'Moderator'],
  },
];
```

### 📊 Dashboard Home (`app/dashboard/page.tsx`)

The dashboard home displays:

- **Welcome Section**: Personalized greeting with user info
- **Statistics Cards**: Key metrics and user data
- **Recent Activity**: Mock activity feed with avatars
- **Quick Actions**: Navigation to common tasks
- **Performance Stats**: Progress indicators and charts

### 🔐 Change Password (`app/dashboard/change-password/page.tsx`)

Secure password change functionality:

- **Current Password Verification**: Validates existing password
- **Strong Password Requirements**: 8+ chars, uppercase, lowercase, numbers
- **Confirmation Matching**: Ensures new passwords match
- **Security Tips**: User guidance for strong passwords
- **Account Info Display**: Shows email and last login

## Theme System

### 🎨 Implementation (`contexts/theme-context.tsx`)

The theme system provides:

#### Provider Architecture

```typescript
<ThemeProvider>
  {' '}
  // Main provider (next-themes + custom context)
  <NextThemeProvider>
    {' '}
    // next-themes provider
    <ThemeContextProvider>
      {' '}
      // Custom context with additional features
      {children}
    </ThemeContextProvider>
  </NextThemeProvider>
</ThemeProvider>
```

#### Features

- **Theme Options**: Light, Dark, System
- **Persistent Storage**: Saves user preference
- **System Detection**: Automatically detects OS theme
- **Smooth Transitions**: No flash on page load
- **Custom Hook**: `useTheme()` for theme management

#### Theme Toggle Component

```typescript
export function ThemeToggle() {
  // Simple toggle button with icon transitions
  // Dropdown with Light/Dark/System options
}
```

### 🎨 Styling Integration

- **Tailwind CSS**: Dark mode classes (`dark:`)
- **CSS Variables**: Theme-aware color tokens
- **Component Variants**: Automatic theme adaptation
- **Consistent UI**: All components respect theme settings

## Internationalization

### 🌐 Setup (`i18n/request.ts`)

The i18n system supports:

- **Languages**: English (en), German (de)
- **Server-Side**: next-intl with App Router
- **Type Safety**: TypeScript integration
- **Fallbacks**: Graceful handling of missing translations

### 📝 Translation Files

#### English (`messages/en.json`)

```json
{
  "auth": {
    "loginTitle": "Welcome Back",
    "loginSubtitle": "Sign in to your account to continue",
    "email": "Email",
    "password": "Password"
    // ... more translations
  },
  "dashboard": {
    "welcome": "Welcome, {name}!",
    "logout": "Logout"
    // ... more translations
  }
}
```

#### German (`messages/de.json`)

```json
{
  "auth": {
    "loginTitle": "Willkommen zurück",
    "loginSubtitle": "Melden Sie sich in Ihrem Konto an, um fortzufahren",
    "email": "E-Mail",
    "password": "Passwort"
    // ... more translations
  }
}
```

### 🔧 Usage in Components

```typescript
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('auth')

  return (
    <h1>{t('loginTitle')}</h1>
    <p>{t('welcome', { name: user.name })}</p>
  )
}
```

## API Integration

### 🔄 Current State (Mock Data)

The system currently uses mock data for:

- User authentication
- User profiles
- Dashboard statistics
- Activity feeds

### 🚀 Future API Integration

The architecture is designed for easy API integration:

#### Authentication Service

```typescript
// Future API integration points
export class AuthService {
  static async login(credentials: LoginData): Promise<AuthResponse>;
  static async register(userData: RegisterData): Promise<AuthResponse>;
  static async forgotPassword(email: string): Promise<void>;
  static async resetPassword(data: ResetPasswordData): Promise<void>;
  static async changePassword(data: ChangePasswordData): Promise<void>;
  static async refreshToken(): Promise<AuthResponse>;
  static async logout(): Promise<void>;
}
```

#### Integration Steps

1. **Replace Mock Functions**: Update AuthContext methods to call real APIs
2. **Add Token Management**: Implement JWT token handling
3. **Update Middleware**: Add real token validation
4. **Error Handling**: Enhance error responses
5. **Loading States**: Add proper loading indicators

### 🔧 React Query Integration

The system includes React Query setup for:

- **Server State Management**: Automatic caching and synchronization
- **Background Updates**: Keeps data fresh
- **Error Handling**: Retry logic and error boundaries
- **Loading States**: Built-in loading management

```typescript
// Example hook for future API integration
export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => AuthService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## Setup & Usage

### 🛠️ Installation

1. **Clone Repository**

```bash
git clone [repository-url]
cd starter-pack
```

2. **Install Dependencies**

```bash
npm install
# or
pnpm install
```

3. **Run Development Server**

```bash
npm run dev
# or
pnpm dev
```

### 🎯 Usage Guide

#### 1. Authentication Flow

- Visit `/` for homepage with auth links
- Use `/auth/login` with demo accounts
- Try `/auth/signup` for registration
- Test `/auth/forgot-password` for password reset

#### 2. Dashboard Access

- Login redirects to `/dashboard`
- Explore sidebar navigation
- Test role-based access (admin vs user)
- Try theme and language switching

#### 3. Development Workflow

- Modify components in `components/`
- Update translations in `messages/`
- Add new routes in `app/`
- Test with different user roles

### 🔍 Testing

#### Manual Testing Checklist

- [ ] Login with all demo accounts
- [ ] Test navigation between pages
- [ ] Verify role-based access control
- [ ] Switch themes (light/dark/system)
- [ ] Change language (EN/DE)
- [ ] Test responsive design (mobile/desktop)
- [ ] Verify form validations
- [ ] Test password change flow

#### Browser Testing

- Chrome, Firefox, Safari, Edge
- Mobile devices (iOS/Android)
- Different screen sizes

## Future Enhancements

### 🔮 Planned Features

#### Authentication Enhancements

- [ ] **Two-Factor Authentication**: SMS/Email OTP
- [ ] **Social Login**: Google, GitHub, Apple
- [ ] **Session Management**: Multiple device tracking
- [ ] **Password Policy**: Configurable requirements
- [ ] **Account Lockout**: Brute force protection

#### Dashboard Features

- [ ] **User Management**: Admin user CRUD operations
- [ ] **Analytics Dashboard**: Charts and metrics
- [ ] **Settings Panel**: App configuration
- [ ] **Notifications**: Real-time alerts
- [ ] **Audit Logs**: User activity tracking

#### Technical Improvements

- [ ] **Real API Integration**: Replace mock data
- [ ] **Database Integration**: User persistence
- [ ] **Email Service**: Real email notifications
- [ ] **File Upload**: Avatar and document handling
- [ ] **Search Functionality**: Global search
- [ ] **Data Export**: CSV/PDF reports

#### UX Enhancements

- [ ] **Onboarding Flow**: New user guidance
- [ ] **Help System**: In-app documentation
- [ ] **Keyboard Shortcuts**: Power user features
- [ ] **Accessibility**: WCAG compliance
- [ ] **Performance**: Code splitting and optimization

### 🔧 Migration Guide

When moving from mock to real API:

1. **Update Environment Variables**

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

2. **Replace AuthContext Methods**

```typescript
// Before (mock)
const login = async data => {
  const user = mockUsers.find(u => u.email === data.email);
  // ...
};

// After (real API)
const login = async data => {
  const response = await AuthService.login(data);
  // ...
};
```

3. **Update Middleware**

```typescript
// Add real token validation
const isValid = await validateToken(token);
```

4. **Add Error Boundaries**

```typescript
// Implement proper error handling
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Troubleshooting

### Common Issues

#### Theme Provider Error

```
Error: useTheme must be used within a ThemeProvider
```

**Solution**: Ensure ThemeProvider wraps the entire app in layout.tsx

#### Translation Missing

```
Error: Translation key not found
```

**Solution**: Add missing keys to both en.json and de.json

#### Route Protection Not Working

```
Users can access protected routes without authentication
```

**Solution**: Check middleware.ts configuration and cookie handling

#### Build Errors

```
Type errors during build
```

**Solution**: Run `npm run type-check` and fix TypeScript issues

### Debug Tips

1. **Check Browser Console**: Look for JavaScript errors
2. **Network Tab**: Verify API calls and responses
3. **React DevTools**: Inspect component state
4. **Next.js DevTools**: Monitor performance

### Support

For questions and issues:

- Check existing documentation
- Review component source code
- Test with demo accounts
- Use browser developer tools

---

## Contributing

When adding new features:

1. Follow existing code patterns
2. Add proper TypeScript types
3. Include translations for new text
4. Test with all user roles
5. Update documentation
6. Follow commit message conventions

## License

This project is part of the starter pack design system. See LICENSE for details.
