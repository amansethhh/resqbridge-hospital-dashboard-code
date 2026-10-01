import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Filter, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import EmergencyCard from '@/components/emergency/EmergencyCard';
import EmptyState from '@/components/shared/EmptyState';
import GlassModal from '@/components/glass/GlassModal';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, priorityLabels } from '@/lib/mockData';

export default function IncomingEmergencies() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [ackTarget, setAckTarget] = useState(null);

  const incoming = emergencies.filter((e) => ['NOTIFIED', 'EN_ROUTE', 'PREPARING'].includes(e.status));
  const filtered = filter === 'all' ? incoming : incoming.filter((e) => e.priority === filter);
  const sorted = [...filtered].sort((a, b) => {
    const order = { critical: 0, urgent: 1, standard: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Incoming Emergencies" subtitle="Cases routed to your facility awaiting action" icon={Inbox} />

      <div className="flex flex-wrap items-center gap-2">
        {['all', 'critical', 'urgent', 'standard'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-3.5 py-2 text-sm font-semibold capitalize transition ${filter === f ? 'glass text-foreground shadow-sm' : 'glass-inset text-muted-foreground hover:text-foreground'}`}
          >
            {f === 'all' ? 'All Priorities' : f}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground"><Filter className="h-4 w-4" /> {sorted.length} cases</span>
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon={Inbox} title="No incoming emergencies" description="Your facility has no active incoming cases. New emergencies will appear here in real time." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((e) => (
            <EmergencyCard key={e.id} emergency={e} onAcknowledge={(em) => setAckTarget(em)} />
          ))}
        </div>
      )}

      {/* Acknowledge confirmation */}
      <GlassModal
        open={!!ackTarget}
        onClose={() => setAckTarget(null)}
        title="Acknowledge Emergency"
        subtitle="Confirm receipt of this emergency and begin preparation"
        tone="warning"
        footer={
          <>
            <GlassButton variant="secondary" onClick={() => setAckTarget(null)}>Cancel</GlassButton>
            <GlassButton variant="primary" onClick={() => { navigate(`/emergencies/${ackTarget.id}`); setAckTarget(null); }}>Acknowledge & Prepare</GlassButton>
          </>
        }
      >
        {ackTarget && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <StatusBadge tone={priorityLabels[ackTarget.priority].tone} label={priorityLabels[ackTarget.priority].label} />
              <span className="font-display text-lg font-bold">{ackTarget.id}</span>
            </div>
            <p className="text-sm font-semibold">{ackTarget.type}</p>
            <p className="text-sm text-muted-foreground">{ackTarget.summary}</p>
            <div className="rounded-xl glass-inset p-3 text-sm">
              <p><span className="text-muted-foreground">Ambulance:</span> <span className="font-semibold">{ackTarget.ambulanceId}</span></p>
              <p><span className="text-muted-foreground">ETA:</span> <span className="font-semibold">{ackTarget.etaMin} min</span></p>
              <p><span className="text-muted-foreground">Destination:</span> <span className="font-semibold">{ackTarget.destination}</span></p>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}