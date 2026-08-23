import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TablePaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limitOptions?: number[];
}

export function TablePagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  limitOptions = [5, 10, 20, 50],
}: TablePaginationProps) {
  const totalPages = Math.ceil(total / limit) || 1;
  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 py-2">
      <div className="flex items-center gap-4">
        <p className="text-xs text-zinc-500">
          Mostrando <span className="font-semibold text-zinc-300">{startItem}</span> a{' '}
          <span className="font-semibold text-zinc-300">{endItem}</span> de{' '}
          <span className="font-semibold text-zinc-300">{total}</span> registros
        </p>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-zinc-500">Filas por página:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {limitOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 gap-1 h-8 cursor-pointer disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <div className="flex items-center justify-center px-3 text-xs font-medium text-zinc-300 h-8 border border-zinc-800 rounded bg-zinc-950">
          Pág. {page} de {totalPages}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 gap-1 h-8 cursor-pointer disabled:opacity-50"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
