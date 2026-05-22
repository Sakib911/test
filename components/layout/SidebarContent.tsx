'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  SidebarHeader,
  SidebarContent as SidebarContentWrapper,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  ChevronDown,
  Package,
  ShoppingCart,
  Settings,
  Wallet,
  Star,
  HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';

import { LogoMinerix } from '@/icons/icons';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: SidebarItem[];
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Investment Model',
    href: '/investment',
    icon: BarChart3,
  },
  {
    title: 'Wallet',
    href: '/wallet',
    icon: Wallet,
  },
  {
    title: 'Portfolio',
    href: '/portfolio',
    icon: Package,
  },
  {
    title: 'Rewards',
    href: '/rewards',
    icon: Star,
  },
  {
    title: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function SidebarContent() {
  const { hasRole } = useAuth();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Filter sidebar items based on user role
  const filteredSidebarItems = sidebarItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.some(role => hasRole(role));
  });

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="bg-white min-h-full">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-4">
          <Link href="/">
            <LogoMinerix className="h-[30px]" />
          </Link>
          <LanguageSwitcher variant="sidebar" />
        </div>
      </SidebarHeader>

      <SidebarContentWrapper className=" h-full">
        <SidebarGroup className=" h-1/2">
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSidebarItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        variant="outline"
                        onClick={() => toggleExpanded(item.title)}
                        className="w-full justify-between  text-black dark:text-white hover:text-white"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span className="text-base font-medium">
                            {item.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedItems.has(item.title) ? 'rotate-180' : ''
                          }`}
                        />
                      </SidebarMenuButton>
                      {expandedItems.has(item.title) && (
                        <SidebarMenuSub>
                          {item.children.map(child => (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === child.href}
                              >
                                <Link href={child.href}>
                                  <child.icon className="w-4 h-4" />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      variant="outline"
                      isActive={pathname?.includes(item?.href)}
                      size="lg"
                      className="  data-[active=true]:bg-green-600 data-[active=true]:text-white"
                    >
                      <Link href={item.href}>
                        <item.icon className="w-5 h-5" />
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
                        {item.badge && (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help & Support Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <Link href="/help">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-base font-medium">
                      Help & Support
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContentWrapper>
    </div>
  );
}
