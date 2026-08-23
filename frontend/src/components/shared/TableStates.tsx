import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface TableLoadingStateProps {
  message?: string;
}

export function TableLoadingState({ message = 'Cargando datos...' }: TableLoadingStateProps) {
  return (
    <div className="py-20 flex flex-col items-center justify-center gap-4 text-zinc-500">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export interface TableEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function TableEmptyState({ icon: Icon, title, description }: TableEmptyStateProps) {
  return (
    <div className="py-20 text-center text-zinc-500">
      <Icon className="h-12 w-12 mx-auto stroke-1 mb-3 text-zinc-600" />
      <p className="text-base font-semibold text-zinc-400">{title}</p>
      {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
    </div>
  );
}
