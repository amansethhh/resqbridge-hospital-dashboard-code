import React from "react";
import { ShieldPlus } from "lucide-react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl icon-3d bg-gradient-to-br from-primary to-cyan-500 mb-4">
            <ShieldPlus className="w-8 h-8 text-white" strokeWidth={2.4} aria-hidden="true" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">ResQBridge</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-display mt-1">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className="glass-strong rounded-3xl p-8">
          {children}
        </div>
        {footer && (
          <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>
        )}
      </div>
    </div>
  );
}