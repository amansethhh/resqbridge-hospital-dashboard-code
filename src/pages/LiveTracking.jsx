import React, { useState } from 'react';
import { Radio, Navigation, Clock, MapPin, Wifi, WifiOff } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import RealtimeIndicator from '@/components/shared/RealtimeIndicator';
import MapPanel from '@/components/shared/MapPanel';
import { emergencies } from '@/lib/mockData';

export default function LiveTracking() {
  const active = emergencies.filter((e) => ['EN_ROUTE', 'PREPARING'].includes(e.status));
  const [selected, setSelected] = useState(active[0]?.id || null);
  const current = active.find((e) => e.id === selected) || active[0];

  return (
    <div className="space-y-5">
      <PageHeader title="Live Ambulance Tracking" subtitle="Real-time approach and route monitoring" icon={Radio}
        actions={<RealtimeIndicator state="LIVE" />} />

      <div className="grid gap-5 lg:grid-cols-4">
        <div className="space-y-3 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Ambulances ({active.length})</p>
          {active.map((e) => (
            <button key={e.id} onClick={() => setSelected(e.id)} className={`w-full rounded-2xl p-4 text-left transition ${current?.id === e.id ? 'glass ring-1 ring-primary/40' : 'glass-inset hover:bg-white/70'}`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold">{e.ambulanceId}</span>
                <StatusBadge tone={e.priority === 'critical' ? 'critical' : 'info'} label={e.priority} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{e.id}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{e.etaMin}m</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" />{e.distanceKm}km</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <GlassCard className="p-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-3">
              <div>
                <h2 className="font-display text-lg font-bold">{current?.ambulanceId || 'No Active Ambulance'}</h2>
                <p className="text-sm text-muted-foreground">{current?.id} · {current?.type}</p>
              </div>
              {current && (
                <div className="flex items-center gap-2">
                  <RealtimeIndicator state="LIVE" compact />
                  <StatusBadge tone={current.priority === 'critical' ? 'critical' : 'info'} label={current.priority} />
                </div>
              )}
            </div>
            <div className="h-80 px-5 pb-5">
              {current ? (
                <MapPanel ambulances={[{ id: current.ambulanceId, tone: current.priority === 'critical' ? 'critical' : 'info' }]} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">No active ambulances to track.</div>
              )}
            </div>
          </GlassCard>

          {current && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat icon={Navigation} label="Driver" value={current.driver} />
              <Stat icon={Clock} label="ETA" value={`${current.etaMin} min`} />
              <Stat icon={MapPin} label="Distance" value={`${current.distanceKm} km`} />
              <Stat icon={Wifi} label="Connection" value="Live" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">{label}</span></div>
      <p className="mt-1.5 font-display text-lg font-bold">{value}</p>
    </GlassCard>
  );
}