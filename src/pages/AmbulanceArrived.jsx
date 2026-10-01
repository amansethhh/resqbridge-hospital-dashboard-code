import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ambulance, MapPin, Clock, CheckCircle2, User } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import MapPanel from '@/components/shared/MapPanel';
import { emergencies } from '@/lib/mockData';

export default function AmbulanceArrived() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = emergencies.find((x) => x.id === id) || emergencies.find((x) => x.status === 'ARRIVED') || emergencies[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate(`/emergencies/${e.id}`)}>Back</GlassButton>
        <PageHeader title="Ambulance Arrived" subtitle={`${e.ambulanceId} has arrived at the facility`} icon={Ambulance} className="mb-0 flex-1" />
      </div>

      <GlassCard className="ring-1 ring-sky-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="icon-3d flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600">
              <Ambulance className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-extrabold tracking-tight">{e.ambulanceId} Arrived</h2>
                <StatusBadge tone="info" label="At Facility" />
              </div>
              <p className="text-sm text-muted-foreground">{e.id} · {e.type}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Arrival Time</p>
            <p className="font-display text-2xl font-extrabold">{e.timeline.find((t) => t.label === 'Ambulance Arrived')?.time || '13:18'}</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <h3 className="mb-3 font-display text-base font-bold">Arrival Details</h3>
          <div className="space-y-2 text-sm">
            <Detail icon={Ambulance} label="Ambulance" value={e.ambulanceId} />
            <Detail icon={User} label="Driver" value={e.driver} />
            <Detail icon={MapPin} label="Hospital Location" value="Ambulance Bay 2" />
            <Detail icon={Clock} label="Emergency ID" value={e.id} />
          </div>
        </GlassCard>
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-5 pb-3"><h3 className="font-display text-base font-bold">Current Location</h3></div>
          <div className="h-56 px-5 pb-5"><MapPanel ambulances={[{ id: e.ambulanceId, tone: 'info' }]} showRoute={false} /></div>
        </GlassCard>
      </div>

      <div className="flex flex-wrap gap-3">
        <GlassButton variant="success" size="lg" icon={CheckCircle2} onClick={() => navigate(`/emergencies/${e.id}/reception`)}>Patient Received</GlassButton>
        <GlassButton variant="secondary" size="lg" onClick={() => navigate(`/emergencies/${e.id}/case`)}>View Case</GlassButton>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2.5">
      <span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" />{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}