'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, RefreshCw, Filter } from 'lucide-react';
import { useProductos } from './hooks/useProductos';
import { ProductoTable } from './components/ProductoTable';
import { ProductoFormModal } from './components/ProductoFormModal';
import { ProductoDetailsModal } from './components/ProductoDetailsModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Producto } from '@/services/productos.service';
import { ProductoFormValues } from './schemas';

export default function ProductosPage() {
  const {
    productos,
    total,
    loading,
    search,
    setSearch,
    selectedMarcaId,
    setSelectedMarcaId,
    selectedCategoriaId,
    setSelectedCategoriaId,
    selectedProveedorId,
    setSelectedProveedorId,
    marcas,
    categorias,
    proveedores,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    refresh,
  } = useProductos();

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);

  const handleOpenCreate = () => {
    setSelectedProducto(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (producto: Producto) => {
    setSelectedProducto(producto);
    setFormOpen(true);
  };

  const handleOpenView = (producto: Producto) => {
    setSelectedProducto(producto);
    setDetailsOpen(true);
  };

  const handleOpenDelete = (producto: Producto) => {
    setSelectedProducto(producto);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (values: ProductoFormValues) => {
    if (selectedProducto) {
      return await handleUpdate(selectedProducto.id, values);
    } else {
      return await handleCreate(values);
    }
  };

  const confirmDelete = async (): Promise<boolean> => {
    if (selectedProducto) {
      return await handleDelete(selectedProducto.id);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Package className="h-7 w-7 text-indigo-500" />
            Catálogo de Productos
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Administra el catálogo maestro de insumos, equipos de seguridad y listas de precios.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Control Bar: Search & Catalog Filters */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, código interno (SKU) o modelo..."
              className="pl-9 bg-zinc-950/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 bg-zinc-950/40 border border-zinc-800/60 px-3 py-1.5 rounded-lg cursor-pointer">
              <span className="text-xs text-zinc-400 font-medium">Mostrar eliminados</span>
              <input
                type="checkbox"
                checked={includeDeleted}
                onChange={(e) => setIncludeDeleted(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900"
              />
            </label>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => refresh()}
              className="text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-800 cursor-pointer"
              title="Recargar listado"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dropdown Filters: Marca, Categoría, Proveedor */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <select
              value={selectedMarcaId}
              onChange={(e) => setSelectedMarcaId(e.target.value)}
              className="w-full h-8 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 px-2.5 focus:border-indigo-500"
            >
              <option value="">Todas las Marcas</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <select
              value={selectedCategoriaId}
              onChange={(e) => setSelectedCategoriaId(e.target.value)}
              className="w-full h-8 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 px-2.5 focus:border-indigo-500"
            >
              <option value="">Todas las Categorías</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <select
              value={selectedProveedorId}
              onChange={(e) => setSelectedProveedorId(e.target.value)}
              className="w-full h-8 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 px-2.5 focus:border-indigo-500"
            >
              <option value="">Todos los Proveedores</option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      <ProductoTable
        productos={productos}
        total={total}
        page={page}
        limit={limit}
        sortBy={sortBy}
        sortOrder="asc"
        loading={loading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSort={toggleSort}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onRestore={(producto) => handleRestore(producto.id)}
      />

      {/* Modales */}
      <ProductoFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedProducto}
        marcas={marcas}
        categorias={categorias}
        proveedores={proveedores}
      />

      <ProductoDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        producto={selectedProducto}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar Producto?"
        description="El producto pasará a estado inactivo y eliminado lógicamente. Podrás restaurarlo en cualquier momento activando el filtro de eliminados."
        itemName={selectedProducto?.nombre}
        itemLabel="Producto a desactivar"
      />
    </div>
  );
}
