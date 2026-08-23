import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { TableHead } from '@/components/ui/table';

export interface TableSortHeaderProps {
  field: string;
  sortBy: string;
  onSort: (field: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function TableSortHeader({
  field,
  sortBy,
  onSort,
  children,
  className = '',
}: TableSortHeaderProps) {
  const active = sortBy === field;

  return (
    <TableHead
      className={`text-zinc-400 font-semibold h-11 px-4 cursor-pointer select-none group ${className}`}
      onClick={() => onSort(field)}
    >
      {children}{' '}
      <ArrowUpDown
        className={`ml-1 h-3.5 w-3.5 inline-block transition-colors ${
          active ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
        }`}
      />
    </TableHead>
  );
}
