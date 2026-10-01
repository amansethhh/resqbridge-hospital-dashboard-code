import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-gradient-to-br from-primary to-cyan-500 text-white shadow-lg shadow-primary/30 hover:shadow-primary/40',
  success: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30',
  warning: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30',
  danger: 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
  secondary: 'glass text-foreground hover:bg-white/60 dark:hover:bg-white/10',
  ghost: 'glass-inset rounded-xl text-foreground hover:bg-white/70 dark:hover:bg-white/10',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export default function GlassButton({
  children, variant = 'primary', size = 'md', icon: Icon, className, ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}