import React from 'react';
import { cn } from '@/lib/utils';

export default function GlassCard({ children, className, strong = false, as: As = 'div', ...props }) {
  return (
    <As
      className={cn(
        'rounded-2xl p-5',
        strong ? 'glass-strong' : 'glass',
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}