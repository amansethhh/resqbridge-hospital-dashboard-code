import React, { useState, useMemo } from 'react';
import { Boxes, AlertTriangle, Save, RotateCcw } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import ResourceStatusCard from '@/components/shared/ResourceStatusCard';
import GlassModal from '@/components/glass/GlassModal';
import StatusBadge from '@/components/glass/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
import { resources as defaultResources, resourceLabels } from '@/lib/mockData';

export default function Resources() {
  const { toast } = useToast();
  const [resourceList, setResourceList] = useState(defaultResources);
  const [editing, setEditing] = useState(null);
  const [editStatus, setEditStatus] = useState('AVAILABLE');
  const [editUsed, setEditUsed] = useState(0);

  // Dynamically determine if hospital capacity is critical
  const capacityCritical = useMemo(() => {
    const fullCount = resourceList.filter((r) => r.status === 'FULL').length;
    const limitedCount = resourceList.filter((r) => r.status === 'LIMITED').length;
    return fullCount >= 1 || limitedCount >= 3;
  }, [resourceList]);

  const criticalBadges = useMemo(
    () =>
      resourceList
        .filter((r) => r.status === 'FULL' || r.status === 'LIMITED')
        .map((r) => ({ label: r.name, tone: r.status === 'FULL' ? 'critical' : 'warning' })),
    [resourceList]
  );

  function openEditor(r) {
    setEditing(r);
    setEditStatus(r.status);
    setEditUsed(r.used);
  }

  function saveEdit() {
    setResourceList((prev) =>
      prev.map((r) =>
        r.id === editing.id ? { ...r, status: editStatus, used: Math.min(editUsed, r.total) } : r
      )
    );
    toast({
      title: 'Resource updated',
      description: `${editing.name} set to ${resourceLabels[editStatus].label} (${Math.min(editUsed, editing.total)}/${editing.total} in use).`,
    });
    setEditing(null);
  }

  function resetAll() {
    setResourceList(defaultResources);
    toast({ title: 'Resources reset to default values.' });
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Resource & Capacity Management"
        subtitle="Update operational status and usage of hospital resources"
        icon={Boxes}
        actions={<GlassButton variant="secondary" icon={RotateCcw} onClick={resetAll}>Reset</GlassButton>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resourceList.map((r) => (
          <button key={r.id} onClick={() => openEditor(r)} className="text-left transition hover:scale-[1.02]">
            <ResourceStatusCard name={r.name} status={r.status} total={r.total} used={r.used} icon={r.icon} />
          </button>
        ))}
      </div>

      {/* H9 — Hospital Capacity Critical */}
      {capacityCritical && (
        <GlassCard className="ring-1 ring-rose-500/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="icon-3d flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-600">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-rose-600">Hospital Capacity Critical</h3>
                <p className="text-sm text-muted-foreground">One or more resources at or approaching capacity limits.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {criticalBadges.map((b) => (
                <StatusBadge key={b.label} tone={b.tone} label={b.label} />
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      <GlassModal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.name}
        subtitle="Update resource operational status"
        footer={
          <>
            <GlassButton variant="secondary" onClick={() => setEditing(null)}>Cancel</GlassButton>
            <GlassButton variant="primary" icon={Save} onClick={saveEdit}>Save Status</GlassButton>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Current: <span className="font-semibold text-foreground">{editing && resourceLabels[editing.status]?.label}</span> · {editing?.used}/{editing?.total} in use
          </p>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Units in use</p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={editing?.total || 0}
                value={editUsed}
                onChange={(e) => setEditUsed(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <input
                type="number"
                min={0}
                max={editing?.total || 0}
                value={editUsed}
                onChange={(e) => setEditUsed(Math.min(Number(e.target.value), editing?.total || 0))}
                className="h-10 w-20 rounded-xl glass-inset px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-sm text-muted-foreground">/ {editing?.total}</span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Operational status</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(resourceLabels).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setEditStatus(key)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
                    editStatus === key ? 'glass ring-1 ring-primary/40' : 'glass-inset'
                  }`}
                >
                  {val.label} <StatusBadge tone={val.tone} label="" dot={false} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassModal>
    </div>
  );
}