'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, RefreshCw, Filter } from 'lucide-react';
import { useCotizaciones } from './hooks/useCotizaciones';
import { CotizacionTable } from './components/CotizacionTable';
import { CotizacionFormModal } from './components/CotizacionFormModal';
import { CotizacionDetailsModal } from './components/CotizacionDetailsModal';
import { ChangeEstadoModal } from './components/ChangeEstadoModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cotizacion, CotizacionEstado } from '@/services/cotizaciones.service';

export default function CotizacionesPage() {
  const {
    cotizaciones,
    total,
    loading,
    search,
    setSearch,
    selectedClienteId,
    setSelectedClienteId,
    selectedEstado,
    setSelectedEstado,
    includeDeleted,
    setIncludeDeleted,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    sortOrder,
    toggleSort,
    clientes,
    productos,
    handleCreate,
    handleUpdate,
    handleChangeEstado,
    handleDuplicate,
    handleDelete,
    handleRestore,
    refresh,
  } = useCotizaciones();

  // Modal States
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [estadoModalOpen, setEstadoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);

  const handleOpenCreate = () => {
    setSelectedCotizacion(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (cot: Cotizacion) => {
    setSelectedCotizacion(cot);
    setFormOpen(true);
  };

  const handleOpenView = (cot: Cotizacion) => {
    setSelectedCotizacion(cot);
    setDetailsOpen(true);
  };

  const handleOpenChangeEstado = (cot: Cotizacion) => {
    setSelectedCotizacion(cot);
    setEstadoModalOpen(true);
  };

  const handleOpenDelete = (cot: Cotizacion) => {
    setSelectedCotizacion(cot);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    if (selectedCotizacion) {
      return await handleUpdate(selectedCotizacion.id, values);
    } else {
      return await handleCreate(values);
    }
  };

  const confirmDelete = async (): Promise<boolean> => {
    if (selectedCotizacion) {
      return await handleDelete(selectedCotizacion.id);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileText className="h-7 w-7 text-indigo-500" />
            Gestión de Cotizaciones
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Crea y administra ofertas comerciales para tus clientes con productos del catálogo e ítems de servicios.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Cotización
        </Button>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por Folio, Cliente o RUT/ID..."
              className="pl-9 bg-zinc-950/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 bg-zinc-950/40 border border-zinc-800/60 px-3 py-1.5 rounded-lg cursor-pointer">
              <span className="text-xs text-zinc-400 font-medium">Mostrar eliminadas</span>
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

        {/* Dropdown Filters: Cliente y Estado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <select
              value={selectedClienteId}
              onChange={(e) => setSelectedClienteId(e.target.value)}
              className="w-full h-8 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 px-2.5 focus:border-indigo-500"
            >
              <option value="">Todos los Clientes</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <select
              value={selectedEstado}
              onChange={(e) => setSelectedEstado(e.target.value as any)}
              className="w-full h-8 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 px-2.5 focus:border-indigo-500"
            >
              <option value="">Todos los Estados</option>
              <option value="BORRADOR">Borrador</option>
              <option value="ENVIADA">Enviada</option>
              <option value="APROBADA">Aprobada</option>
              <option value="RECHAZADA">Rechazada</option>
              <option value="VENCIDA">Vencida</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Cotizaciones */}
      <CotizacionTable
        cotizaciones={cotizaciones}
        total={total}
        page={page}
        limit={limit}
        sortBy={sortBy}
        sortOrder={sortOrder}
        loading={loading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSort={toggleSort}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onChangeEstado={handleOpenChangeEstado}
        onDuplicate={(cot) => handleDuplicate(cot.id)}
        onDelete={handleOpenDelete}
        onRestore={(cot) => handleRestore(cot.id)}
      />

      {/* Modales */}
      <CotizacionFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedCotizacion}
        clientes={clientes}
        productos={productos}
      />

      <CotizacionDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        cotizacion={selectedCotizacion}
      />

      <ChangeEstadoModal
        open={estadoModalOpen}
        onOpenChange={setEstadoModalOpen}
        cotizacion={selectedCotizacion}
        onConfirm={handleChangeEstado}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar Cotización?"
        description="La cotización se moverá a eliminadas (Soft Delete). Podrás restaurarla activando el filtro correspondiente."
        itemName={selectedCotizacion?.folio}
        itemLabel="Folio a desactivar"
      />
    </div>
  );
}
