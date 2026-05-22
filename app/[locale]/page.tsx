'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { ThemeToggle } from '@/contexts/theme-context';
import { useLanguageSwitcher } from '@/hooks/use-language-switcher';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  Zap,
  Globe,
  Palette,
  Code,
  Database,
  Shield,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { currentLocale } = useLanguageSwitcher();
  const t = useTranslations('homepage');
  const navigate = (path: string) => {
    router.push(`/${currentLocale}${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/design-system')}
              size="lg"
              className="text-lg px-8 py-3"
            >
              {t('exploreDesignSystem')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              {t('viewDocumentation')}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-3 text-yellow-500" />
                {t('features.reactQuery.title')}
              </CardTitle>
              <CardDescription>
                {t('features.reactQuery.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('features.reactQuery.item1')}</li>
                <li>• {t('features.reactQuery.item2')}</li>
                <li>• {t('features.reactQuery.item3')}</li>
                <li>• {t('features.reactQuery.item4')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-6 w-6 mr-3 text-blue-500" />
                {t('features.internationalization.title')}
              </CardTitle>
              <CardDescription>
                {t('features.internationalization.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('features.internationalization.item1')}</li>
                <li>• {t('features.internationalization.item2')}</li>
                <li>• {t('features.internationalization.item3')}</li>
                <li>• {t('features.internationalization.item4')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-6 w-6 mr-3 text-purple-500" />
                {t('features.uiComponents.title')}
              </CardTitle>
              <CardDescription>
                {t('features.uiComponents.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('features.uiComponents.item1')}</li>
                <li>• {t('features.uiComponents.item2')}</li>
                <li>• {t('features.uiComponents.item3')}</li>
                <li>• {t('features.uiComponents.item4')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-6 w-6 mr-3 text-green-500" />
                {t('features.formManagement.title')}
              </CardTitle>
              <CardDescription>
                {t('features.formManagement.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('features.formManagement.item1')}</li>
                <li>• {t('features.formManagement.item2')}</li>
                <li>• {t('features.formManagement.item3')}</li>
                <li>• {t('features.formManagement.item4')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-6 w-6 mr-3 text-orange-500" />
                {t('features.dataTables.title')}
              </CardTitle>
              <CardDescription>
                {t('features.dataTables.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('features.dataTables.item1')}</li>
                <li>• {t('features.dataTables.item2')}</li>
                <li>• {t('features.dataTables.item3')}</li>
                <li>• {t('features.dataTables.item4')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-3 text-red-500" />
                {t('features.typescript.title')}
              </CardTitle>
              <CardDescription>
                {t('features.typescript.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('features.typescript.item1')}</li>
                <li>• {t('features.typescript.item2')}</li>
                <li>• {t('features.typescript.item3')}</li>
                <li>• {t('features.typescript.item4')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">
                {t('readyToGetStarted')}
              </CardTitle>
              <CardDescription className="text-lg">
                {t('readyToGetStartedDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate('/design-system')}
                size="lg"
                className="text-lg px-8 py-3"
              >
                {t('viewDesignSystem')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
