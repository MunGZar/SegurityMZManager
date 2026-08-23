import React from 'react';
import { 
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
import { 
  TablePagination, 
  TableSortHeader, 
  TableLoadingState, 
  TableEmptyState,
  StatusBadge 
} from '@/components/shared';

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
  const getStatusBadge = (activo: boolean, deletedAt?: string | null) => {
    if (deletedAt) {
      return <StatusBadge variant="deleted" />;
    }

    if (activo) {
      return <StatusBadge variant="active" label="Activo" />;
    } else {
      return <StatusBadge variant="inactive" label="Inactivo" />;
    }
  };

  if (loading) {
    return <TableLoadingState message="Cargando proveedores..." />;
  }

  if (proveedores.length === 0) {
    return (
      <TableEmptyState
        icon={Truck}
        title="No se encontraron proveedores"
        description="Prueba con otra búsqueda o agrega un nuevo proveedor."
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
                Proveedor
              </TableSortHeader>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Contacto</TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Teléfono / WhatsApp</TableHead>
              <TableHead className="text-zinc-400 font-semibold h-11 px-4">Correo</TableHead>
              <TableSortHeader field="activo" sortBy={sortBy} onSort={onSort}>
                Estado
              </TableSortHeader>
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
