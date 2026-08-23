import React from 'react';
import { Eye, Edit, Trash2, RotateCcw, Tag } from 'lucide-react';
import { Marca } from '@/services/marcas.service';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  TablePagination, 
  TableSortHeader, 
  TableLoadingState, 
  TableEmptyState,
  StatusBadge 
} from '@/components/shared';
import { formatDate } from '@/lib/utils';

interface MarcaTableProps {
  marcas: Marca[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (marca: Marca) => void;
  onEdit: (marca: Marca) => void;
  onDelete: (marca: Marca) => void;
  onRestore?: (marca: Marca) => void;
}

export function MarcaTable({
  marcas,
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
}: MarcaTableProps) {
  if (loading) {
    return <TableLoadingState message="Cargando marcas..." />;
  }

  if (marcas.length === 0) {
    return (
      <TableEmptyState
        icon={Tag}
        title="No se encontraron marcas"
        description="Prueba con otra búsqueda o agrega una nueva marca."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/10">
        <Table>
          <TableHeader className="bg-zinc-950/60 border-b border-zinc-800">
            <TableRow className="border-b border-zinc-800 hover:bg-transparent">
              <TableSortHeader field="nombre" sortBy={sortBy} onSort={onSort}>
                Nombre
              </TableSortHeader>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Descripción</TableHead>
              <TableSortHeader field="activo" sortBy={sortBy} onSort={onSort}>
                Estado
              </TableSortHeader>
              <TableSortHeader field="createdAt" sortBy={sortBy} onSort={onSort}>
                Fecha de Creación
              </TableSortHeader>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marcas.map((marca) => (
              <TableRow 
                key={marca.id} 
                className={`border-b border-zinc-800/60 hover:bg-zinc-800/10 transition-colors ${
                  marca.deletedAt ? 'opacity-65' : ''
                }`}
              >
                <TableCell className="font-medium text-white px-4 py-3.5">
                  <div>
                    <p className="font-semibold text-zinc-100">{marca.nombre}</p>
                    {marca.deletedAt && (
                      <p className="text-[10px] text-red-400">Eliminado lógicamente</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5 max-w-[250px] truncate">
                  {marca.descripcion || '—'}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  {marca.deletedAt ? (
                    <StatusBadge variant="deleted" />
                  ) : marca.activo ? (
                    <StatusBadge variant="active" label="Activa" />
                  ) : (
                    <StatusBadge variant="inactive" label="Inactiva" />
                  )}
                </TableCell>
                <TableCell className="text-zinc-400 px-4 py-3.5 text-xs">
                  {formatDate(marca.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView(marca)}
                      className="h-8 w-8 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!marca.deletedAt ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(marca)}
                          className="h-8 w-8 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(marca)}
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
                          onClick={() => onRestore(marca)}
                          className="h-8 w-8 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                          title="Restaurar marca"
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
