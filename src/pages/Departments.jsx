import React from 'react';
import { Building2 } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import { departments } from '@/lib/mockData';

export default function Departments() {
  return (
    <div className="space-y-5">
      <PageHeader title="Department Status" subtitle="Real-time readiness across emergency-response departments" icon={Building2} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => {
          const pct = Math.round((d.used / d.beds) * 100);
          const tone = d.status === 'OPERATIONAL' ? 'success' : d.status === 'LIMITED_CAPACITY' || d.status === 'HIGH_LOAD' ? 'warning' : 'critical';
          const label = d.status === 'OPERATIONAL' ? 'Ready' : d.status === 'LIMITED_CAPACITY' ? 'Limited' : d.status === 'HIGH_LOAD' ? 'High Load' : 'Unavailable';
          return (
            <GlassCard key={d.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-base font-bold">{d.name}</p>
                  <p className="text-sm text-muted-foreground">{d.used} / {d.beds} beds in use</p>
                </div>
                <StatusBadge tone={tone} label={label} />
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${tone === 'success' ? 'bg-emerald-500' : tone === 'warning' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg glass-inset py-2"><p className="text-muted-foreground">Used</p><p className="font-bold">{d.used}</p></div>
                <div className="rounded-lg glass-inset py-2"><p className="text-muted-foreground">Free</p><p className="font-bold">{d.beds - d.used}</p></div>
                <div className="rounded-lg glass-inset py-2"><p className="text-muted-foreground">Load</p><p className="font-bold">{pct}%</p></div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}