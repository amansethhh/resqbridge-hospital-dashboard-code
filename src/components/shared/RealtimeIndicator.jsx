import React from 'react';
import { cn } from '@/lib/utils';

const states = {
  LIVE: { label: 'Live', dot: 'bg-emerald-500', text: 'text-emerald-600', ring: 'bg-emerald-500/15' },
  CONNECTING: { label: 'Connecting', dot: 'bg-amber-500', text: 'text-amber-600', ring: 'bg-amber-500/15' },
  RECONNECTING: { label: 'Reconnecting', dot: 'bg-amber-500', text: 'text-amber-600', ring: 'bg-amber-500/15' },
  OFFLINE: { label: 'Offline', dot: 'bg-rose-500', text: 'text-rose-600', ring: 'bg-rose-500/15' },
};

export default function RealtimeIndicator({ state = 'LIVE', compact = false }) {
  const s = states[state] || states.LIVE;
  const pulse = state === 'LIVE' || state === 'RECONNECTING';
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold', s.ring, s.text)}>
      <span className="relative flex h-2 w-2">
        {pulse && <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', s.dot)} />}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', s.dot)} />
      </span>
      {!compact && s.label}
    </div>
  );
}