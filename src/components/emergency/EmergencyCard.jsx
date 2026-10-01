import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Clock, MapPin, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import { priorityLabels, emergencyStatusLabels } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function EmergencyCard({ emergency, onAcknowledge }) {
  const navigate = useNavigate();
  const p = priorityLabels[emergency.priority];
  const s = emergencyStatusLabels[emergency.status];
  const critical = emergency.priority === 'critical';

  return (
    <GlassCard className={cn('group cursor-pointer p-4 transition-all hover:shadow-lg', critical && 'ring-1 ring-rose-500/30')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn('icon-3d flex h-10 w-10 items-center justify-center rounded-xl', critical ? 'bg-gradient-to-br from-rose-500 to-red-600' : 'bg-gradient-to-br from-sky-500 to-blue-600')}>
            <Navigation className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-sm font-bold tracking-tight">{emergency.id}</p>
              <StatusBadge tone={p.tone} label={p.label} />
            </div>
            <p className="mt-0.5 text-sm font-semibold">{emergency.type}</p>
          </div>
        </div>
        <StatusBadge tone={s.tone} label={s.label} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{emergency.summary}</p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg glass-inset px-2.5 py-1.5">
          <p className="text-muted-foreground">Ambulance</p>
          <p className="font-semibold">{emergency.ambulanceId}</p>
        </div>
        <div className="rounded-lg glass-inset px-2.5 py-1.5">
          <p className="text-muted-foreground">ETA</p>
          <p className="flex items-center gap-1 font-semibold"><Clock className="h-3 w-3" />{emergency.etaMin ? `${emergency.etaMin}m` : '—'}</p>
        </div>
        <div className="rounded-lg glass-inset px-2.5 py-1.5">
          <p className="text-muted-foreground">Distance</p>
          <p className="font-semibold">{emergency.distanceKm ? `${emergency.distanceKm}km` : '—'}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span className="truncate">{emergency.origin}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {onAcknowledge && emergency.status === 'NOTIFIED' ? (
          <button onClick={(e) => { e.stopPropagation(); onAcknowledge(emergency); }} className="rounded-xl bg-gradient-to-br from-primary to-cyan-500 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-primary/30 transition active:scale-95">
            Acknowledge
          </button>
        ) : <span className="text-xs text-muted-foreground">Driver: {emergency.driver}</span>}
        <button onClick={() => navigate(`/emergencies/${emergency.id}`)} className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition">
          View Details <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </GlassCard>
  );
}