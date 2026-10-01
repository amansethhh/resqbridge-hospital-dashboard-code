import React from 'react';
import StatusBadge from '@/components/glass/StatusBadge';
import { hospitalStatusLabels } from '@/lib/mockData';

export default function HospitalStatusBadge({ status, compact = false }) {
  const s = hospitalStatusLabels[status] || hospitalStatusLabels.OPERATIONAL;
  return <StatusBadge tone={s.tone} label={compact ? s.label.toUpperCase() : s.label} />;
}