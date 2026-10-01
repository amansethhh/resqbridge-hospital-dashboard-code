import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Hand, Ambulance, Clock, User, FileText, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import GlassModal from '@/components/glass/GlassModal';
import StatusBadge from '@/components/glass/StatusBadge';
import Timeline from '@/components/shared/Timeline';
import { emergencies, staff } from '@/lib/mockData';

export default function Handover() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = emergencies.find((x) => x.id === id) || emergencies[0];
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate(`/emergencies/${e.id}`)}>Back</GlassButton>
        <PageHeader title="Handover" subtitle={`Accept handover from ${e.ambulanceId}`} icon={Hand} className="mb-0 flex-1" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <GlassCard>
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold"><FileText className="h-5 w-5 text-primary" /> Handover Summary</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail icon={FileText} label="Emergency ID" value={e.id} />
              <Detail icon={User} label="Patient Ref" value={e.patientRef} />
              <Detail icon={Ambulance} label="Ambulance" value={e.ambulanceId} />
              <Detail icon={User} label="Driver" value={e.driver} />
              <Detail icon={Clock} label="Arrival Time" value={e.timeline.find((t) => t.label === 'Ambulance Arrived')?.time || '13:18'} />
              <Detail icon={Hand} label="Receiving Staff" value={staff.name} />
            </div>
            <div className="mt-4 rounded-xl glass-inset p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Emergency Summary</p>
              <p className="mt-1 text-sm">{e.summary}</p>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transport Timeline</p>
              <div className="mt-3"><Timeline events={e.timeline} /></div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="mb-2 font-display text-base font-bold">Notes</h3>
            <textarea placeholder="Add handover notes (e.g. vitals en route, interventions performed)…" className="h-24 w-full rounded-xl glass-inset p-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </GlassCard>
        </div>

        <div className="space-y-5">
          <GlassCard>
            <h3 className="mb-3 font-display text-base font-bold">Receiving Department</h3>
            <div className="rounded-xl glass-inset p-4">
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-display text-lg font-bold">{e.destination}</p>
              <div className="mt-3"><StatusBadge tone="success" label="Ready" /></div>
            </div>
            <GlassButton variant="primary" size="lg" className="mt-4 w-full" icon={CheckCircle2} onClick={() => setConfirm(true)}>Accept Handover</GlassButton>
          </GlassCard>
        </div>
      </div>

      {/* H6 — Handover Confirmation */}
      <GlassModal
        open={confirm} onClose={() => setConfirm(false)} tone="warning"
        title="Confirm Handover" subtitle="Review all details before accepting"
        maxWidth="max-w-md"
        footer={<>
          <GlassButton variant="secondary" onClick={() => setConfirm(false)}>Review Again</GlassButton>
          <GlassButton variant="primary" icon={Hand} onClick={() => { setConfirm(false); navigate(`/emergencies/${e.id}/handover-complete`); }}>Confirm Handover</GlassButton>
        </>}
      >
        <div className="space-y-2 text-sm">
          <Detail icon={FileText} label="Emergency ID" value={e.id} />
          <Detail icon={User} label="Patient Ref" value={e.patientRef} />
          <Detail icon={Ambulance} label="Ambulance" value={e.ambulanceId} />
          <Detail icon={Hand} label="Receiving Staff" value={staff.name} />
          <Detail icon={Hand} label="Department" value={e.destination} />
        </div>
        <p className="mt-3 text-xs text-amber-600">This is a deliberate confirmation. Handover cannot be undone.</p>
      </GlassModal>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2.5 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" />{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}