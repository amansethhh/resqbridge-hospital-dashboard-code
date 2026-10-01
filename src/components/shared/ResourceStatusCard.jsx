import React from 'react';
import {
  BedDouble, HeartPulse, ShieldPlus, ScanLine, Droplets, Ambulance, Wind, Users, Activity, Stethoscope,
} from 'lucide-react';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import { resourceLabels } from '@/lib/mockData';

const iconMap = {
  BedDouble, HeartPulse, ShieldPlus, ScanLine, Droplets, Ambulance, Wind, Users, Activity, Stethoscope,
};

export default function ResourceStatusCard({ name, status, total, used, icon = 'Activity' }) {
  const Icon = iconMap[icon] || Activity;
  const pct = total ? Math.round((used / total) * 100) : 0;
  const r = resourceLabels[status] || resourceLabels.AVAILABLE;
  const barTone = status === 'FULL' || status === 'UNAVAILABLE' ? 'bg-rose-500' : status === 'LIMITED' ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="icon-3d flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">{name}</p>
            <p className="text-xs text-muted-foreground">{used} / {total} in use</p>
          </div>
        </div>
        <StatusBadge tone={r.tone} label={r.label} />
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${barTone}`} style={{ width: `${pct}%` }} />
      </div>
    </GlassCard>
  );
}