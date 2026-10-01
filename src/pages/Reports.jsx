import React from 'react';
import { BarChart3, TrendingUp, Activity, Clock, AlertTriangle, CheckCircle2, XCircle, Ambulance } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import KpiCard from '@/components/glass/KpiCard';
import StatusBadge from '@/components/glass/StatusBadge';
import { reports, priorityLabels, history } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';

const PIE_COLORS = ['#0ea5e9', '#06b6d4', '#10b981', '#f59e0b', '#64748b'];

export default function Reports() {
  const t = reports.totals;
  const a = reports.averages;

  return (
    <div className="space-y-5">
      <PageHeader title="Reports & Analytics" subtitle="Operational performance for emergency response" icon={BarChart3} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Activity} tone="primary" label="Total Emergencies" value={t.total} state="7-day" stateTone="primary" />
        <KpiCard icon={CheckCircle2} tone="success" label="Completed" value={t.completed} state="Accepted" stateTone="success" />
        <KpiCard icon={XCircle} tone="danger" label="Cancelled" value={t.cancelled} state="Closed" stateTone="critical" />
        <KpiCard icon={AlertTriangle} tone="warning" label="Diverted" value={t.diverted} state="Rerouted" stateTone="warning" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold"><TrendingUp className="h-5 w-5 text-primary" /> Weekly Emergency Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reports.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--popover))' }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-4 font-display text-base font-bold">By Emergency Type</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={reports.byType} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {reports.byType.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--popover))' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {reports.byType.map((b, i) => (
              <div key={b.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />{b.name}</span>
                <span className="font-semibold">{b.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard>
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold"><Clock className="h-5 w-5 text-primary" /> Average Response Times</h3>
          <div className="space-y-3">
            <Metric label="Avg Response Time" value={`${a.responseMin} min`} />
            <Metric label="Avg Hospital Arrival" value={`${a.arrivalMin} min`} />
            <Metric label="Avg Handover Time" value={`${a.handoverMin} min`} />
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold"><AlertTriangle className="h-5 w-5 text-rose-500" /> Critical Cases</h3>
          <p className="font-display text-4xl font-extrabold text-rose-600">{reports.critical}</p>
          <p className="mt-1 text-sm text-muted-foreground">high-priority emergencies this period</p>
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold"><Ambulance className="h-5 w-5 text-primary" /> Recent Outcomes</h3>
          <div className="space-y-2">
            {history.slice(0, 4).map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg glass-inset px-3 py-2 text-xs">
                <span className="font-semibold">{h.id}</span>
                <StatusBadge tone={priorityLabels[h.priority].tone} label={h.priority} />
                <span className="text-muted-foreground">{h.outcome}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg glass-inset px-3 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-display text-lg font-bold">{value}</span>
    </div>
  );
}