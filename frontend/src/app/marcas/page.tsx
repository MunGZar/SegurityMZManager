'use client';

import React, { useState } from 'react';
import { Tag, Plus, Search, RefreshCw } from 'lucide-react';
import { useMarcas } from './hooks/useMarcas';
import { MarcaTable } from './components/MarcaTable';
import { MarcaFormModal } from './components/MarcaFormModal';
import { MarcaDetailsModal } from './components/MarcaDetailsModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Marca } from '@/services/marcas.service';
import { MarcaFormValues } from './schemas';

export default function MarcasPage() {
  const {
    marcas,
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
  } = useMarcas();

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null);

  const handleOpenCreate = () => {
    setSelectedMarca(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (marca: Marca) => {
    setSelectedMarca(marca);
    setFormOpen(true);
  };

  const handleOpenView = (marca: Marca) => {
    setSelectedMarca(marca);
    setDetailsOpen(true);
  };

  const handleOpenDelete = (marca: Marca) => {
    setSelectedMarca(marca);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (values: MarcaFormValues) => {
    if (selectedMarca) {
      return await handleUpdate(selectedMarca.id, values);
    } else {
      return await handleCreate(values);
    }
  };

  const confirmDelete = async (): Promise<boolean> => {
    if (selectedMarca) {
      return await handleDelete(selectedMarca.id);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Tag className="h-7 w-7 text-indigo-500" />
            Gestión de Marcas
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Administra los fabricantes y marcas del catálogo de productos.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Marca
        </Button>
      </div>

      {/* Control Bar: Search, Filters & Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar marcas por nombre o descripción..."
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

      {/* Tabla de Marcas */}
      <MarcaTable
        marcas={marcas}
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
        onRestore={(marca) => handleRestore(marca.id)}
      />

      {/* Modales */}
      <MarcaFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedMarca}
      />

      <MarcaDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        marca={selectedMarca}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar Marca?"
        description="La marca cambiará a estado desactivado y eliminado lógicamente. Podrás restaurarla en cualquier momento activando el filtro de eliminados."
        itemName={selectedMarca?.nombre}
        itemLabel="Marca a desactivar"
      />
    </div>
  );
}
