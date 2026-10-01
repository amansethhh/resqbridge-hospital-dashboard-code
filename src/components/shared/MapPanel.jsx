import React from 'react';
import { MapPin, Navigation, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

// Visual development map placeholder. Architected for future real map SDK integration.
export default function MapPanel({ ambulances = [], height = 'h-full', className, showRoute = true }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl glass', height, className)}>
      {/* grid backdrop */}
      <div className="absolute inset-0 opacity-[0.18] dark:opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--muted-foreground) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground) / 0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-cyan-500/10" />
      {/* faux roads */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M-20,120 Q200,80 420,180 T900,140" fill="none" stroke="hsl(var(--muted-foreground) / 0.25)" strokeWidth="6" strokeLinecap="round" />
        <path d="M120,-20 Q160,200 220,420 T300,900" fill="none" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="5" strokeLinecap="round" />
        <path d="M0,300 Q300,260 700,340" fill="none" stroke="hsl(var(--muted-foreground) / 0.18)" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* route line */}
      {showRoute && ambulances[0] && (
        <svg className="absolute inset-0 h-full w-full">
          <path d="M80,80 Q260,200 420,300" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" opacity="0.8" />
        </svg>
      )}

      {/* hospital marker */}
      <div className="absolute left-[78%] top-[62%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <div className="icon-3d flex h-10 w-10 items-center justify-center bg-gradient-to-br from-primary to-cyan-500 rounded-xl">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="mt-1 rounded-full glass px-2 py-0.5 text-[10px] font-bold">HOSPITAL</span>
        </div>
      </div>

      {/* ambulance markers */}
      {ambulances.map((a, i) => {
        const pos = [
          { left: '12%', top: '18%' },
          { left: '38%', top: '40%' },
          { left: '20%', top: '70%' },
        ][i] || { left: '50%', top: '50%' };
        return (
          <div key={a.id || i} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
            <div className="flex flex-col items-center">
              <div className={cn('icon-3d flex h-9 w-9 items-center justify-center rounded-xl', a.tone === 'critical' ? 'bg-gradient-to-br from-rose-500 to-red-600' : 'bg-gradient-to-br from-sky-500 to-blue-600')}>
                <Navigation className="h-4 w-4 text-white" />
              </div>
              {a.id && <span className="mt-1 rounded-full glass px-1.5 py-0.5 text-[9px] font-bold">{a.id}</span>}
            </div>
          </div>
        );
      })}

      {/* controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1.5">
        <button className="glass-inset flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition" aria-label="Recenter">
          <Crosshair className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute bottom-3 left-3 rounded-lg glass-inset px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
        DEVELOPMENT MAP · awaiting map SDK
      </div>
    </div>
  );
}