import React from 'react';
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Edit, 
  Trash2, 
  RotateCcw,
  Truck
} from 'lucide-react';
import { Proveedor } from '@/services/proveedores.service';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProveedorTableProps {
  proveedores: Proveedor[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (proveedor: Proveedor) => void;
  onEdit: (proveedor: Proveedor) => void;
  onDelete: (proveedor: Proveedor) => void;
  onRestore?: (proveedor: Proveedor) => void;
}

export function ProveedorTable({
  proveedores,
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
  onDelete,
  onRestore,
}: ProveedorTableProps) {
  const totalPages = Math.ceil(total / limit) || 1;
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getStatusBadge = (activo: boolean, deletedAt?: string | null) => {
    if (deletedAt) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-950/40 border border-red-500/30 text-red-400">
          Eliminado
        </span>
      );
    }

    if (activo) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
          Activo
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-400">
          Inactivo
        </span>
      );
    }
  };

  const renderSortIcon = (field: string) => {
    const active = sortBy === field;
    return (
      <ArrowUpDown 
        className={`ml-1 h-3.5 w-3.5 inline-block transition-colors ${
          active ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
        }`} 
      />
    );
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4 text-zinc-500">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-sm font-medium">Cargando proveedores...</p>
      </div>
    );
  }

  if (proveedores.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <Truck className="h-12 w-12 mx-auto stroke-1 mb-3 text-zinc-600" />
        <p className="text-base font-semibold text-zinc-400">No se encontraron proveedores</p>
        <p className="text-xs text-zinc-500 mt-1">Prueba con otra búsqueda o agrega un nuevo proveedor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/10">
        <Table>
          <TableHeader className="bg-zinc-950/60 border-b border-zinc-800">
            <TableRow className="border-b border-zinc-800 hover:bg-transparent">
              <TableHead 
                className="text-zinc-400 font-semibold h-11 px-4 cursor-pointer select-none group"
                onClick={() => onSort('nombre')}
              >
                Proveedor {renderSortIcon('nombre')}
              </TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Contacto</TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Teléfono / WhatsApp</TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Correo</TableHead>
              <TableHead 
                className="text-zinc-400 font-semibold h-11 px-4 cursor-pointer select-none group"
                onClick={() => onSort('activo')}
              >
                Estado {renderSortIcon('activo')}
              </TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proveedores.map((proveedor) => (
              <TableRow 
                key={proveedor.id} 
                className={`border-b border-zinc-800/60 hover:bg-zinc-800/10 transition-colors ${
                  proveedor.deletedAt ? 'opacity-65' : ''
                }`}
              >
                <TableCell className="font-medium text-white px-4 py-3.5">
                  <div>
                    <p className="font-semibold text-zinc-100">{proveedor.nombre}</p>
                    {proveedor.ciudad && (
                      <p className="text-[10px] text-zinc-400">{proveedor.ciudad}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5">{proveedor.contacto || '—'}</TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5">
                  <div className="space-y-0.5">
                    {proveedor.telefono && <p className="text-sm">{proveedor.telefono}</p>}
                    {proveedor.whatsapp && (
                      <p className="text-xs text-indigo-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        WA: {proveedor.whatsapp}
                      </p>
                    )}
                    {!proveedor.telefono && !proveedor.whatsapp && <p className="text-zinc-500">—</p>}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5 truncate max-w-[180px]">{proveedor.correo || '—'}</TableCell>
                <TableCell className="px-4 py-3.5">{getStatusBadge(proveedor.activo, proveedor.deletedAt)}</TableCell>
                <TableCell className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView(proveedor)}
                      className="h-8 w-8 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!proveedor.deletedAt ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(proveedor)}
                          className="h-8 w-8 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(proveedor)}
                          className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                          title="Eliminar (desactivar)"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      onRestore && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onRestore(proveedor)}
                          className="h-8 w-8 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                          title="Restaurar proveedor"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 py-2">
        <div className="flex items-center gap-4">
          <p className="text-xs text-zinc-500">
            Mostrando <span className="font-semibold text-zinc-300">{total > 0 ? startItem : 0}</span> a{' '}
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
              {[5, 10, 20, 50].map((pageSize) => (
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
            disabled={page === 1}
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
    </div>
  );
}
