'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  Bot,
  Leaf,
} from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/field-mapping', label: 'Field Mapping', icon: <Map /> },
  { href: '/tasks', label: 'Tasks', icon: <CalendarCheck /> },
  { href: '/assistant', label: 'Assistant', icon: <Bot /> },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 rounded-lg bg-primary">
              <Leaf className="text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">GrowMate</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">Collapse</span>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
