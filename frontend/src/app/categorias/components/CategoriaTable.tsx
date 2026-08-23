import React from 'react';
import { Eye, Edit, Trash2, RotateCcw, Layers } from 'lucide-react';
import { Categoria } from '@/services/categorias.service';
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

interface CategoriaTableProps {
  categorias: Categoria[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (categoria: Categoria) => void;
  onEdit: (categoria: Categoria) => void;
  onDelete: (categoria: Categoria) => void;
  onRestore?: (categoria: Categoria) => void;
}

export function CategoriaTable({
  categorias,
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
}: CategoriaTableProps) {
  if (loading) {
    return <TableLoadingState message="Cargando categorías..." />;
  }

  if (categorias.length === 0) {
    return (
      <TableEmptyState
        icon={Layers}
        title="No se encontraron categorías"
        description="Prueba con otra búsqueda o agrega una nueva categoría."
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
            {categorias.map((categoria) => (
              <TableRow 
                key={categoria.id} 
                className={`border-b border-zinc-800/60 hover:bg-zinc-800/10 transition-colors ${
                  categoria.deletedAt ? 'opacity-65' : ''
                }`}
              >
                <TableCell className="font-medium text-white px-4 py-3.5">
                  <div>
                    <p className="font-semibold text-zinc-100">{categoria.nombre}</p>
                    {categoria.deletedAt && (
                      <p className="text-[10px] text-red-400">Eliminado lógicamente</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5 max-w-[250px] truncate">
                  {categoria.descripcion || '—'}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  {categoria.deletedAt ? (
                    <StatusBadge variant="deleted" />
                  ) : categoria.activo ? (
                    <StatusBadge variant="active" label="Activa" />
                  ) : (
                    <StatusBadge variant="inactive" label="Inactiva" />
                  )}
                </TableCell>
                <TableCell className="text-zinc-400 px-4 py-3.5 text-xs">
                  {formatDate(categoria.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView(categoria)}
                      className="h-8 w-8 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!categoria.deletedAt ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(categoria)}
                          className="h-8 w-8 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(categoria)}
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
                          onClick={() => onRestore(categoria)}
                          className="h-8 w-8 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                          title="Restaurar categoría"
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
