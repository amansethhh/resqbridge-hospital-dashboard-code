import React from 'react';
import { cn } from '@/lib/utils';

const tones = {
  primary: 'from-primary to-cyan-500',
  success: 'from-emerald-500 to-teal-500',
  warning: 'from-amber-500 to-orange-500',
  danger: 'from-rose-500 to-red-600',
  info: 'from-sky-500 to-blue-600',
  neutral: 'from-slate-500 to-slate-700',
};

export default function Icon3D({ icon: Icon, tone = 'primary', size = 'md', className }) {
  const sizes = { sm: 'h-9 w-9 rounded-xl', md: 'h-11 w-11 rounded-2xl', lg: 'h-14 w-14 rounded-2xl' };
  const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
  return (
    <div className={cn('icon-3d flex items-center justify-center', sizes[size], `bg-gradient-to-br ${tones[tone]}`, className)}>
      {Icon && <Icon className={iconSizes[size]} strokeWidth={2.2} />}
    </div>
  );
}