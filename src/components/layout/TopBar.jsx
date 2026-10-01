import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown, LogOut, Settings, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/lib/AuthContext';
import RealtimeIndicator from '@/components/shared/RealtimeIndicator';
import HospitalStatusBadge from '@/components/shared/HospitalStatusBadge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { staff, hospital } from '@/lib/mockData';
import { navItems } from '@/components/layout/Sidebar';

export default function TopBar({ onOpenMobileNav, realtimeState = 'LIVE' }) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const current = navItems.find((i) => (i.end ? location.pathname === i.to : location.pathname.startsWith(i.to)) && i.to !== '/');
  const home = location.pathname === '/';
  const title = home ? 'Dashboard' : current?.label || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 px-4 glass lg:px-6">
      <button onClick={onOpenMobileNav} className="rounded-xl p-2 text-muted-foreground hover:bg-foreground/5 lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden items-center gap-2 sm:flex">
        <h1 className="font-display text-lg font-bold tracking-tight">{title}</h1>
        <span className="text-muted-foreground/50">/</span>
        <HospitalStatusBadge status={hospital.status} compact />
      </div>

      <div className="relative ml-auto hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search emergencies, ambulances, cases…"
          className="h-10 w-full rounded-xl glass-inset pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-3">
        <RealtimeIndicator state={realtimeState} />
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2.5 text-muted-foreground hover:bg-foreground/5 transition"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button onClick={() => navigate('/notifications')} className="relative rounded-xl p-2.5 text-muted-foreground hover:bg-foreground/5 transition" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl glass-inset py-1.5 pl-1.5 pr-2 transition hover:bg-foreground/5 focus:outline-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-500 text-xs font-bold text-white">
                {staff.initials}
              </div>
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-xs font-bold">{staff.name}</p>
                <p className="text-[10px] text-muted-foreground">{staff.title}</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-500 text-xs font-bold text-white">
                {staff.initials}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">{staff.name}</p>
                <p className="text-xs text-muted-foreground">{staff.title}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-rose-600 focus:text-rose-600">
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}