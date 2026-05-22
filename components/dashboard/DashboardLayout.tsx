'use client'

import { DashboardHeader } from '../layout/DashboardHeader'
import { Sidebar, SidebarProvider, SidebarInset } from '../ui/sidebar'
import { SidebarContent } from '../layout/SidebarContent'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent />
        </Sidebar>
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
