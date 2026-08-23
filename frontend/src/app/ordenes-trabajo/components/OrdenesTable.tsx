import React from 'react';
import { Eye, Edit2, Trash2, RotateCcw, Wrench, Calendar, Camera, RefreshCw, AlertCircle } from 'lucide-react';
import { OrdenTrabajo, OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@/services/ordenes-trabajo.service';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TablePagination } from '@/components/shared/TablePagination';
import { TableEmptyState } from '@/components/shared/TableStates';

interface OrdenesTableProps {
  ordenes: OrdenTrabajo[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (orden: OrdenTrabajo) => void;
  onEdit: (orden: OrdenTrabajo) => void;
  onChangeEstado: (orden: OrdenTrabajo) => void;
  onEvidencias: (orden: OrdenTrabajo) => void;
  onDelete: (orden: OrdenTrabajo) => void;
  onRestore: (orden: OrdenTrabajo) => void;
}

export function OrdenesTable({
  ordenes,
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
  onEvidencias,
  onDelete,
  onRestore,
}: OrdenesTableProps) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getEstadoBadge = (estado: OrdenTrabajoEstado, isDeleted: boolean) => {
    if (isDeleted) return <StatusBadge variant="deleted" label="Eliminada" />;

    switch (estado) {
      case 'PENDIENTE':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/50 text-amber-400 border border-amber-500/30">Pendiente</span>;
      case 'PROGRAMADA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-950/50 text-blue-400 border border-blue-500/30">Programada</span>;
      case 'EN_PROCESO':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-950/50 text-indigo-400 border border-indigo-500/30 animate-pulse">En Proceso</span>;
      case 'FINALIZADA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">Finalizada</span>;
      case 'CANCELADA':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-950/50 text-red-400 border border-red-500/30">Cancelada</span>;
      default:
        return <StatusBadge variant="inactive" />;
    }
  };

  const getPrioridadBadge = (prioridad: OrdenTrabajoPrioridad) => {
    switch (prioridad) {
      case 'BAJA':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">Baja</span>;
      case 'MEDIA':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/20">Media</span>;
      case 'ALTA':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/20">Alta</span>;
      case 'URGENTE':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 font-mono font-bold">URGENTE</span>;
      default:
        return null;
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
                  Folio OT {sortBy === 'folio' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Cotización Origen</th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('fechaProgramada')}>
                  Programada {sortBy === 'fechaProgramada' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-center">Prioridad</th>
                <th className="py-3.5 px-4 text-center">Evidencias</th>
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
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-44"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-24"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-28"></div></td>
                    <td className="py-4 px-4 text-center"><div className="h-4 bg-zinc-800 rounded w-16 mx-auto"></div></td>
                    <td className="py-4 px-4 text-center"><div className="h-4 bg-zinc-800 rounded w-12 mx-auto"></div></td>
                    <td className="py-4 px-4 text-center"><div className="h-5 bg-zinc-800 rounded-full w-20 mx-auto"></div></td>
                    <td className="py-4 px-4 text-right"><div className="h-8 bg-zinc-800 rounded w-36 ml-auto"></div></td>
                  </tr>
                ))
              ) : ordenes.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <TableEmptyState
                      icon={Wrench}
                      title="No se encontraron órdenes de trabajo"
                      description="Usa el botón 'Generar Orden desde Cotización' para transformar cotizaciones aprobadas."
                    />
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => {
                  const isDeleted = Boolean(orden.deletedAt);
                  return (
                    <tr
                      key={orden.id}
                      className={`hover:bg-zinc-800/30 transition-colors ${
                        isDeleted ? 'bg-red-950/10 text-zinc-500' : ''
                      }`}
                    >
                      {/* Folio */}
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">
                        {orden.folio}
                      </td>

                      {/* Cliente */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{orden.cliente?.nombre || 'Cliente N/A'}</div>
                        {orden.direccion && (
                          <div className="text-xs text-zinc-400 truncate max-w-[200px]">
                            📍 {orden.direccion}
                          </div>
                        )}
                      </td>

                      {/* Cotización origen */}
                      <td className="py-3.5 px-4 font-mono text-xs text-zinc-300">
                        #{orden.cotizacion?.folio || 'N/A'}
                      </td>

                      {/* Fecha Programada */}
                      <td className="py-3.5 px-4 text-xs text-zinc-300">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                          <span>{formatDate(orden.fechaProgramada)}</span>
                        </div>
                        {orden.horaProgramada && (
                          <span className="text-[11px] text-zinc-400 font-mono block">
                            ⏰ {orden.horaProgramada}
                          </span>
                        )}
                      </td>

                      {/* Prioridad */}
                      <td className="py-3.5 px-4 text-center">
                        {getPrioridadBadge(orden.prioridad)}
                      </td>

                      {/* Evidencias */}
                      <td className="py-3.5 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEvidencias(orden)}
                          className="h-7 px-2 text-xs text-indigo-300 hover:text-white hover:bg-indigo-950/40 gap-1 border border-indigo-500/20 cursor-pointer"
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span className="font-mono">{orden.evidencias?.length || 0}</span>
                        </Button>
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4 text-center">
                        {getEstadoBadge(orden.estado, isDeleted)}
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onView(orden)}
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                            title="Ver Ficha Operativa y Ficha de Trabajo"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {!isDeleted && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onChangeEstado(orden)}
                                className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 cursor-pointer"
                                title="Cambiar Estado de Instalación"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(orden)}
                                className="h-8 w-8 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 cursor-pointer"
                                title="Editar Datos Operativos / Ficha Técnica"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(orden)}
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
                              onClick={() => onRestore(orden)}
                              className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 cursor-pointer"
                              title="Restaurar Orden"
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
