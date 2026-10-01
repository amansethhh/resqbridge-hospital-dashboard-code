import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import Timeline from '@/components/shared/Timeline';
import { history, priorityLabels } from '@/lib/mockData';

export default function HistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const h = history.find((x) => x.id === id) || history[0];

  const timeline = [
    { label: 'Emergency Created', time: `${h.date} 09:12`, state: 'done', actor: 'Citizen App' },
    { label: 'Assigned', time: '09:13', state: 'done', actor: 'Dispatch' },
    { label: 'Hospital Notified', time: '09:14', state: 'done', actor: 'Dispatch' },
    { label: 'Acknowledged', time: '09:15', state: 'done', actor: 'Dr. R. Halsey' },
    { label: 'En Route', time: '09:17', state: 'done', actor: h.ambulance },
    { label: 'Arrived', time: '09:31', state: 'done', actor: h.ambulance },
    { label: 'Patient Received', time: '09:33', state: 'done', actor: 'Dr. R. Halsey' },
    { label: 'Handover', time: '09:39', state: 'done', actor: 'Dr. R. Halsey' },
    { label: 'Completed', time: '09:54', state: 'done', actor: 'System' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate('/history')}>Back</GlassButton>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">{h.id}</h1>
        <StatusBadge tone={priorityLabels[h.priority].tone} label={priorityLabels[h.priority].label} />
        <StatusBadge tone={h.handover === 'Accepted' ? 'success' : 'warning'} label={h.handover} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="lg:col-span-1">
          <h2 className="mb-3 font-display text-lg font-bold">Case Details</h2>
          <div className="space-y-2 text-sm">
            <Row label="Date" value={h.date} />
            <Row label="Type" value={h.type} />
            <Row label="Ambulance" value={h.ambulance} />
            <Row label="Destination" value={h.destination} />
            <Row label="Duration" value={h.durationMin ? `${h.durationMin} min` : '—'} />
            <Row label="Outcome" value={h.outcome} />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl glass-inset p-3">
            {h.outcome === 'Deceased' ? <XCircle className="h-5 w-5 text-rose-500" /> : <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            <span className="text-sm font-semibold">Final Outcome: {h.outcome}</span>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold"><HistoryIcon className="h-5 w-5 text-primary" /> Complete Timeline</h2>
          <Timeline events={timeline} />
        </GlassCard>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}