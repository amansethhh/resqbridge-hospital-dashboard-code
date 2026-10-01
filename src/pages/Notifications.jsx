import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, CheckCheck, AlertTriangle, Ambulance, Clock, Activity, Settings as SettingsIcon, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import StatusBadge from '@/components/glass/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import GlassButton from '@/components/glass/GlassButton';
import { notifications, priorityLabels } from '@/lib/mockData';

const typeIcons = { emergency: AlertTriangle, eta: Clock, arrival: Ambulance, capacity: Activity, system: SettingsIcon };

export default function Notifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(notifications);

  const filtered = useMemo(() => items.filter((n) => {
    const f = filter === 'all' || (filter === 'unread' && !n.read) || n.priority === filter;
    const q = !query || n.title.toLowerCase().includes(query.toLowerCase()) || n.body.toLowerCase().includes(query.toLowerCase());
    return f && q;
  }), [items, filter, query]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-5">
      <PageHeader title="Notifications" subtitle="Emergency, ambulance, capacity and system alerts" icon={Bell}
        actions={<GlassButton variant="secondary" size="sm" icon={CheckCheck} onClick={markAllRead}>Mark all read</GlassButton>} />

      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notifications…" className="h-10 w-full rounded-xl glass-inset pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'unread', 'critical', 'warning', 'info'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize transition ${filter === f ? 'glass shadow-sm' : 'glass-inset text-muted-foreground'}`}>{f === 'all' ? 'All' : f}</button>
            ))}
          </div>
        </div>
      </GlassCard>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up. New alerts will appear here." />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => {
            const Icon = typeIcons[n.type] || Bell;
            return (
              <GlassCard key={n.id} className={`flex items-start gap-4 p-4 ${!n.read ? 'ring-1 ring-primary/20' : ''}`}>
                <div className={`icon-3d flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.priority === 'critical' ? 'bg-gradient-to-br from-rose-500 to-red-600' : n.priority === 'warning' ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-sky-500 to-blue-600'}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                    <StatusBadge tone={priorityLabels[n.priority]?.tone || 'info'} label={n.priority} />
                  </div>
                </div>
                {n.ref && (
                  <button onClick={() => navigate(`/emergencies/${n.ref}`)} className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10">
                    View <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}