'use client';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

// UI Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Form Components
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent';
import type { FieldDefinition } from '@/components/form/form-management/types';

// Data Table
import { DataTable } from '@/components/data-table/data-table';
import type { ColumnDef } from '@tanstack/react-table';

// Icons
import {
  AlertCircle,
  Bell,
  Settings,
  User,
  Download,
  Edit,
  Trash2,
  Eye,
  Globe,
  Star,
  Zap,
} from 'lucide-react';

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguageSwitcher } from '@/hooks/use-language-switcher';

// React Query Hooks
import {
  useUsers,
  useProducts,
  useDeleteUser,
  useOptimisticToggleUserStatus,
  type User as ApiUser,
  type Product as ApiProduct,
} from '@/hooks/useApiQueries';

export default function DesignSystemPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const { currentLocale, switchLanguage } = useLanguageSwitcher();

  // Language options with flags and names
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLanguage =
    languages.find(lang => lang.code === currentLocale) || languages[0];
  const [progress, setProgress] = useState(33);

  // React Query hooks for real data
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  // Mutation hooks for user management
  const deleteUserMutation = useDeleteUser();
  const toggleStatusMutation = useOptimisticToggleUserStatus();

  // Table Columns for Users
  const userColumns: ColumnDef<ApiUser>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge
          variant={row.original.role === 'Admin' ? 'default' : 'secondary'}
        >
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === 'active'
              ? 'default'
              : row.original.status === 'inactive'
                ? 'destructive'
                : 'secondary'
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'joinedAt',
      header: 'Joined',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast.info('View functionality', {
                description: `Viewing user: ${row.original.name}`,
              });
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toggleStatusMutation.mutate({
                id: row.original.id,
                status:
                  row.original.status === 'active' ? 'inactive' : 'active',
              });
            }}
            disabled={toggleStatusMutation.isPending}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (
                confirm(`Are you sure you want to delete ${row.original.name}?`)
              ) {
                deleteUserMutation.mutate(row.original.id);
              }
            }}
            disabled={deleteUserMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Table Columns for Products
  const productColumns: ColumnDef<ApiProduct>[] = [
    {
      accessorKey: 'name',
      header: 'Product Name',
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <span className="font-medium">${row.original.price}</span>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => (
        <span
          className={
            row.original.stock < 20 ? 'text-red-600' : 'text-green-600'
          }
        >
          {row.original.stock}
        </span>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => (
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{row.original.rating}</span>
        </div>
      ),
    },
  ];

  // Form Schema for examples
  const basicFormSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    category: z.string().min(1, 'Please select a category'),
    newsletter: z.boolean().optional(),
    priority: z.string().optional(),
  });

  const basicFormFields: FieldDefinition[] = [
    {
      name: 'firstName',
      label: 'firstName',
      type: 'input',
      placeholder: 'firstName',
      required: true,
      className: 'col-span-6',
    },
    {
      name: 'lastName',
      label: 'lastName',
      type: 'input',
      placeholder: 'lastName',
      required: true,
      className: 'col-span-6',
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'email',
      required: true,
      className: 'col-span-12',
    },
    {
      name: 'phone',
      label: 'phone',
      type: 'phone-country',
      placeholder: 'phone',
      required: true,
      className: 'col-span-12',
    },
    {
      name: 'category',
      label: 'category',
      type: 'select',
      placeholder: 'selectOption',
      required: true,
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Technical Support', value: 'technical' },
        { label: 'Sales', value: 'sales' },
        { label: 'Billing', value: 'billing' },
      ],
      className: 'col-span-6',
    },
    {
      name: 'priority',
      label: 'priority',
      type: 'radio-group',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
      className: 'col-span-6',
    },
    {
      name: 'message',
      label: 'description',
      type: 'textarea',
      placeholder: 'description',
      required: true,
      rows: 4,
      className: 'col-span-12',
    },
    {
      name: 'newsletter',
      label: 'newsletter',
      type: 'checkbox',
      className: 'col-span-12',
    },
  ];

  const handleFormSubmit = (data: z.infer<typeof basicFormSchema>) => {
    console.log('Form submitted:', data);
  };

  const buttonVariants = [
    { variant: 'default', label: 'Default' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'outline', label: 'Outline' },
    { variant: 'ghost', label: 'Ghost' },
    { variant: 'link', label: 'Link' },
    { variant: 'destructive', label: 'Destructive' },
  ] as const;

  const buttonSizes = [
    { size: 'sm' as const, label: 'Small' },
    { size: 'default' as const, label: 'Default' },
    { size: 'lg' as const, label: 'Large' },
    { size: 'icon' as const, label: 'Icon', isIcon: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('designSystem.title')}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {t('designSystem.subtitle')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {currentLanguage.flag}
                    </span>
                    <span className="hidden md:inline">
                      {currentLanguage.name}
                    </span>
                    <span className="md:hidden">
                      {currentLanguage.code.toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map(language => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => switchLanguage(language.code)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                      {language.code === currentLocale && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">
              {t('designSystem.overview')}
            </TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="data-tables">Data Tables</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="examples">
              {t('designSystem.examples')}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    React Query
                  </CardTitle>
                  <CardDescription>
                    Server state management with caching, synchronization, and
                    more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Status:{' '}
                      {usersLoading || productsLoading ? 'Loading...' : 'Ready'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Users:{' '}
                      {usersLoading
                        ? 'Loading...'
                        : usersError
                          ? 'Error loading'
                          : `${users?.length || 0} loaded`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Products:{' '}
                      {productsLoading
                        ? 'Loading...'
                        : productsError
                          ? 'Error loading'
                          : `${products?.length || 0} loaded`}
                    </p>
                    {(usersError || productsError) && (
                      <p className="text-sm text-red-600">
                        ⚠ Some data failed to load
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Internationalization
                  </CardTitle>
                  <CardDescription>
                    Multi-language support with next-intl
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Current locale: EN
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Available locales: EN, DE
                    </p>
                    <Button variant="outline" size="sm">
                      Switch to German
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Components
                  </CardTitle>
                  <CardDescription>50+ reusable UI components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>• Buttons</div>
                    <div>• Forms</div>
                    <div>• Data Tables</div>
                    <div>• Cards</div>
                    <div>• Modals</div>
                    <div>• Navigation</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">50+</div>
                  <p className="text-xs text-muted-foreground">UI Components</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">15+</div>
                  <p className="text-xs text-muted-foreground">Form Fields</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">TypeScript</div>
                  <p className="text-xs text-muted-foreground">Fully Typed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">Accessible</div>
                  <p className="text-xs text-muted-foreground">WCAG 2.1</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Different button styles for various use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {buttonVariants.map(({ variant, label }) => (
                    <Button key={variant} variant={variant}>
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>
                  Different button sizes for different contexts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map(({ size, label, isIcon }) => (
                    <Button key={size} size={size}>
                      {isIcon ? <Settings className="h-4 w-4" /> : label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button States</CardTitle>
                <CardDescription>Loading and disabled states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button onClick={() => setLoading(!loading)}>
                    {loading && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    )}
                    {loading ? 'Loading...' : 'Toggle Loading'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('components.forms.title')}</CardTitle>
                <CardDescription>
                  {t('components.forms.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BaseFormComponent
                  schema={basicFormSchema}
                  fields={basicFormFields}
                  onSubmit={handleFormSubmit}
                  actionButtons={{
                    submit: true,
                    text: t('common.submit'),
                    reset: true,
                    className: 'col-span-6',
                  }}
                  toastConfig={{
                    showSuccessToast: true,
                    successMessage: 'Form submitted successfully!',
                    showErrorToast: true,
                  }}
                  handleSubmitInternally={true}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="input-example">Text Input</Label>
                    <Input id="input-example" placeholder="Enter text..." />
                  </div>
                  <div>
                    <Label htmlFor="textarea-example">Textarea</Label>
                    <Textarea
                      id="textarea-example"
                      placeholder="Enter message..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="select-example">Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selection Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox-example" />
                    <Label htmlFor="checkbox-example">Checkbox option</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Radio Group</Label>
                    <RadioGroup defaultValue="option1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="radio1" />
                        <Label htmlFor="radio1">Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="radio2" />
                        <Label htmlFor="radio2">Option 2</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="switch-example" />
                    <Label htmlFor="switch-example">Switch option</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Slider</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Tables Tab */}
          <TabsContent value="data-tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('components.dataTable.title')}</CardTitle>
                <CardDescription>
                  {t('components.dataTable.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Users Table</h3>
                    <DataTable
                      columns={userColumns}
                      data={users || []}
                      isLoading={usersLoading}
                      searchKey="name"
                      searchPlaceholder="Search users..."
                      showPagination={true}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Products Table
                    </h3>
                    <DataTable
                      columns={productColumns}
                      data={products || []}
                      isLoading={productsLoading}
                      searchKey="name"
                      searchPlaceholder="Search products..."
                      showPagination={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert message.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      This is an error alert message.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress & Loading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Progress Bar</Label>
                    <Progress value={progress} className="mt-2" />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10%
                    </Button>
                  </div>

                  <div>
                    <Label>Loading Skeletons</Label>
                    <div className="space-y-2 mt-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Badges & Avatars</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Badges</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Avatars</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {t('examples.userManagement')}
                  </CardTitle>
                  <CardDescription>
                    Complete user management interface
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Features: CRUD operations, search, filtering, role
                    management
                  </p>
                  <Button className="w-full" variant="outline">
                    View Example
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    {t('examples.productCatalog')}
                  </CardTitle>
                  <CardDescription>E-commerce product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Features: Product grid, filters, search, pagination, reviews
                  </p>
                  <Button className="w-full" variant="outline">
                    View Example
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    {t('examples.analytics')}
                  </CardTitle>
                  <CardDescription>Analytics dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Features: Charts, metrics, real-time data, exports
                  </p>
                  <Button className="w-full" variant="outline">
                    View Example
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Real Usage Example */}
            <Card>
              <CardHeader>
                <CardTitle>Real-world Integration Example</CardTitle>
                <CardDescription>
                  This entire page demonstrates the integration of all
                  components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    This design system page showcases the practical integration
                    of:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <strong>React Query:</strong> Server state management for
                      data fetching
                    </li>
                    <li>
                      <strong>Next.js Internationalization:</strong>{' '}
                      Multi-language support
                    </li>
                    <li>
                      <strong>Form Management:</strong> Dynamic form generation
                      with validation
                    </li>
                    <li>
                      <strong>Data Tables:</strong> Advanced table functionality
                      with sorting and filtering
                    </li>
                    <li>
                      <strong>UI Components:</strong> Consistent design system
                      components
                    </li>
                    <li>
                      <strong>TypeScript:</strong> Type safety throughout the
                      application
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
