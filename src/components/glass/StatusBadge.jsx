import React from 'react';
import { cn } from '@/lib/utils';

const toneMap = {
  success: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30',
  warning: 'text-amber-600 bg-amber-500/10 border-amber-500/30',
  critical: 'text-rose-600 bg-rose-500/10 border-rose-500/30',
  info: 'text-sky-600 bg-sky-500/10 border-sky-500/30',
  primary: 'text-primary bg-primary/10 border-primary/30',
  muted: 'text-muted-foreground bg-muted border-border',
};

export default function StatusBadge({ tone = 'muted', label, dot = true, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        toneMap[tone] || toneMap.muted,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {label}
    </span>
  );
}