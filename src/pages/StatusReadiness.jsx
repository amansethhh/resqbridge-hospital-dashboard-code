import React from 'react';
import { ShieldCheck, Building2 } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import HospitalStatusBadge from '@/components/shared/HospitalStatusBadge';
import ResourceStatusCard from '@/components/shared/ResourceStatusCard';
import { hospital, resources, departments } from '@/lib/mockData';

export default function StatusReadiness() {
  return (
    <div className="space-y-5">
      <PageHeader title="Hospital Status & Readiness" subtitle="Current operational capacity and resource availability" icon={ShieldCheck} />

      <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="icon-3d flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight">{hospital.name}</h2>
            <p className="text-sm text-muted-foreground">{hospital.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capacity</p>
            <p className="font-display text-2xl font-extrabold">{hospital.capacityUsed}<span className="text-muted-foreground">/{hospital.capacityTotal}</span></p>
          </div>
          <HospitalStatusBadge status={hospital.status} />
        </div>
      </GlassCard>

      <div>
        <h3 className="mb-3 font-display text-lg font-bold tracking-tight">Resource Status</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r) => (
            <ResourceStatusCard key={r.id} name={r.name} status={r.status} total={r.total} used={r.used} icon={r.icon} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-bold tracking-tight">Department Status</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => {
            const pct = Math.round((d.used / d.beds) * 100);
            const tone = d.status === 'OPERATIONAL' ? 'success' : d.status === 'LIMITED_CAPACITY' || d.status === 'HIGH_LOAD' ? 'warning' : 'critical';
            const label = d.status === 'OPERATIONAL' ? 'Ready' : d.status === 'LIMITED_CAPACITY' ? 'Limited' : d.status === 'HIGH_LOAD' ? 'High Load' : 'Critical';
            return (
              <GlassCard key={d.id}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{d.name}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone === 'success' ? 'bg-emerald-500/10 text-emerald-600' : tone === 'warning' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'}`}>{label}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d.used} / {d.beds} beds in use</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${tone === 'success' ? 'bg-emerald-500' : tone === 'warning' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}