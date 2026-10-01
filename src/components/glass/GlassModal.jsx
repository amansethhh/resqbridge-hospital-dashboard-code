import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GlassModal({ open, onClose, title, subtitle, children, footer, tone, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;

  const toneRing = tone === 'critical' ? 'ring-rose-500/40' : tone === 'warning' ? 'ring-amber-500/40' : 'ring-primary/30';

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('glass-strong relative w-full rounded-3xl p-6 ring-1', maxWidth, toneRing)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-muted-foreground hover:bg-foreground/5 transition" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
        {footer && <div className="mt-6 flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}