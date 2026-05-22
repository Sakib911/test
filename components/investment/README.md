# InvestmentCard Component

A reusable, SOLID-principle-compliant investment card component designed for modern financial applications.

## Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Accessibility**: Built with proper ARIA labels and keyboard navigation support
- **TypeScript**: Fully typed with comprehensive interfaces
- **SOLID Principles**: Follows all five SOLID principles for maintainable code
- **Customizable**: Multiple variants and extensive styling options
- **Performance**: Optimized with Next.js Image component and efficient re-renders

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

- **InvestmentCard**: Only responsible for displaying investment information
- **InvestmentData interface**: Only defines data structure
- **Helper functions**: Each has a single, well-defined purpose

### 2. Open/Closed Principle (OCP)

- Component is open for extension (new variants, props) but closed for modification
- New investment types can be added without changing existing code
- Styling can be extended through className prop

### 3. Liskov Substitution Principle (LSP)

- Any component implementing `InvestmentCardProps` can replace InvestmentCard
- Interface contracts are maintained across all implementations

### 4. Interface Segregation Principle (ISP)

- Clean, focused interfaces with only necessary properties
- No forced dependencies on unused methods or properties

### 5. Dependency Inversion Principle (DIP)

- Depends on abstractions (props interfaces) not concrete implementations
- Business logic is separated from presentation logic

## Usage

### Basic Usage

```tsx
import InvestmentCard from '@/components/investment/InvestmentCard'
import { InvestmentData } from '@/types/investment'

const investment: InvestmentData = {
  id: 'treasury-001',
  title: 'Treasury',
  imageUrl: '/path/to/image.jpg',
  investmentAmount: 50000,
  metrics: {
    contractDuration: '3Y contract',
    roi: '3-5% ROI',
    onboardingTime: '60s Onboarding',
  },
  returns: {
    threeYearTotal: '108%-180%',
    yearlyTotal: '36%-60%',
    monthlyTotal: '3-5%',
  },
}

function MyComponent() {
  const handleInvest = (investmentId: string) => {
    // Handle investment logic
  }

  return <InvestmentCard investment={investment} onInvest={handleInvest} />
}
```

### With Custom Styling

```tsx
<InvestmentCard
  investment={investment}
  onInvest={handleInvest}
  className="custom-card-class"
  variant="compact"
/>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {investments.map((investment) => (
    <InvestmentCard
      key={investment.id}
      investment={investment}
      onInvest={handleInvest}
    />
  ))}
</div>
```

## Props

| Prop         | Type                     | Required | Default     | Description                            |
| ------------ | ------------------------ | -------- | ----------- | -------------------------------------- |
| `investment` | `InvestmentData`         | Yes      | -           | Investment data object                 |
| `onInvest`   | `(id: string) => void`   | No       | -           | Callback when invest button is clicked |
| `className`  | `string`                 | No       | -           | Additional CSS classes                 |
| `variant`    | `'default' \| 'compact'` | No       | `'default'` | Card size variant                      |

## InvestmentData Interface

```typescript
interface InvestmentData {
  id: string
  title: string
  imageUrl: string
  investmentAmount: number
  metrics: InvestmentMetrics
  returns: InvestmentReturns
  isAvailable?: boolean
  description?: string
}
```

## Styling

The component uses Tailwind CSS and follows the design system established in the project. Key styling features:

- **Hover Effects**: Subtle scale and shadow transitions
- **Responsive Images**: Optimized with Next.js Image component
- **Color Scheme**: Consistent with financial application standards
- **Typography**: Clear hierarchy with proper font weights and sizes
- **Spacing**: Consistent padding and margins using Tailwind utilities

## Accessibility

- Proper semantic HTML structure
- Alt text for images
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus indicators

## Performance Considerations

- Uses Next.js Image component for optimized image loading
- Memoization-ready (can be wrapped with React.memo if needed)
- Efficient re-renders with proper prop structure
- Lazy loading support through Next.js Image

## Examples

See `InvestmentCardExample.tsx` for comprehensive usage examples including:

- Basic card implementation
- Grid layouts
- Compact variants
- Event handling
- Custom styling

## Contributing

When extending this component:

1. Maintain SOLID principles
2. Add proper TypeScript types
3. Update this documentation
4. Test across different screen sizes
5. Ensure accessibility compliance
6. Follow the established design system
