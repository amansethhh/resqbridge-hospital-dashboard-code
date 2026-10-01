import React from 'react';
import { cn } from '@/lib/utils';

export default function LoadingState({ label = 'Loading…', rows = 3, className }) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        {label}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass h-16 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}