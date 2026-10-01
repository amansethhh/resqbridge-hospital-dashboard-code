import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [realtimeState] = useState('LIVE');

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className={cn('flex min-h-screen flex-col transition-all duration-300', collapsed ? 'lg:pl-[76px]' : 'lg:pl-64')}>
        <TopBar onOpenMobileNav={() => setMobileOpen(true)} realtimeState={realtimeState} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}