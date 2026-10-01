import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';
import Icon3D from './Icon3D';
import StatusBadge from './StatusBadge';

export default function KpiCard({ icon, tone, label, value, state, stateTone, trend }) {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">{value}</p>
          {state && <div className="mt-2"><StatusBadge tone={stateTone} label={state} /></div>}
        </div>
        <Icon3D icon={icon} tone={tone} />
      </div>
      {trend && <p className="mt-3 text-xs text-muted-foreground">{trend}</p>}
      <div className={cn('pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-20 blur-2xl', tone === 'danger' ? 'bg-rose-500' : tone === 'warning' ? 'bg-amber-500' : tone === 'success' ? 'bg-emerald-500' : 'bg-sky-500')} />
    </GlassCard>
  );
}