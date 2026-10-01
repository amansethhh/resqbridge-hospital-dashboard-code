import React from 'react';
import { cn } from '@/lib/utils';

export default function PageHeader({ title, subtitle, icon: Icon, actions, className }) {
  return (
    <div className={cn('mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="icon-3d flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}