import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation, Clock, MapPin, User, Ambulance, FileText, Radio, CheckCircle2, Hand, AlertTriangle,
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import MapPanel from '@/components/shared/MapPanel';
import Timeline from '@/components/shared/Timeline';
import GlassModal from '@/components/glass/GlassModal';
import { emergencies, priorityLabels, emergencyStatusLabels } from '@/lib/mockData';

export default function EmergencyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emergency = emergencies.find((e) => e.id === id);
  const [confirmCancel, setConfirmCancel] = useState(false);

  if (!emergency) {
    return (
      <div className="space-y-5">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate('/emergencies')}>Back</GlassButton>
        <GlassCard className="text-center py-16"><p className="text-muted-foreground">Emergency not found.</p></GlassCard>
      </div>
    );
  }

  const p = priorityLabels[emergency.priority];
  const s = emergencyStatusLabels[emergency.status];
  const isCritical = emergency.priority === 'critical';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate('/emergencies')}>Back</GlassButton>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl font-extrabold tracking-tight">{emergency.id}</h1>
          <StatusBadge tone={p.tone} label={p.label} />
          <StatusBadge tone={s.tone} label={s.label} />
        </div>
        {isCritical && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-3 py-1.5 text-sm font-semibold text-rose-600">
            <AlertTriangle className="h-4 w-4" /> Critical Emergency Alert
          </div>
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Left: case info + actions */}
        <div className="space-y-5 xl:col-span-2">
          <GlassCard>
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold"><FileText className="h-5 w-5 text-primary" /> Case Information</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow icon={Navigation} label="Emergency Type" value={emergency.type} />
              <InfoRow icon={User} label="Patient Ref" value={emergency.patientRef} />
              <InfoRow icon={User} label="Age / Sex" value={emergency.ageSex} />
              <InfoRow icon={Ambulance} label="Ambulance" value={emergency.ambulanceId} />
              <InfoRow icon={User} label="Driver" value={emergency.driver} />
              <InfoRow icon={MapPin} label="Origin" value={emergency.origin} />
              <InfoRow icon={Clock} label="ETA" value={emergency.etaMin ? `${emergency.etaMin} min` : 'Arrived'} />
              <InfoRow icon={MapPin} label="Destination" value={emergency.destination} />
            </div>
            <div className="mt-4 rounded-xl glass-inset p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</p>
              <p className="mt-1 text-sm">{emergency.summary}</p>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Required Resources</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {emergency.requiredResources.map((r) => <StatusBadge key={r} tone="info" label={r} dot={false} />)}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden">
            <div className="flex items-center justify-between p-5 pb-3">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold"><Radio className="h-5 w-5 text-primary" /> Live Ambulance Tracking</h2>
              <GlassButton variant="secondary" size="sm" onClick={() => navigate('/ambulances')}>Full Map</GlassButton>
            </div>
            <div className="h-64 px-5 pb-5">
              <MapPanel ambulances={[{ id: emergency.ambulanceId, tone: isCritical ? 'critical' : 'info' }]} />
            </div>
          </GlassCard>

          <div className="flex flex-wrap gap-3">
            <GlassButton variant="primary" icon={CheckCircle2} onClick={() => navigate(`/emergencies/${emergency.id}/pre-arrival`)}>Pre-Arrival Prep</GlassButton>
            <GlassButton variant="success" icon={Hand} onClick={() => navigate(`/emergencies/${emergency.id}/reception`)}>Patient Reception</GlassButton>
            <GlassButton variant="secondary" icon={FileText} onClick={() => navigate(`/emergencies/${emergency.id}/case`)}>Case Info</GlassButton>
            <GlassButton variant="danger" onClick={() => setConfirmCancel(true)}>Cancel</GlassButton>
          </div>
        </div>

        {/* Right: timeline + status */}
        <div className="space-y-5">
          <GlassCard>
            <h2 className="mb-4 font-display text-lg font-bold">Workflow Timeline</h2>
            <Timeline events={emergency.timeline} />
          </GlassCard>
          <GlassCard>
            <h3 className="mb-3 font-display text-base font-bold">Current Status</h3>
            <div className="flex items-center justify-between rounded-xl glass-inset px-3 py-3">
              <span className="text-sm text-muted-foreground">Stage</span>
              <StatusBadge tone={s.tone} label={s.label} />
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl glass-inset px-3 py-3">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm font-semibold">{emergency.createdAt}</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* H7 — Emergency Cancelled */}
      <GlassModal
        open={confirmCancel} onClose={() => setConfirmCancel(false)} tone="critical"
        title="Cancel Emergency" subtitle="This will mark the emergency as cancelled"
        footer={<>
          <GlassButton variant="secondary" onClick={() => setConfirmCancel(false)}>Keep Active</GlassButton>
          <GlassButton variant="danger" onClick={() => { setConfirmCancel(false); navigate('/emergencies'); }}>Confirm Cancellation</GlassButton>
        </>}
      >
        <p className="text-sm text-muted-foreground">Cancelling <span className="font-bold text-foreground">{emergency.id}</span> will notify dispatch and the assigned ambulance. This action is recorded in the audit log.</p>
      </GlassModal>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl glass-inset px-3 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}