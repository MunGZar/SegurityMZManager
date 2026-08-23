import React from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  RotateCcw,
  Users
} from 'lucide-react';
import { Cliente, ClienteStatus } from '@/services/clientes.service';
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

interface ClienteTableProps {
  clientes: Cliente[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (cliente: Cliente) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
  onRestore?: (cliente: Cliente) => void;
}

export function ClienteTable({
  clientes,
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
}: ClienteTableProps) {
  const getStatusBadge = (status: ClienteStatus, deletedAt?: string | null) => {
    if (deletedAt) {
      return <StatusBadge variant="deleted" />;
    }

    switch (status) {
      case 'PROSPECTO':
        return <StatusBadge variant="prospect" label="Prospecto" />;
      case 'ACTIVO':
        return <StatusBadge variant="active" label="Cliente Activo" />;
      case 'INACTIVO':
        return <StatusBadge variant="inactive" label="Inactivo" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <TableLoadingState message="Cargando clientes..." />;
  }

  if (clientes.length === 0) {
    return (
      <TableEmptyState
        icon={Users}
        title="No se encontraron clientes"
        description="Prueba con otra búsqueda o agrega un nuevo cliente."
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
              <TableSortHeader field="identificacion" sortBy={sortBy} onSort={onSort}>
                Identificación
              </TableSortHeader>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Teléfono</TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Email</TableHead>
              <TableSortHeader field="status" sortBy={sortBy} onSort={onSort}>
                Estado
              </TableSortHeader>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow 
                key={cliente.id} 
                className={`border-b border-zinc-800/60 hover:bg-zinc-800/10 transition-colors ${
                  cliente.deletedAt ? 'opacity-65' : ''
                }`}
              >
                <TableCell className="font-medium text-white px-4 py-3.5">
                  <div>
                    <p className="font-semibold text-zinc-100">{cliente.nombre}</p>
                    {cliente.deletedAt && (
                      <p className="text-[10px] text-red-400">Eliminado lógicamente</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5">{cliente.identificacion || '—'}</TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5">{cliente.telefono || '—'}</TableCell>
                <TableCell className="text-zinc-300 px-4 py-3.5 truncate max-w-[180px]">{cliente.email || '—'}</TableCell>
                <TableCell className="px-4 py-3.5">{getStatusBadge(cliente.status, cliente.deletedAt)}</TableCell>
                <TableCell className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView(cliente)}
                      className="h-8 w-8 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!cliente.deletedAt ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(cliente)}
                          className="h-8 w-8 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(cliente)}
                          className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      onRestore && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onRestore(cliente)}
                          className="h-8 w-8 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                          title="Restaurar cliente"
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
