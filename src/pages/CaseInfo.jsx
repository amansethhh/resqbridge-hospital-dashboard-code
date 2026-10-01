import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, User, Brain, Image as ImageIcon, Clock } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, priorityLabels } from '@/lib/mockData';

export default function CaseInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = emergencies.find((x) => x.id === id) || emergencies[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <GlassButton variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate(`/emergencies/${e.id}`)}>Back</GlassButton>
        <PageHeader title="Patient / Case Information" subtitle={`Authorized case view · ${e.patientRef}`} icon={FileText} className="mb-0 flex-1" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Case Summary</h2>
            <StatusBadge tone={priorityLabels[e.priority].tone} label={priorityLabels[e.priority].label} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Detail label="Case ID" value={e.id} />
            <Detail label="Patient Reference" value={e.patientRef} />
            <Detail icon={User} label="Age / Sex" value={e.ageSex} />
            <Detail icon={Clock} label="Created" value={e.createdAt} />
            <Detail label="Emergency Type" value={e.type} />
            <Detail label="Destination" value={e.destination} />
          </div>
          <div className="mt-4 rounded-xl glass-inset p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Emergency Summary</p>
            <p className="mt-1 text-sm">{e.summary}</p>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Required Resources</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {e.requiredResources.map((r) => <StatusBadge key={r} tone="info" label={r} dot={false} />)}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard>
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold"><Brain className="h-5 w-5 text-primary" /> AI-Assisted Summary</h3>
            <div className="rounded-xl glass-inset p-4">
              <p className="text-sm">Preliminary analysis suggests <span className="font-semibold">{e.type.toLowerCase()}</span> with moderate severity. Vitals indicative of stable but time-sensitive presentation. Recommend immediate triage and {e.destination.toLowerCase()} readiness.</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-amber-600">AI-assisted · not a diagnosis</p>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold"><ImageIcon className="h-5 w-5 text-primary" /> Scene Evidence</h3>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-lg glass-inset flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Evidence captured via Citizen App. Authorized personnel only.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2.5 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">{Icon && <Icon className="h-4 w-4" />}{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}