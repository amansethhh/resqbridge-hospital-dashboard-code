import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Siren, Inbox, Ambulance, ClipboardList, Boxes, Bell, History, BarChart3, Settings,
  ShieldCheck, Building2, Activity, ChevronLeft, X, ShieldPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import HospitalStatusBadge from '@/components/shared/HospitalStatusBadge';
import { hospital } from '@/lib/mockData';

export const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/status', label: 'Status & Readiness', icon: ShieldCheck },
  { to: '/emergencies', label: 'Emergencies', icon: Siren },
  { to: '/incoming', label: 'Incoming', icon: Inbox, badge: 3 },
  { to: '/ambulances', label: 'Ambulances', icon: Ambulance },
  { to: '/cases', label: 'Patients / Cases', icon: ClipboardList },
  { to: '/resources', label: 'Resources', icon: Boxes },
  { to: '/departments', label: 'Departments', icon: Building2 },
  { to: '/notifications', label: 'Notifications', icon: Bell, badge: 2 },
  { to: '/history', label: 'History', icon: History },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function NavList({ collapsed, onNavigate }) {
  const location = useLocation();
  return (
    <nav className="flex flex-1 flex-col gap-1 px-2">
      {navItems.map((item) => {
        const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              'group relative flex items-center rounded-xl text-sm font-medium transition-all',
              collapsed ? 'h-11 justify-center px-0' : 'h-11 gap-3 px-3',
              active ? 'glass text-foreground shadow-sm' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
            )}
            title={collapsed ? item.label : undefined}
          >
            {active && !collapsed && <span className="absolute left-0 top-1/2 h-6 -translate-y-1/2 w-1 rounded-r-full bg-gradient-to-b from-primary to-cyan-500" />}
            <item.icon className={cn('h-5 w-5 shrink-0', active && 'text-primary')} />
            {!collapsed && <span className="flex-1">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">{item.badge}</span>
            )}
            {collapsed && item.badge && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ collapsed }) {
  return (
    <Link to="/" className={cn('flex items-center gap-3 rounded-2xl px-2 py-1', collapsed && 'justify-center')}>
      <div className="icon-3d flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500">
        <ShieldPlus className="h-5 w-5 text-white" strokeWidth={2.4} />
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold tracking-tight">ResQBridge</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Hospital Dashboard</p>
        </div>
      )}
    </Link>
  );
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col gap-4 border-r border-border/60 p-3 transition-all duration-300',
        'glass',
        collapsed ? 'w-[76px]' : 'w-64'
      )}>
        <Brand collapsed={collapsed} />
        {!collapsed && (
          <div className="mx-2 rounded-xl glass-inset px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hospital Status</span>
              <HospitalStatusBadge status={hospital.status} compact />
            </div>
            <p className="mt-1 truncate text-xs font-semibold">{hospital.name}</p>
          </div>
        )}
        <NavList collapsed={collapsed} />
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-auto flex h-10 items-center justify-center gap-2 rounded-xl text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span className="text-xs font-semibold">Collapse</span>}
        </button>
      </aside>

      {/* mobile drawer */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-4 p-3 transition-transform duration-300 lg:hidden glass-strong',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between">
          <Brand collapsed={false} />
          <button onClick={() => setMobileOpen(false)} className="rounded-xl p-2 text-muted-foreground hover:bg-foreground/5"><X className="h-5 w-5" /></button>
        </div>
        <div className="mx-2 rounded-xl glass-inset px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hospital Status</span>
            <HospitalStatusBadge status={hospital.status} compact />
          </div>
          <p className="mt-1 truncate text-xs font-semibold">{hospital.name}</p>
        </div>
        <NavList collapsed={false} onNavigate={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}