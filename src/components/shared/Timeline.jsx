import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Timeline({ events = [] }) {
  return (
    <ol className="relative">
      {events.map((ev, i) => {
        const isLast = i === events.length - 1;
        const dotTone = ev.state === 'done' ? 'bg-emerald-500 text-white' : ev.state === 'active' ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-muted text-muted-foreground border border-border';
        return (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-border" />}
            <div className={cn('relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full', dotTone)}>
              {ev.state === 'done' ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
            </div>
            <div className="pt-0.5">
              <p className={cn('text-sm font-semibold', ev.state === 'pending' && 'text-muted-foreground')}>{ev.label}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{ev.time}</span>
                {ev.actor && <><span className="opacity-40">·</span><span>{ev.actor}</span></>}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}