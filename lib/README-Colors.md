# Centralized Color Management System

This document explains how to use the centralized color management system in the frontend application.

## Overview

All colors in the application are now centralized in `/lib/Colors.ts`. This provides:

- **Consistency**: All colors are defined in one place
- **Easy Management**: Change colors globally from a single file
- **Type Safety**: TypeScript support for all color values
- **Organization**: Colors are categorized by usage

## Usage

### Basic Import

```typescript
import { Colors } from '@/lib/Colors'

// Use specific color
const primaryColor = Colors.primary.DEFAULT
const textColor = Colors.text.primary
```

### Import Specific Categories

```typescript
import { primary, text, background } from '@/lib/Colors'

// Use colors from specific categories
const brandColor = primary.DEFAULT
const mainText = text.primary
const bgColor = background.DEFAULT
```

## Color Categories

### Primary Brand Colors

- `Colors.primary.DEFAULT` - Main brand color (#44ade2)
- `Colors.primary.disabled` - Disabled state
- `Colors.primary.foreground` - Text on primary background
- `Colors.primary.fade` - Faded primary color

### Secondary Colors

- `Colors.secondary.DEFAULT` - Secondary brand color
- `Colors.secondary.foreground` - Text on secondary background

### Background Colors

- `Colors.background.DEFAULT` - Main background
- `Colors.background.card` - Card backgrounds
- `Colors.background.sand` - Sand colored backgrounds
- `Colors.background.accent` - Accent backgrounds

### Text Colors

- `Colors.text.primary` - Primary text color
- `Colors.text.secondary` - Secondary text color
- `Colors.text.muted` - Muted text color

### State Colors

- `Colors.success.DEFAULT` - Success state
- `Colors.error.DEFAULT` - Error state

### Border Colors

- `Colors.border.DEFAULT` - Default border color
- `Colors.border.input` - Input field borders

## Site Configuration Integration

The color system integrates with the site configuration system:

```typescript
// Fallback colors for site config
const cssVariables = {
  '--primary':
    siteConfig.theme?.primaryColor || Colors.siteConfig.theme.primaryColor,
  // ... other variables
}
```

## Color Picker Integration

The color picker component uses predefined color palettes:

```typescript
// Color picker palettes
const colorPalette = [
  ...Colors.colorPicker.grayscale,
  ...Colors.colorPicker.brand,
  ...Colors.colorPicker.extended,
  ...Colors.colorPicker.dark,
]
```

## Helper Functions

### CSS Variables

```typescript
import { getCSSVar, createCSSVars } from '@/lib/Colors'

// Get CSS variable
const primaryVar = getCSSVar('primary') // returns 'var(--primary)'

// Create CSS variables object
const cssVars = createCSSVars({
  primary: '#44ade2',
  secondary: '#64748b',
})
// Returns: { '--primary': '#44ade2', '--secondary': '#64748b' }
```

## Best Practices

1. **Always use Colors.ts**: Never hardcode color values in components
2. **Use appropriate categories**: Choose colors from the right category (text, background, etc.)
3. **Consistent naming**: Follow the established naming conventions
4. **Update centrally**: When adding new colors, add them to Colors.ts first
5. **CSS Variables**: Use CSS variables for dynamic theming when needed

## Examples

### Component Usage

```typescript
import { Colors } from '@/lib/Colors'

const MyComponent = () => {
  return (
    <div
      style={{
        backgroundColor: Colors.background.card,
        color: Colors.text.primary,
        borderColor: Colors.border.DEFAULT
      }}
    >
      <button
        style={{
          backgroundColor: Colors.primary.DEFAULT,
          color: Colors.primary.foreground
        }}
      >
        Click me
      </button>
    </div>
  )
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import { Colors } from './lib/Colors'

export default {
  theme: {
    extend: {
      colors: {
        primary: Colors.primary.DEFAULT,
        secondary: Colors.secondary.DEFAULT,
        // ... other colors
      },
    },
  },
}
```

## Migration Notes

- All hardcoded color values have been replaced with references to Colors.ts
- CSS variables in globals.css are organized and documented
- Site configuration fallbacks now use centralized colors
- Color picker components use predefined palettes from Colors.ts

This system makes color management much easier and ensures consistency across the entire application.
