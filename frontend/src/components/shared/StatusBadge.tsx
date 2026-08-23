import React from 'react';

export type StatusVariant = 'deleted' | 'active' | 'inactive' | 'prospect';

export interface StatusBadgeProps {
  variant: StatusVariant;
  label?: string;
  className?: string;
}

const variantStyles: Record<StatusVariant, { defaultLabel: string; classes: string }> = {
  deleted: {
    defaultLabel: 'Eliminado',
    classes: 'bg-red-950/40 border-red-500/30 text-red-400',
  },
  active: {
    defaultLabel: 'Activo',
    classes: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400',
  },
  inactive: {
    defaultLabel: 'Inactivo',
    classes: 'bg-zinc-800 border-zinc-700 text-zinc-400',
  },
  prospect: {
    defaultLabel: 'Prospecto',
    classes: 'bg-blue-950/40 border-blue-500/30 text-blue-400',
  },
};

export function StatusBadge({ variant, label, className = '' }: StatusBadgeProps) {
  const config = variantStyles[variant] || variantStyles.inactive;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.classes} ${className}`}
    >
      {displayLabel}
    </span>
  );
}
