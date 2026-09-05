'use client';

import React, { useState } from 'react';
import { Layers, Plus, Search, RefreshCw } from 'lucide-react';
import { useCategorias } from './hooks/useCategorias';
import { CategoriaTable } from './components/CategoriaTable';
import { CategoriaFormModal } from './components/CategoriaFormModal';
import { CategoriaDetailsModal } from './components/CategoriaDetailsModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Categoria } from '@/services/categorias.service';
import { CategoriaFormValues } from './schemas';

export default function CategoriasPage() {
  const {
    categorias,
    total,
    loading,
    search,
    setSearch,
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
  } = useCategorias();

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);

  const handleOpenCreate = () => {
    setSelectedCategoria(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setFormOpen(true);
  };

  const handleOpenView = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setDetailsOpen(true);
  };

  const handleOpenDelete = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (values: CategoriaFormValues) => {
    if (selectedCategoria) {
      return await handleUpdate(selectedCategoria.id, values);
    } else {
      return await handleCreate(values);
    }
  };

  const confirmDelete = async (): Promise<boolean> => {
    if (selectedCategoria) {
      return await handleDelete(selectedCategoria.id);
    }
    return false;
  };

  return (
          <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Layers className="h-7 w-7 text-indigo-500" />
            Gestión de Categorías
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Administra las clasificaciones y tipos de productos y servicios del catálogo.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {/* Control Bar: Search, Filters & Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categorías por nombre o descripción..."
            className="pl-9 bg-zinc-950/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
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
        /* Tabla de Categorías modificacion en las categorias las que probocaba el bug */
      {/* Tabla de Categorías */}
      <CategoriaTable
        categorias={categorias}
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
        onRestore={(categoria) => handleRestore(categoria.id)}
      />

      {/* Modales */}
      <CategoriaFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedCategoria}
      />

      <CategoriaDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        categoria={selectedCategoria}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar Categoría?"
        description="La categoría cambiará a estado desactivado y eliminado lógicamente. Podrás restaurarla en cualquier momento activando el filtro de eliminados."
        itemName={selectedCategoria?.nombre}
        itemLabel="Categoría a desactivar"
      />
    </div>
  );
}
