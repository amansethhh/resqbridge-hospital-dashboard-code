import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Building2, Bell, Shield, LogOut, Save, MapPin } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import StatusBadge from '@/components/glass/StatusBadge';
import HospitalStatusBadge from '@/components/shared/HospitalStatusBadge';
import { hospital, staff, departments } from '@/lib/mockData';

export default function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const tabs = [
    { id: 'profile', label: 'Hospital Info', icon: Building2 },
    { id: 'capacity', label: 'Capacity', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Hospital Settings" subtitle="Configuration, capacity and account" icon={SettingsIcon} />

      <div className="grid gap-5 lg:grid-cols-4">
        <GlassCard className="lg:col-span-1 h-fit">
          <div className="flex items-center gap-3 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500 text-sm font-bold text-white">{staff.initials}</div>
            <div><p className="font-bold">{staff.name}</p><p className="text-xs text-muted-foreground">{staff.title}</p></div>
          </div>
          <nav className="flex flex-col gap-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${tab === t.id ? 'glass shadow-sm' : 'text-muted-foreground hover:bg-foreground/5'}`}>
                <t.icon className="h-4 w-4" />{t.label}
              </button>
            ))}
            <button onClick={() => navigate('/login')} className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-500/10">
              <LogOut className="h-4 w-4" />Logout
            </button>
          </nav>
        </GlassCard>

        <div className="lg:col-span-3">
          {tab === 'profile' && (
            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold">Hospital Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Hospital Name" value={hospital.name} />
                <Field label="Hospital Code" value={hospital.code} />
                <Field label="Address" value={hospital.address} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Operational Status</label>
                  <HospitalStatusBadge status={hospital.status} />
                </div>
              </div>
              <GlassButton variant="primary" icon={Save} className="mt-5">Save Changes</GlassButton>
            </GlassCard>
          )}
          {tab === 'capacity' && (
            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold">Capacity Configuration</h2>
              <div className="space-y-3">
                {departments.map((d) => (
                  <div key={d.id} className="flex items-center justify-between rounded-xl glass-inset px-4 py-3">
                    <div><p className="font-semibold">{d.name}</p><p className="text-xs text-muted-foreground">{d.used}/{d.beds} beds</p></div>
                    <input type="number" defaultValue={d.beds} className="h-9 w-20 rounded-lg glass-inset px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                ))}
              </div>
              <GlassButton variant="primary" icon={Save} className="mt-5">Update Capacity</GlassButton>
            </GlassCard>
          )}
          {tab === 'notifications' && (
            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold">Notification Settings</h2>
              <div className="space-y-3">
                {['New emergencies', 'Ambulance arrivals', 'ETA changes', 'Capacity warnings', 'Cancellations & diversions'].map((n) => (
                  <label key={n} className="flex items-center justify-between rounded-xl glass-inset px-4 py-3">
                    <span className="text-sm font-medium">{n}</span>
                    <input type="checkbox" defaultChecked className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-muted transition checked:bg-primary relative after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition checked:after:translate-x-4" />
                  </label>
                ))}
              </div>
            </GlassCard>
          )}
          {tab === 'security' && (
            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold">Security & Access</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl glass-inset px-4 py-3">
                  <div><p className="text-sm font-semibold">Role</p><p className="text-xs text-muted-foreground">{staff.role}</p></div>
                  <StatusBadge tone="primary" label={staff.role.replace('HOSPITAL_', '')} />
                </div>
                <div className="flex items-center justify-between rounded-xl glass-inset px-4 py-3">
                  <div><p className="text-sm font-semibold">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Email OTP enabled</p></div>
                  <StatusBadge tone="success" label="Enabled" />
                </div>
                <GlassButton variant="secondary">Change Password</GlassButton>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input defaultValue={value} className="h-10 rounded-xl glass-inset px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
    </div>
  );
}