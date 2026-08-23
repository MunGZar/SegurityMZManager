import React from 'react';
import { Eye, Edit2, Trash2, RotateCcw, FileText, Copy, RefreshCw } from 'lucide-react';
import { Cotizacion, CotizacionEstado } from '@/services/cotizaciones.service';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TablePagination } from '@/components/shared/TablePagination';
import { TableEmptyState } from '@/components/shared/TableStates';

interface CotizacionTableProps {
  cotizaciones: Cotizacion[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (cotizacion: Cotizacion) => void;
  onEdit: (cotizacion: Cotizacion) => void;
  onChangeEstado: (cotizacion: Cotizacion) => void;
  onDuplicate: (cotizacion: Cotizacion) => void;
  onDelete: (cotizacion: Cotizacion) => void;
  onRestore: (cotizacion: Cotizacion) => void;
}

export function CotizacionTable({
  cotizaciones,
  total,
  page,
  limit,
  sortBy,
  sortOrder,
  loading,
  onPageChange,
  onLimitChange,
  onSort,
  onView,
  onEdit,
  onChangeEstado,
  onDuplicate,
  onDelete,
  onRestore,
}: CotizacionTableProps) {
  const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getEstadoBadge = (estado: CotizacionEstado, isDeleted: boolean) => {
    if (isDeleted) return <StatusBadge variant="deleted" label="Eliminada" />;

    switch (estado) {
      case 'BORRADOR':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">Borrador</span>;
      case 'ENVIADA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-950/50 text-blue-400 border border-blue-500/30">Enviada</span>;
      case 'APROBADA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">Aprobada</span>;
      case 'RECHAZADA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-950/50 text-red-400 border border-red-500/30">Rechazada</span>;
      case 'VENCIDA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/50 text-amber-400 border border-amber-500/30">Vencida</span>;
      default:
        return <StatusBadge variant="inactive" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/90 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800 font-semibold">
              <tr>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('folio')}>
                  Folio {sortBy === 'folio' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('fecha')}>
                  Fecha {sortBy === 'fecha' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4 text-center">Ítems</th>
                <th className="py-3.5 px-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => onSort('total')}>
                  Total {sortBy === 'total' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-center cursor-pointer hover:text-white transition-colors" onClick={() => onSort('estado')}>
                  Estado {sortBy === 'estado' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-24"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-20"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-44"></div></td>
                    <td className="py-4 px-4 text-center"><div className="h-4 bg-zinc-800 rounded w-8 mx-auto"></div></td>
                    <td className="py-4 px-4 text-right"><div className="h-4 bg-zinc-800 rounded w-24 ml-auto"></div></td>
                    <td className="py-4 px-4 text-center"><div className="h-5 bg-zinc-800 rounded-full w-20 mx-auto"></div></td>
                    <td className="py-4 px-4 text-right"><div className="h-8 bg-zinc-800 rounded w-32 ml-auto"></div></td>
                  </tr>
                ))
              ) : cotizaciones.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <TableEmptyState
                      icon={FileText}
                      title="No se encontraron cotizaciones"
                      description="No hay registros que coincidan con la búsqueda o filtro seleccionado."
                    />
                  </td>
                </tr>
              ) : (
                cotizaciones.map((cot) => {
                  const isDeleted = Boolean(cot.deletedAt);
                  return (
                    <tr
                      key={cot.id}
                      className={`hover:bg-zinc-800/30 transition-colors ${
                        isDeleted ? 'bg-red-950/10 text-zinc-500' : ''
                      }`}
                    >
                      {/* Folio */}
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">
                        {cot.folio}
                      </td>

                      {/* Fecha */}
                      <td className="py-3.5 px-4 text-xs text-zinc-400">
                        {formatDate(cot.fecha)}
                      </td>

                      {/* Cliente */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{cot.cliente?.nombre || 'Cliente N/A'}</div>
                        {cot.cliente?.identificacion && (
                          <div className="text-xs text-zinc-400 font-mono">
                            {cot.cliente.identificacion}
                          </div>
                        )}
                      </td>

                      {/* Cantidad de ítems */}
                      <td className="py-3.5 px-4 text-center font-mono text-xs text-zinc-300">
                        {cot.detalles?.length || 0} líneas
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-400 font-mono text-sm">
                        {formatCurrency(cot.total)}
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4 text-center">
                        {getEstadoBadge(cot.estado, isDeleted)}
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onView(cot)}
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                            title="Ver Ficha y PDF"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {!isDeleted && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onChangeEstado(cot)}
                                className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 cursor-pointer"
                                title="Cambiar Estado"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDuplicate(cot)}
                                className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 cursor-pointer"
                                title="Duplicar Cotización"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(cot)}
                                className="h-8 w-8 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(cot)}
                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/40 cursor-pointer"
                                title="Eliminar (Soft Delete)"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                          {isDeleted && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRestore(cot)}
                              className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 cursor-pointer"
                              title="Restaurar Cotización"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}
