# Investment Detail Page Architecture

## Overview

The Investment Detail Page system is built with clean architecture principles and maximum reusability. Each component follows SOLID principles and can be used independently or in combination with other components.

## Architecture Principles

### SOLID Principles Implementation

#### 1. Single Responsibility Principle (SRP)

- **InvestmentDetailPage**: Only orchestrates the detail page layout
- **InvestmentHeroSection**: Only displays hero content (image, title, amount, metrics)
- **InvestmentReturnsSection**: Only displays returns information
- **InvestmentFeaturesSection**: Only displays feature list
- **InvestmentActionSection**: Only handles action buttons and CTAs
- **InvestmentPageHeader**: Only handles page navigation and header actions

#### 2. Open/Closed Principle (OCP)

- Components are open for extension through props and composition
- New features can be added without modifying existing components
- Custom features can be passed as props to override defaults

#### 3. Liskov Substitution Principle (LSP)

- Any component implementing the interface can replace another
- All components maintain consistent contracts
- Props interfaces are well-defined and stable

#### 4. Interface Segregation Principle (ISP)

- Clean, focused interfaces with only necessary properties
- No forced dependencies on unused methods
- Optional props for enhanced functionality

#### 5. Dependency Inversion Principle (DIP)

- Components depend on abstractions (props) not concrete implementations
- Business logic is separated from presentation logic
- Event handlers are injected as props

## Component Structure

### Main Components

#### InvestmentDetailPage (Main Orchestrator)

```typescript
interface InvestmentDetailPageProps {
  investment: InvestmentData
  onInvest?: (investmentId: string, amount?: number) => void
  className?: string
}
```

**Responsibilities:**

- Orchestrates the entire detail page layout
- Manages state for custom amount functionality
- Handles event delegation to child components
- Provides data transformation utilities

#### InvestmentPageHeader

```typescript
interface InvestmentPageHeaderProps {
  title?: string
  isAvailable?: boolean
  onBack?: () => void
  onShare?: () => void
  onFavorite?: () => void
  onMore?: () => void
  className?: string
  variant?: 'default' | 'minimal'
}
```

**Responsibilities:**

- Navigation (back button)
- Status indicators (availability)
- Action buttons (share, favorite, more)
- Responsive header layout

#### InvestmentHeroSection

```typescript
interface InvestmentHeroSectionProps {
  investment: InvestmentData
  currentAmount: number
  isCustomAmount: boolean
  customAmountComponent?: React.ReactNode
  formatCurrency: (amount: number) => string
  className?: string
}
```

**Responsibilities:**

- Large investment image display
- Title and description
- Investment amount display (custom or fixed)
- Key metrics overview
- Responsive layout

#### InvestmentReturnsSection

```typescript
interface InvestmentReturnsSectionProps {
  returns: InvestmentReturns
  className?: string
  variant?: 'default' | 'compact'
}
```

**Responsibilities:**

- Returns visualization (3-year, yearly, monthly)
- Interactive charts (future enhancement)
- Performance metrics display
- Multiple layout variants

#### InvestmentFeaturesSection

```typescript
interface InvestmentFeaturesSectionProps {
  features?: Feature[]
  className?: string
  title?: string
  variant?: 'default' | 'minimal'
}
```

**Responsibilities:**

- Feature list display
- Customizable feature set
- Icon and color management
- Responsive grid layout

#### InvestmentActionSection

```typescript
interface InvestmentActionSectionProps {
  onInvest: () => void
  onGetHelp?: () => void
  onFavorite?: () => void
  onShare?: () => void
  isAvailable: boolean
  isCustomAmount: boolean
  className?: string
  variant?: 'default' | 'minimal'
  title?: string
  description?: string
}
```

**Responsibilities:**

- Primary action buttons
- Secondary actions (help, favorite, share)
- CTA messaging
- Availability state management

## Reusability Features

### 1. Variant System

Each component supports multiple variants for different use cases:

- **default**: Full-featured version with all options
- **minimal**: Simplified version with essential features only
- **compact**: Space-efficient version for smaller layouts

### 2. Composition over Inheritance

Components are designed to be composed together:

```typescript
// Custom layout example
<InvestmentPageHeader variant="minimal" />
<InvestmentHeroSection {...props} />
<InvestmentReturnsSection variant="compact" />
<InvestmentActionSection variant="minimal" />
```

### 3. Flexible Props

All components accept optional props for customization:

- **className**: Custom styling
- **variant**: Layout variants
- **onEvent**: Custom event handlers
- **customComponent**: Replace default components

### 4. Default Fallbacks

Components provide sensible defaults:

- Default feature lists
- Default styling
- Default behavior
- Default icons and colors

## Usage Examples

### Basic Usage

```typescript
<InvestmentDetailPage investment={investmentData} onInvest={handleInvest} />
```

### Custom Layout

```typescript
<div className="custom-layout">
  <InvestmentPageHeader variant="minimal" onShare={customShareHandler} />
  <InvestmentHeroSection
    investment={investment}
    customAmountComponent={<CustomAmountSelector />}
  />
  <InvestmentReturnsSection variant="compact" />
  <InvestmentFeaturesSection
    features={customFeatures}
    title="Custom Features"
  />
  <InvestmentActionSection variant="minimal" onInvest={customInvestHandler} />
</div>
```

### Mobile-Optimized

```typescript
<InvestmentDetailPage
  investment={investment}
  onInvest={handleInvest}
  className="mobile-optimized"
/>
```

### With Custom Features

```typescript
const customFeatures = [
  {
    icon: CustomIcon,
    title: "Custom Feature",
    description: "Custom description",
    color: "blue"
  }
]

<InvestmentFeaturesSection
  features={customFeatures}
  variant="minimal"
/>
```

## Performance Optimizations

### 1. Memoization

- All expensive calculations are memoized with `useMemo`
- Event handlers are memoized with `useCallback`
- Component renders are optimized to prevent unnecessary re-renders

### 2. Lazy Loading

- Images are loaded with Next.js Image component
- Components can be lazy-loaded when needed
- Dynamic imports for heavy components

### 3. Code Splitting

- Each component is in its own file
- Tree-shaking friendly exports
- Minimal bundle impact

## Accessibility Features

### 1. Semantic HTML

- Proper heading hierarchy
- Meaningful button labels
- Descriptive alt text for images

### 2. Keyboard Navigation

- Tab order management
- Keyboard shortcuts
- Focus indicators

### 3. Screen Reader Support

- ARIA labels and descriptions
- Role attributes
- Live regions for dynamic content

### 4. Color Contrast

- WCAG compliant color schemes
- High contrast mode support
- Color-blind friendly design

## Responsive Design

### Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large: 1440px - 1919px
- XL: 1920px+

### Layout Adaptations

- Stack layout on mobile
- Side-by-side on desktop
- Adaptive spacing and typography
- Touch-friendly interactions

## Testing Strategy

### 1. Unit Tests

- Component behavior testing
- Props validation
- Event handling verification

### 2. Integration Tests

- Component composition testing
- Data flow verification
- User interaction testing

### 3. Visual Regression Tests

- Layout consistency
- Responsive behavior
- Cross-browser compatibility

## Future Enhancements

### 1. Advanced Features

- Interactive charts for returns
- Real-time data updates
- Advanced filtering and sorting
- Comparison tools

### 2. Performance Improvements

- Virtual scrolling for large lists
- Image optimization
- Caching strategies
- Progressive loading

### 3. Accessibility Enhancements

- Voice navigation
- High contrast themes
- Reduced motion support
- Customizable font sizes

## Best Practices

1. **Always use TypeScript**: Provides type safety and better developer experience
2. **Follow naming conventions**: Consistent and descriptive component names
3. **Document props**: Clear prop documentation with examples
4. **Test thoroughly**: Unit, integration, and visual regression tests
5. **Optimize performance**: Use memoization and lazy loading
6. **Ensure accessibility**: Follow WCAG guidelines
7. **Design responsively**: Mobile-first approach
8. **Keep components small**: Single responsibility principle
9. **Use composition**: Prefer composition over inheritance
10. **Provide defaults**: Sensible defaults for better DX
