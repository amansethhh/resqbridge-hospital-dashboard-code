import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListFilter, Search, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { emergencies, history, emergencyStatusLabels, priorityLabels } from '@/lib/mockData';

export default function EmergencyQueue() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');

  const all = useMemo(() => [...emergencies, ...history.map((h) => ({ ...h, status: h.handover === 'Diverted' ? 'DIVERTED' : 'COMPLETED', driver: '—', origin: '—', distanceKm: 0, etaMin: 0, summary: h.type }))], []);

  const filtered = all.filter((e) => {
    const q = query.toLowerCase();
    const matchQ = !q || e.id.toLowerCase().includes(q) || e.type.toLowerCase().includes(q) || e.ambulanceId?.toLowerCase().includes(q);
    const matchS = status === 'all' || e.status === status;
    const matchP = priority === 'all' || e.priority === priority;
    return matchQ && matchS && matchP;
  });

  const statusOptions = ['all', ...Object.keys(emergencyStatusLabels)];

  return (
    <div className="space-y-5">
      <PageHeader title="Emergency Queue" subtitle="All active and recent emergency cases" icon={ListFilter} />

      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ID, type, ambulance…" className="h-10 w-full rounded-xl glass-inset pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-xl glass-inset px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40">
            {statusOptions.map((s) => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : emergencyStatusLabels[s].label}</option>)}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-10 rounded-xl glass-inset px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40">
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="urgent">Urgent</option>
            <option value="standard">Standard</option>
          </select>
        </div>
      </GlassCard>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No matching emergencies" description="Try adjusting your search or filters." />
      ) : (
        <>
          {/* Desktop table */}
          <GlassCard className="hidden overflow-hidden p-0 lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Emergency ID</th>
                  <th className="px-4 py-3 font-semibold">Priority</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Ambulance</th>
                  <th className="px-4 py-3 font-semibold">Driver</th>
                  <th className="px-4 py-3 font-semibold">ETA</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b border-border/40 transition hover:bg-foreground/5">
                    <td className="px-4 py-3 font-bold">{e.id}</td>
                    <td className="px-4 py-3"><StatusBadge tone={priorityLabels[e.priority].tone} label={priorityLabels[e.priority].label} /></td>
                    <td className="px-4 py-3 font-medium">{e.type}</td>
                    <td className="px-4 py-3">{e.ambulanceId}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.driver}</td>
                    <td className="px-4 py-3">{e.etaMin ? `${e.etaMin}m` : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge tone={emergencyStatusLabels[e.status].tone} label={emergencyStatusLabels[e.status].label} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{e.createdAt || e.date}</td>
                    <td className="px-4 py-3 text-right"><button onClick={() => navigate(`/emergencies/${e.id}`)} className="flex items-center gap-1 text-primary hover:underline"><ChevronRight className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>

          {/* Mobile cards */}
          <div className="grid gap-4 lg:hidden">
            {filtered.map((e) => (
              <GlassCard key={e.id} className="cursor-pointer" onClick={() => navigate(`/emergencies/${e.id}`)}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold">{e.id}</span>
                  <StatusBadge tone={priorityLabels[e.priority].tone} label={priorityLabels[e.priority].label} />
                </div>
                <p className="mt-1 text-sm font-semibold">{e.type}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{e.ambulanceId} · {e.driver}</span>
                  <StatusBadge tone={emergencyStatusLabels[e.status].tone} label={emergencyStatusLabels[e.status].label} />
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}