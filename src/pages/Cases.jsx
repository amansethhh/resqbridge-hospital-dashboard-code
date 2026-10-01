import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Search, ArrowRight, User } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import { emergencies, history, priorityLabels, emergencyStatusLabels } from '@/lib/mockData';

const priorityFilters = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'urgent', label: 'Urgent' },
  { key: 'standard', label: 'Standard' },
];

export default function Cases() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const cases = useMemo(() => {
    const active = emergencies
      .filter((e) => e.patientRef)
      .map((e) => ({
        id: e.id,
        patientRef: e.patientRef,
        type: e.type,
        priority: e.priority,
        status: e.status,
        ageSex: e.ageSex,
        destination: e.destination,
        created: e.createdAt,
        active: true,
      }));
    const past = history.map((h) => ({
      id: h.id,
      patientRef: '—',
      type: h.type,
      priority: h.priority,
      status: h.handover === 'Diverted' ? 'DIVERTED' : 'COMPLETED',
      ageSex: '—',
      destination: h.destination,
      created: h.date,
      active: false,
    }));
    return [...active, ...past];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const matchesQuery =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.patientRef.toLowerCase().includes(q);
      const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
      return matchesQuery && matchesPriority;
    });
  }, [cases, query, priorityFilter]);

  const counts = useMemo(() => ({
    total: cases.length,
    critical: cases.filter((c) => c.priority === 'critical').length,
    urgent: cases.filter((c) => c.priority === 'urgent').length,
    standard: cases.filter((c) => c.priority === 'standard').length,
    active: cases.filter((c) => c.active).length,
  }), [cases]);

  function openCase(c) {
    navigate(`/emergencies/${c.id}`);
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Patients / Cases"
        subtitle="Unified case registry across active emergencies and historical records"
        icon={ClipboardList}
      />

      {/* Summary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Cases</p>
          <p className="mt-1 font-display text-2xl font-extrabold">{counts.total}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-sky-600">{counts.active}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Critical Priority</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-rose-600">{counts.critical}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Urgent Priority</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-amber-600">{counts.urgent}</p>
        </GlassCard>
      </div>

      {/* Search + filter bar */}
      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by case ID, patient ref, or type…"
              className="h-10 w-full rounded-xl glass-inset pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {priorityFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setPriorityFilter(f.key)}
                className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  priorityFilter === f.key ? 'glass ring-1 ring-primary/40 text-foreground' : 'glass-inset text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Cases table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Case ID</th>
                <th className="px-4 py-3">Patient Ref</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 md:table-cell">Age / Sex</th>
                <th className="hidden px-4 py-3 lg:table-cell">Destination</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                    No cases match your search.
                  </td>
                </tr>
              )}
              {filtered.map((c) => {
                const p = priorityLabels[c.priority];
                const s = emergencyStatusLabels[c.status] || { label: c.status, tone: 'muted' };
                return (
                  <tr
                    key={c.id}
                    onClick={() => openCase(c)}
                    className="cursor-pointer border-b border-border/40 transition hover:bg-foreground/5"
                  >
                    <td className="px-4 py-3 font-semibold">{c.id}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        {c.patientRef}
                      </span>
                    </td>
                    <td className="px-4 py-3">{c.type}</td>
                    <td className="px-4 py-3"><StatusBadge tone={p.tone} label={p.label} /></td>
                    <td className="px-4 py-3"><StatusBadge tone={s.tone} label={s.label} /></td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{c.ageSex}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{c.destination}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.created}</td>
                    <td className="px-4 py-3 text-right">
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}