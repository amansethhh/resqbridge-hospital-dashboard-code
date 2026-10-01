import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Siren, Navigation, CheckCircle2, AlertTriangle, Activity, ArrowRight, Clock, Radio,
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import KpiCard from '@/components/glass/KpiCard';
import EmergencyCard from '@/components/emergency/EmergencyCard';
import MapPanel from '@/components/shared/MapPanel';
import HospitalStatusBadge from '@/components/shared/HospitalStatusBadge';
import GlassButton from '@/components/glass/GlassButton';
import GlassModal from '@/components/glass/GlassModal';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, hospital, notifications, priorityLabels } from '@/lib/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [newEmergency, setNewEmergency] = useState(null);

  const incoming = emergencies.filter((e) => ['NOTIFIED', 'EN_ROUTE', 'PREPARING'].includes(e.status));
  const enRoute = emergencies.filter((e) => e.status === 'EN_ROUTE');
  const arrived = emergencies.filter((e) => e.status === 'ARRIVED');
  const critical = emergencies.filter((e) => e.priority === 'critical' && e.status !== 'COMPLETED');

  // Simulate H1 — New Emergency Received critical state
  React.useEffect(() => {
    const t = setTimeout(() => setNewEmergency(incoming[0]), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Operations Dashboard"
        subtitle={`${hospital.name} · live emergency operations`}
        icon={Activity}
        actions={<HospitalStatusBadge status={hospital.status} />}
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Siren} tone="primary" label="Incoming" value={incoming.length} state="Active" stateTone="primary" trend="Awaiting acknowledgement" />
        <KpiCard icon={Navigation} tone="info" label="En Route" value={enRoute.length} state="In transit" stateTone="info" trend="Ambulances approaching" />
        <KpiCard icon={CheckCircle2} tone="success" label="Arrived" value={arrived.length} state="At facility" stateTone="success" trend="Ready for reception" />
        <KpiCard icon={AlertTriangle} tone="danger" label="Critical" value={critical.length} state="Priority" stateTone="critical" trend="Immediate attention" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Incoming queue */}
        <div className="xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight">Incoming Emergencies</h2>
            <button onClick={() => navigate('/incoming')} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {incoming.slice(0, 4).map((e) => (
              <EmergencyCard key={e.id} emergency={e} onAcknowledge={(em) => navigate(`/emergencies/${em.id}`)} />
            ))}
          </div>
        </div>

        {/* Right column: readiness + activity */}
        <div className="space-y-5">
          <GlassCard>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-bold">Hospital Readiness</h3>
              <HospitalStatusBadge status={hospital.status} compact />
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Emergency Dept', status: 'LIMITED', tone: 'warning' },
                { label: 'Trauma Unit', status: 'READY', tone: 'success' },
                { label: 'ICU', status: 'LIMITED', tone: 'warning' },
                { label: 'Imaging', status: 'READY', tone: 'success' },
                { label: 'Ambulance Bay', status: 'FULL', tone: 'critical' },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between rounded-xl glass-inset px-3 py-2">
                  <span className="text-sm font-medium">{r.label}</span>
                  <StatusBadge tone={r.tone} label={r.status} />
                </div>
              ))}
            </div>
            <GlassButton variant="secondary" size="sm" className="mt-3 w-full" onClick={() => navigate('/resources')}>Manage Resources</GlassButton>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-3 font-display text-base font-bold">Recent Activity</h3>
            <div className="space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="flex gap-3">
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-muted-foreground/30' : 'bg-primary'}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.body}</p>
                    <p className="text-[10px] text-muted-foreground/70">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Live map */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">Live Ambulance Map</h2>
            <p className="text-sm text-muted-foreground">Real-time approach tracking · {enRoute.length} active</p>
          </div>
          <GlassButton variant="secondary" size="sm" icon={Radio} onClick={() => navigate('/ambulances')}>Track Ambulances</GlassButton>
        </div>
        <div className="h-72 px-5 pb-5">
          <MapPanel ambulances={enRoute.map((e) => ({ id: e.ambulanceId, tone: e.priority === 'critical' ? 'critical' : 'info' }))} />
        </div>
      </GlassCard>

      {/* H1 — New Emergency Received critical state */}
      <GlassModal
        open={!!newEmergency}
        onClose={() => setNewEmergency(null)}
        title="New Emergency Received"
        subtitle="A new emergency has been routed to your facility"
        tone="warning"
        maxWidth="max-w-md"
        footer={
          <>
            <GlassButton variant="secondary" onClick={() => setNewEmergency(null)}>Dismiss</GlassButton>
            <GlassButton variant="primary" icon={ArrowRight} onClick={() => { navigate(`/emergencies/${newEmergency.id}`); setNewEmergency(null); }}>View Emergency</GlassButton>
          </>
        }
      >
        {newEmergency && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <StatusBadge tone={priorityLabels[newEmergency.priority].tone} label={priorityLabels[newEmergency.priority].label} />
              <span className="font-display text-lg font-bold">{newEmergency.id}</span>
            </div>
            <p className="text-sm font-semibold">{newEmergency.type}</p>
            <p className="text-sm text-muted-foreground">{newEmergency.summary}</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-lg glass-inset px-3 py-2 text-sm"><span className="text-muted-foreground">Ambulance</span><p className="font-semibold">{newEmergency.ambulanceId}</p></div>
              <div className="rounded-lg glass-inset px-3 py-2 text-sm"><span className="text-muted-foreground">ETA</span><p className="flex items-center gap-1 font-semibold"><Clock className="h-3.5 w-3.5" />{newEmergency.etaMin} min</p></div>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}