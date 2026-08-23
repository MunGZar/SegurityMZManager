import React from 'react';
import { Eye, Edit2, Trash2, RotateCcw, Package } from 'lucide-react';
import { Producto } from '@/services/productos.service';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TablePagination } from '@/components/shared/TablePagination';
import { TableEmptyState } from '@/components/shared/TableStates';

interface ProductoTableProps {
  productos: Producto[];
  total: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSort: (field: string) => void;
  onView: (producto: Producto) => void;
  onEdit: (producto: Producto) => void;
  onDelete: (producto: Producto) => void;
  onRestore: (producto: Producto) => void;
}

export function ProductoTable({
  productos,
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
}: ProductoTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/90 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800 font-semibold">
              <tr>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('codigoInterno')}>
                  SKU / Código {sortBy === 'codigoInterno' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('nombre')}>
                  Producto {sortBy === 'nombre' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4">Marca & Categoría</th>
                <th className="py-3.5 px-4">Proveedor</th>
                <th className="py-3.5 px-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => onSort('precioVenta')}>
                  P. Costo / Margen / P. Venta {sortBy === 'precioVenta' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-center cursor-pointer hover:text-white transition-colors" onClick={() => onSort('activo')}>
                  Estado {sortBy === 'activo' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-20"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-40"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-28"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-zinc-800 rounded w-24"></div></td>
                    <td className="py-4 px-4 text-right"><div className="h-4 bg-zinc-800 rounded w-24 ml-auto"></div></td>
                    <td className="py-4 px-4 text-center"><div className="h-5 bg-zinc-800 rounded-full w-16 mx-auto"></div></td>
                    <td className="py-4 px-4 text-right"><div className="h-8 bg-zinc-800 rounded w-24 ml-auto"></div></td>
                  </tr>
                ))
              ) : productos.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <TableEmptyState
                      icon={Package}
                      title="No se encontraron productos"
                      description="No hay registros que coincidan con la búsqueda o filtros seleccionados."
                    />
                  </td>
                </tr>
              ) : (
                productos.map((producto) => {
                  const isDeleted = Boolean(producto.deletedAt);
                  return (
                    <tr
                      key={producto.id}
                      className={`hover:bg-zinc-800/30 transition-colors ${
                        isDeleted ? 'bg-red-950/10 text-zinc-500' : ''
                      }`}
                    >
                      {/* SKU / Código */}
                      <td className="py-3.5 px-4 font-mono text-xs font-medium text-indigo-400">
                        {producto.codigoInterno}
                      </td>

                      {/* Producto & Modelo */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {producto.imagenUrl ? (
                            <img
                              src={producto.imagenUrl}
                              alt={producto.nombre}
                              className="h-10 w-10 rounded-lg object-cover border border-zinc-800 bg-zinc-950"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                              <Package className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                              {producto.nombre}
                            </p>
                            {producto.modelo && (
                              <p className="text-xs text-zinc-400 mt-0.5">Modelo: {producto.modelo}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Marca & Categoría */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-300 font-medium">
                            {producto.marca?.nombre || 'Sin Marca'}
                          </span>
                          <p className="text-xs text-zinc-400">
                            {producto.categoria?.nombre || 'Sin Categoría'}
                          </p>
                        </div>
                      </td>

                      {/* Proveedor */}
                      <td className="py-3.5 px-4 text-xs text-zinc-300">
                        {producto.proveedor?.nombre || 'N/A'}
                      </td>

                      {/* Precios: Costo / Margen / Venta */}
                      <td className="py-3.5 px-4 text-right">
                        <p className="font-bold text-emerald-400 text-sm">
                          {formatCurrency(Number(producto.precioVenta))}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Costo: {formatCurrency(Number(producto.precioCompra))} (+{producto.margenPorcentaje}%)
                        </p>
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4 text-center">
                        {isDeleted ? (
                          <StatusBadge variant="deleted" />
                        ) : producto.activo ? (
                          <StatusBadge variant="active" />
                        ) : (
                          <StatusBadge variant="inactive" />
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onView(producto)}
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                            title="Ver Ficha Técnica y Detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {!isDeleted ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(producto)}
                                className="h-8 w-8 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(producto)}
                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/40 cursor-pointer"
                                title="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRestore(producto)}
                              className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 cursor-pointer"
                              title="Restaurar"
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
