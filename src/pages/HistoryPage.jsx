import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Search, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { history, priorityLabels } from '@/lib/mockData';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('all');

  const filtered = useMemo(() => history.filter((h) => {
    const q = query.toLowerCase();
    const mq = !q || h.id.toLowerCase().includes(q) || h.type.toLowerCase().includes(q);
    const mp = priority === 'all' || h.priority === priority;
    return mq && mp;
  }), [query, priority]);

  return (
    <div className="space-y-5">
      <PageHeader title="Emergency History" subtitle="Historical emergency cases and outcomes" icon={HistoryIcon} />

      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ID or type…" className="h-10 w-full rounded-xl glass-inset pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-10 rounded-xl glass-inset px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40">
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="urgent">Urgent</option>
            <option value="standard">Standard</option>
          </select>
        </div>
      </GlassCard>

      {filtered.length === 0 ? (
        <EmptyState icon={HistoryIcon} title="No history found" description="No historical cases match your search." />
      ) : (
        <GlassCard className="hidden overflow-hidden p-0 lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Emergency ID</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Ambulance</th>
                <th className="px-4 py-3 font-semibold">Destination</th>
                <th className="px-4 py-3 font-semibold">Outcome</th>
                <th className="px-4 py-3 font-semibold">Handover</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="cursor-pointer border-b border-border/40 transition hover:bg-foreground/5" onClick={() => navigate(`/history/${h.id}`)}>
                  <td className="px-4 py-3 font-bold">{h.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3"><StatusBadge tone={priorityLabels[h.priority].tone} label={priorityLabels[h.priority].label} /></td>
                  <td className="px-4 py-3 font-medium">{h.type}</td>
                  <td className="px-4 py-3">{h.ambulance}</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.destination}</td>
                  <td className="px-4 py-3">{h.outcome}</td>
                  <td className="px-4 py-3"><StatusBadge tone={h.handover === 'Accepted' ? 'success' : 'warning'} label={h.handover} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{h.durationMin ? `${h.durationMin}m` : '—'}</td>
                  <td className="px-4 py-3 text-right"><ChevronRight className="h-4 w-4 text-primary" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      <div className="grid gap-4 lg:hidden">
        {filtered.map((h) => (
          <GlassCard key={h.id} className="cursor-pointer" onClick={() => navigate(`/history/${h.id}`)}>
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold">{h.id}</span>
              <StatusBadge tone={priorityLabels[h.priority].tone} label={priorityLabels[h.priority].label} />
            </div>
            <p className="mt-1 text-sm font-semibold">{h.type}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{h.date} · {h.ambulance}</span>
              <span>{h.outcome}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}