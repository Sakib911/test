# Component Index

Complete reference of all available components in the design system. Use this index to find existing components before creating new ones.

## 🎨 UI Components (`/components/ui/`)

### Layout & Structure

| Component   | File               | Purpose                                | Variants             | Props                        |
| ----------- | ------------------ | -------------------------------------- | -------------------- | ---------------------------- |
| Card        | `card.tsx`         | Container with header, content, footer | default, outlined    | title, description, children |
| Container   | `container.tsx`    | Responsive container wrapper           | default, fluid       | maxWidth, padding            |
| Separator   | `separator.tsx`    | Visual divider                         | horizontal, vertical | orientation, className       |
| AspectRatio | `aspect-ratio.tsx` | Maintain aspect ratio                  | -                    | ratio, children              |

### Navigation

| Component      | File                  | Purpose                | Variants       | Props                          |
| -------------- | --------------------- | ---------------------- | -------------- | ------------------------------ |
| Tabs           | `tabs.tsx`            | Tab navigation         | default, pills | value, onValueChange, children |
| Breadcrumb     | `breadcrumb.tsx`      | Navigation breadcrumbs | default        | items, separator               |
| NavigationMenu | `navigation-menu.tsx` | Main navigation        | default        | items, orientation             |
| Menubar        | `menubar.tsx`         | Menu bar navigation    | default        | items, trigger                 |

### Forms & Inputs

| Component  | File              | Purpose                      | Variants                                              | Props                                |
| ---------- | ----------------- | ---------------------------- | ----------------------------------------------------- | ------------------------------------ |
| Button     | `button.tsx`      | Interactive button           | default, secondary, outline, ghost, link, destructive | variant, size, disabled, onClick     |
| Input      | `input.tsx`       | Text input field             | default, error                                        | type, placeholder, value, onChange   |
| Textarea   | `textarea.tsx`    | Multi-line text input        | default, error                                        | placeholder, value, onChange, rows   |
| Select     | `select.tsx`      | Dropdown selection           | default                                               | value, onValueChange, placeholder    |
| Checkbox   | `checkbox.tsx`    | Checkbox input               | default, error                                        | checked, onCheckedChange, disabled   |
| RadioGroup | `radio-group.tsx` | Radio button group           | default                                               | value, onValueChange, orientation    |
| Switch     | `switch.tsx`      | Toggle switch                | default                                               | checked, onCheckedChange, disabled   |
| Slider     | `slider.tsx`      | Range slider                 | default                                               | value, onValueChange, min, max, step |
| Label      | `label.tsx`       | Form label                   | default                                               | htmlFor, children                    |
| Form       | `form.tsx`        | Form wrapper with validation | default                                               | onSubmit, children                   |

### Data Display

| Component | File           | Purpose             | Variants                                 | Props                    |
| --------- | -------------- | ------------------- | ---------------------------------------- | ------------------------ |
| Table     | `table.tsx`    | Data table          | default                                  | children                 |
| Badge     | `badge.tsx`    | Status indicator    | default, secondary, outline, destructive | variant, children        |
| Avatar    | `avatar.tsx`   | User profile image  | default                                  | src, alt, fallback, size |
| Progress  | `progress.tsx` | Progress indicator  | default                                  | value, max, className    |
| Skeleton  | `skeleton.tsx` | Loading placeholder | default                                  | className, children      |

### Feedback

| Component   | File               | Purpose            | Variants                          | Props                                  |
| ----------- | ------------------ | ------------------ | --------------------------------- | -------------------------------------- |
| Alert       | `alert.tsx`        | Alert message      | default, destructive              | variant, title, description            |
| AlertDialog | `alert-dialog.tsx` | Modal confirmation | default                           | open, onOpenChange, title, description |
| Dialog      | `dialog.tsx`       | Modal dialog       | default                           | open, onOpenChange, title, children    |
| Sheet       | `sheet.tsx`        | Slide-out panel    | default, left, right, top, bottom | open, onOpenChange, side               |
| Drawer      | `drawer.tsx`       | Mobile drawer      | default                           | open, onOpenChange, children           |
| Tooltip     | `tooltip.tsx`      | Hover tooltip      | default                           | content, children                      |
| HoverCard   | `hover-card.tsx`   | Hover card         | default                           | content, children                      |

### Overlays & Popups

| Component    | File                | Purpose         | Variants | Props                        |
| ------------ | ------------------- | --------------- | -------- | ---------------------------- |
| Popover      | `popover.tsx`       | Popup content   | default  | open, onOpenChange, children |
| DropdownMenu | `dropdown-menu.tsx` | Dropdown menu   | default  | children                     |
| Command      | `command.tsx`       | Command palette | default  | placeholder, children        |
| Calendar     | `calendar.tsx`      | Date picker     | default  | mode, selected, onSelect     |

### Interactive

| Component   | File              | Purpose             | Variants                  | Props                        |
| ----------- | ----------------- | ------------------- | ------------------------- | ---------------------------- |
| Accordion   | `accordion.tsx`   | Collapsible content | default, single, multiple | type, value, onValueChange   |
| Collapsible | `collapsible.tsx` | Collapsible section | default                   | open, onOpenChange, children |
| Toggle      | `toggle.tsx`      | Toggle button       | default, outline          | pressed, onPressedChange     |
| Resizable   | `resizable.tsx`   | Resizable panels    | default                   | children                     |

### Utility

| Component  | File              | Purpose                | Variants | Props                                 |
| ---------- | ----------------- | ---------------------- | -------- | ------------------------------------- |
| ScrollArea | `scroll-area.tsx` | Custom scrollbar       | default  | children, className                   |
| Carousel   | `carousel.tsx`    | Image/content carousel | default  | children, orientation                 |
| Pagination | `pagination.tsx`  | Page navigation        | default  | currentPage, totalPages, onPageChange |
| InputOTP   | `input-otp.tsx`   | OTP input              | default  | value, onChange, maxLength            |

## 📝 Form Components (`/components/form/`)

### Form Fields

| Component               | File                             | Purpose                       | Props                                            |
| ----------------------- | -------------------------------- | ----------------------------- | ------------------------------------------------ |
| InputField              | `input-field.tsx`                | Text input with validation    | name, label, type, required, placeholder         |
| PasswordField           | `password-field.tsx`             | Password input with toggle    | name, label, required, placeholder               |
| EmailField              | `email-field.tsx`                | Email input with validation   | name, label, required, placeholder               |
| NumberField             | `number-field.tsx`               | Number input with validation  | name, label, required, min, max, step            |
| PhoneField              | `phone-field.tsx`                | Phone input with country code | name, label, required, placeholder               |
| PhoneCountryField       | `phone-country-field.tsx`        | Phone with country selector   | name, label, required                            |
| TextareaField           | `textarea-field.tsx`             | Multi-line text input         | name, label, required, rows, placeholder         |
| SelectField             | `select-field.tsx`               | Dropdown selection            | name, label, required, options, placeholder      |
| MultiSelectField        | `multi-select-field.tsx`         | Multiple selection            | name, label, required, options, placeholder      |
| CheckboxField           | `checkbox-field.tsx`             | Checkbox input                | name, label, required, description               |
| RadioGroupField         | `radio-group-field.tsx`          | Radio button group            | name, label, required, options                   |
| SwitchField             | `switch-field.tsx`               | Toggle switch                 | name, label, required, description               |
| DateField               | `date-field.tsx`                 | Date picker                   | name, label, required, placeholder               |
| DateRangeField          | `date-range-field.tsx`           | Date range picker             | name, label, required                            |
| CurrencyField           | `currency-field.tsx`             | Currency input                | name, label, required, currency, placeholder     |
| ColorField              | `color-field.tsx`                | Color picker                  | name, label, required, placeholder               |
| FileUploadField         | `file-upload-field.tsx`          | File upload                   | name, label, required, accept, multiple          |
| EnhancedFileUploadField | `enhanced-file-upload-field.tsx` | Advanced file upload          | name, label, required, accept, multiple, maxSize |

### Form Management

| Component         | File                                    | Purpose                | Props                                   |
| ----------------- | --------------------------------------- | ---------------------- | --------------------------------------- |
| BaseFormComponent | `form-management/BaseFormComponent.tsx` | Dynamic form generator | schema, fields, onSubmit, actionButtons |
| FormFieldRenderer | `form-management/FormFieldRenderer.tsx` | Field renderer         | field, form, errors                     |
| FormValidation    | `form-management/FormValidation.tsx`    | Validation handler     | schema, data                            |
| FormStateManager  | `form-management/FormStateManager.tsx`  | State management       | initialData, onSubmit                   |

## 📊 Data Components (`/components/data-table/`)

| Component           | File                        | Purpose                    | Props                                               |
| ------------------- | --------------------------- | -------------------------- | --------------------------------------------------- |
| DataTable           | `data-table.tsx`            | Main data table            | columns, data, isLoading, searchKey, showPagination |
| ExpandableDataTable | `expandable-data-table.tsx` | Table with expandable rows | columns, data, renderExpandedContent                |
| DataTableSkeleton   | `data-table-skeleton.tsx`   | Loading skeleton           | columns, rows                                       |
| ActionFilters       | `action-filters.tsx`        | Table action filters       | filters, onFilterChange                             |

## 🎨 Layout Components (`/components/layout/`)

| Component          | File                            | Purpose               | Props                         |
| ------------------ | ------------------------------- | --------------------- | ----------------------------- |
| DashboardLayout    | `dashboard/DashboardLayout.tsx` | Main dashboard layout | children, title, actions      |
| SideBar            | `SideBar.tsx`                   | Main sidebar          | isOpen, onToggle, children    |
| SidebarContent     | `SidebarContent.tsx`            | Sidebar content       | items, user, onItemClick      |
| DashboardHeader    | `DashboardHeader.tsx`           | Dashboard header      | title, user, notifications    |
| MobileSidebar      | `MobileSidebar.tsx`             | Mobile sidebar        | isOpen, onClose, children     |
| LanguageSwitcher   | `LanguageSwitcher.tsx`          | Language selection    | currentLocale, onLocaleChange |
| NotificationButton | `NotificationButton.tsx`        | Notification bell     | count, onClick                |

## 🔧 Shared Components (`/components/share/`)

| Component         | File                    | Purpose                  | Props                               |
| ----------------- | ----------------------- | ------------------------ | ----------------------------------- |
| Container         | `Container.tsx`         | Page container           | children, className, maxWidth       |
| FullContainer     | `FullContainer.tsx`     | Full-width container     | children, className                 |
| Logo              | `Logo.tsx`              | Application logo         | size, variant, className            |
| Footer            | `Footer.tsx`            | Page footer              | links, copyright, className         |
| GlobalLoading     | `GlobalLoading.tsx`     | Global loading indicator | isLoading, message                  |
| TabSystem         | `TabSystem.tsx`         | Tab navigation system    | tabs, activeTab, onTabChange        |
| DocumentViewer    | `DocumentViewer.tsx`    | Document display         | url, type, className                |
| FileUploadSection | `FileUploadSection.tsx` | File upload area         | onUpload, accept, multiple, maxSize |
| ImageComponent    | `ImageComponent.tsx`    | Optimized image          | src, alt, width, height, className  |
| CityImage         | `CityImage.tsx`         | City placeholder image   | city, className                     |
| CommonSkeletons   | `CommonSkeletons.tsx`   | Common loading skeletons | type, count                         |

## 🎯 Feature Components

### Investment (`/components/investment/`)

| Component             | File                        | Purpose                     | Props                            |
| --------------------- | --------------------------- | --------------------------- | -------------------------------- |
| InvestmentCard        | `InvestmentCard.tsx`        | Investment opportunity card | investment, onInvest, className  |
| InvestmentGrid        | `InvestmentGrid.tsx`        | Grid of investment cards    | investments, onInvest, className |
| InvestmentCardExample | `InvestmentCardExample.tsx` | Example investment card     | -                                |
| ApproximateReturnCard | `ApproximateReturnCard.tsx` | Return calculation card     | amount, returns, className       |
| CustomAmountInput     | `CustomAmountInput.tsx`     | Custom amount input         | value, onChange, min, max, step  |
| TreasuryCard          | `TreasuryCard.tsx`          | Treasury investment card    | treasury, onInvest, className    |

### Wallet (`/components/wallet/`)

| Component       | File                  | Purpose             | Props                            |
| --------------- | --------------------- | ------------------- | -------------------------------- |
| WalletCard      | `WalletCard.tsx`      | Wallet balance card | wallet, onAction, className      |
| TransactionList | `TransactionList.tsx` | Transaction history | transactions, onTransactionClick |

### Auth (`/components/auth/`)

| Component          | File                     | Purpose                 | Props                      |
| ------------------ | ------------------------ | ----------------------- | -------------------------- |
| LoginForm          | `LoginForm.tsx`          | User login form         | onSubmit, isLoading, error |
| RegisterForm       | `RegisterForm.tsx`       | User registration form  | onSubmit, isLoading, error |
| ForgotPasswordForm | `ForgotPasswordForm.tsx` | Password reset form     | onSubmit, isLoading, error |
| ResetPasswordForm  | `ResetPasswordForm.tsx`  | Password reset form     | onSubmit, isLoading, error |
| AuthGuard          | `AuthGuard.tsx`          | Authentication guard    | children, fallback         |
| ProtectedRoute     | `ProtectedRoute.tsx`     | Protected route wrapper | children, requiredRole     |

## 🔍 How to Use This Index

### Finding Components

1. **Check the category** that matches your need
2. **Look at the Purpose column** to find the right component
3. **Check the Props column** to understand the interface
4. **Review the file path** to import the component

### Before Creating New Components

1. **Search this index** for existing components
2. **Check the UI components** first (most common)
3. **Look at form components** for input fields
4. **Check shared components** for common patterns
5. **Only create new components** if none exist

### Component Usage Examples

```typescript
// Import from UI components
import { Button, Card, Input } from '@/components/ui';

// Import from form components
import { InputField, SelectField } from '@/components/form';

// Import from data components
import { DataTable } from '@/components/data-table';

// Import from layout components
import { DashboardLayout } from '@/components/layout';

// Import from shared components
import { Container, Logo } from '@/components/share';
```

## 📋 Component Creation Checklist

Before creating a new component, verify:

- [ ] No existing UI component meets the need
- [ ] No form component provides the functionality
- [ ] No shared component can be extended
- [ ] No feature component exists for this purpose
- [ ] The component follows SOLID principles
- [ ] The component uses proper TypeScript types
- [ ] The component is accessible (A11y compliant)
- [ ] The component is responsive
- [ ] The component follows the design system
- [ ] The component is documented

## 🔄 Updating This Index

When adding new components:

1. **Add the component** to the appropriate category
2. **Include all required information** (File, Purpose, Variants, Props)
3. **Update the usage examples** if needed
4. **Test the component** before adding to index
5. **Update the documentation** for the component

---

**Last Updated:** 2024-12-19  
**Total Components:** 100+  
**Categories:** 8  
**Maintainer:** Development Team
