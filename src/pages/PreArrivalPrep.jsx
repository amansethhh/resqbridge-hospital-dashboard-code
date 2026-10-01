import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, Clock, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, priorityLabels } from '@/lib/mockData';

export default function PreArrivalPrep() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = emergencies.find((x) => x.id === id) || emergencies[0];

  const readiness = [
    { label: 'Trauma Unit', status: 'READY', tone: 'success' },
    { label: 'Emergency Bed', status: 'AVAILABLE', tone: 'success' },
    { label: 'Imaging (CT)', status: 'AVAILABLE', tone: 'success' },
    { label: 'Blood Bank', status: 'AVAILABLE', tone: 'success' },
    { label: 'Cardiac Team', status: 'STANDBY', tone: 'warning' },
    { label: 'Ventilator', status: 'STANDBY', tone: 'warning' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate(`/emergencies/${e.id}`)}>Back</GlassButton>
        <PageHeader title="Pre-Arrival Preparation" subtitle={`Preparing for ${e.id} · ${e.type}`} icon={ClipboardCheck} className="mb-0 flex-1" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ambulance ETA</span>
            <StatusBadge tone={priorityLabels[e.priority].tone} label={priorityLabels[e.priority].label} />
          </div>
          <p className="mt-2 font-display text-5xl font-extrabold tracking-tight">{e.etaMin}<span className="text-2xl text-muted-foreground"> min</span></p>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Emergency Type" value={e.type} />
            <Row label="Priority" value={priorityLabels[e.priority].label} />
            <Row label="Expected Arrival" value={`~${e.etaMin} min`} />
            <Row label="Required Department" value={e.destination} />
            <Row label="Ambulance" value={e.ambulanceId} />
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-bold">Readiness Checklist</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {readiness.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-xl glass-inset px-3.5 py-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className={`h-5 w-5 ${r.tone === 'success' ? 'text-emerald-500' : 'text-amber-500'}`} />
                  <span className="text-sm font-semibold">{r.label}</span>
                </div>
                <StatusBadge tone={r.tone} label={r.status} />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl glass-inset p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Required Resources</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {e.requiredResources.map((r) => <StatusBadge key={r} tone="info" label={r} dot={false} />)}
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <GlassButton variant="primary" icon={CheckCircle2} onClick={() => navigate(`/emergencies/${e.id}/reception`)}>Mark Ready</GlassButton>
            <GlassButton variant="secondary" icon={Clock} onClick={() => navigate('/resources')}>Adjust Resources</GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}