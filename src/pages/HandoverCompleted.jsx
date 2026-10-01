import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, LayoutDashboard } from 'lucide-react';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, staff, hospital } from '@/lib/mockData';

export default function HandoverCompleted() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = emergencies.find((x) => x.id === id) || emergencies[0];

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <GlassCard className="ring-1 ring-emerald-500/30 text-center py-10">
        <div className="mx-auto icon-3d flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">Handover Completed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Custody successfully transferred. Case is now recorded as accepted.</p>
        <div className="mt-4 flex justify-center"><StatusBadge tone="success" label="Completed" /></div>
      </GlassCard>

      <GlassCard>
        <div className="grid gap-3 sm:grid-cols-2">
          <Detail label="Emergency ID" value={e.id} />
          <Detail label="Patient / Case ID" value={e.patientRef} />
          <Detail label="Ambulance" value={e.ambulanceId} />
          <Detail label="Hospital" value={hospital.name} />
          <Detail label="Arrival Time" value={e.timeline.find((t) => t.label === 'Ambulance Arrived')?.time || '13:18'} />
          <Detail label="Handover Time" value="13:24" />
          <Detail label="Receiving Staff" value={staff.name} />
          <Detail label="Completion State" value="Accepted" />
        </div>
      </GlassCard>

      <div className="flex flex-wrap justify-center gap-3">
        <GlassButton variant="primary" icon={LayoutDashboard} onClick={() => navigate('/')}>Return to Dashboard</GlassButton>
        <GlassButton variant="secondary" icon={FileText} onClick={() => navigate(`/emergencies/${e.id}/case`)}>View Case</GlassButton>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}