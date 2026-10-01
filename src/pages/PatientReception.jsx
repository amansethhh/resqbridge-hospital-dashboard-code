import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, Ambulance, Clock, Stethoscope, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import GlassModal from '@/components/glass/GlassModal';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, staff } from '@/lib/mockData';

export default function PatientReception() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = emergencies.find((x) => x.id === id) || emergencies[0];
  const [confirm, setConfirm] = useState(false);
  const [received, setReceived] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate(`/emergencies/${e.id}`)}>Back</GlassButton>
        <PageHeader title="Patient Reception" subtitle={`Confirm receipt of patient from ${e.ambulanceId}`} icon={UserCheck} className="mb-0 flex-1" />
      </div>

      {received ? (
        <GlassCard className="ring-1 ring-emerald-500/30 text-center py-12">
          <div className="mx-auto icon-3d flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-extrabold">Patient Received</h2>
          <p className="mt-1 text-sm text-muted-foreground">Custody of {e.patientRef} has been transferred to {e.destination}.</p>
          <div className="mt-5 flex justify-center gap-3">
            <GlassButton variant="primary" onClick={() => navigate(`/emergencies/${e.id}/handover`)}>Begin Handover</GlassButton>
            <GlassButton variant="secondary" onClick={() => navigate(`/emergencies/${e.id}`)}>Back to Case</GlassButton>
          </div>
        </GlassCard>
      ) : (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            <GlassCard>
              <h3 className="mb-3 font-display text-lg font-bold">Reception Summary</h3>
              <div className="space-y-2 text-sm">
                <Detail icon={Ambulance} label="Emergency ID" value={e.id} />
                <Detail icon={Ambulance} label="Ambulance" value={e.ambulanceId} />
                <Detail icon={Clock} label="Arrival Time" value={e.timeline.find((t) => t.label === 'Ambulance Arrived')?.time || '13:18'} />
                <Detail icon={Stethoscope} label="Receiving Dept" value={e.destination} />
                <Detail icon={UserCheck} label="Receiving Staff" value={staff.name} />
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-3 font-display text-lg font-bold">Confirmation Required</h3>
              <p className="text-sm text-muted-foreground">Patient reception requires deliberate confirmation by authorized hospital personnel. Verify the patient reference and receiving department before confirming.</p>
              <div className="mt-4 rounded-xl glass-inset p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Patient Reference</span>
                  <StatusBadge tone="primary" label={e.patientRef} dot={false} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm font-semibold">{e.destination}</span>
                </div>
              </div>
              <GlassButton variant="success" size="lg" className="mt-5 w-full" icon={UserCheck} onClick={() => setConfirm(true)}>Confirm Patient Received</GlassButton>
            </GlassCard>
          </div>
        </>
      )}

      <GlassModal
        open={confirm} onClose={() => setConfirm(false)} tone="warning"
        title="Confirm Patient Reception" subtitle="This records custody transfer within ResQBridge"
        footer={<>
          <GlassButton variant="secondary" onClick={() => setConfirm(false)}>Cancel</GlassButton>
          <GlassButton variant="success" icon={UserCheck} onClick={() => { setConfirm(false); setReceived(true); }}>Confirm Reception</GlassButton>
        </>}
      >
        <p className="text-sm text-muted-foreground">Confirm that <span className="font-bold text-foreground">{e.patientRef}</span> from <span className="font-bold text-foreground">{e.ambulanceId}</span> has been received at <span className="font-bold text-foreground">{e.destination}</span> by {staff.name}.</p>
      </GlassModal>
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