'use client';

import React, { useState } from 'react';
import { Wrench, Plus, Search, RefreshCw, Calendar as CalendarIcon, Table as TableIcon, Filter } from 'lucide-react';
import { useOrdenesTrabajo } from './hooks/useOrdenesTrabajo';
import { OrdenesTable } from './components/OrdenesTable';
import { OrdenesCalendarView } from './components/OrdenesCalendarView';
import { CreateOrdenFromCotizacionModal } from './components/CreateOrdenFromCotizacionModal';
import { OrdenFormModal } from './components/OrdenFormModal';
import { OrdenDetailsModal } from './components/OrdenDetailsModal';
import { EvidenciasGalleryModal } from './components/EvidenciasGalleryModal';
import { ChangeEstadoOrdenModal } from './components/ChangeEstadoOrdenModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrdenTrabajo, OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@/services/ordenes-trabajo.service';

export default function OrdenesTrabajoPage() {
  const {
    ordenes,
    total,
    loading,
    search,
    setSearch,
    selectedClienteId,
    setSelectedClienteId,
    selectedEstado,
    setSelectedEstado,
    selectedPrioridad,
    setSelectedPrioridad,
    selectedFecha,
    setSelectedFecha,
    includeDeleted,
    setIncludeDeleted,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    sortOrder,
    toggleSort,
    cotizacionesAprobadas,
    clientes,
    handleCreate,
    handleUpdate,
    handleChangeEstado,
    handleAddEvidencia,
    handleDeleteEvidencia,
    handleDelete,
    handleRestore,
    refresh,
  } = useOrdenesTrabajo();

  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEvidenciasModalOpen, setIsEvidenciasModalOpen] = useState(false);
  const [isChangeEstadoModalOpen, setIsChangeEstadoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedOrden, setSelectedOrden] = useState<OrdenTrabajo | null>(null);

  const handleOpenEdit = (orden: OrdenTrabajo) => {
    setSelectedOrden(orden);
    setIsEditModalOpen(true);
  };

  const handleOpenDetails = (orden: OrdenTrabajo) => {
    setSelectedOrden(orden);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEvidencias = (orden: OrdenTrabajo) => {
    setSelectedOrden(orden);
    setIsEvidenciasModalOpen(true);
  };

  const handleOpenChangeEstado = (orden: OrdenTrabajo) => {
    setSelectedOrden(orden);
    setIsChangeEstadoModalOpen(true);
  };

  const handleOpenDelete = (orden: OrdenTrabajo) => {
    setSelectedOrden(orden);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedOrden) {
      const ok = await handleDelete(selectedOrden.id);
      if (ok) {
        setIsDeleteModalOpen(false);
        setSelectedOrden(null);
      }
      return ok;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 font-mono">
            <Wrench className="h-6 w-6 text-indigo-400" /> ÓRDENES DE TRABAJO
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gestión operativa de instalaciones, agendamiento de técnicos y ficha de evidencias.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" /> Tabla
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'calendar' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CalendarIcon className="h-3.5 w-3.5" /> Calendario
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Generar Orden desde Cotización
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-4 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Buscar por folio, cliente, dirección..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 bg-zinc-800 border-zinc-700 text-white text-xs"
            />
          </div>

          {/* Estado Selector */}
          <div>
            <select
              value={selectedEstado}
              onChange={(e) => {
                setSelectedEstado(e.target.value as OrdenTrabajoEstado | '');
                setPage(1);
              }}
              className="w-full h-9 px-3 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="">-- Todos los Estados --</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="PROGRAMADA">Programada</option>
              <option value="EN_PROCESO">En Proceso</option>
              <option value="FINALIZADA">Finalizada</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          {/* Prioridad Selector */}
          <div>
            <select
              value={selectedPrioridad}
              onChange={(e) => {
                setSelectedPrioridad(e.target.value as OrdenTrabajoPrioridad | '');
                setPage(1);
              }}
              className="w-full h-9 px-3 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="">-- Toda Prioridad --</option>
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
              <option value="URGENTE">URGENTE</option>
            </select>
          </div>

          {/* Fecha Programada Filter */}
          <div>
            <Input
              type="date"
              value={selectedFecha}
              onChange={(e) => {
                setSelectedFecha(e.target.value);
                setPage(1);
              }}
              className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
            />
          </div>
        </div>

        {/* Second Row: Cliente & Include Deleted */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-zinc-800/60 text-xs">
          <div className="flex items-center gap-3">
            <select
              value={selectedClienteId}
              onChange={(e) => {
                setSelectedClienteId(e.target.value);
                setPage(1);
              }}
              className="h-8 px-3 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">-- Filtrar por Cliente --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>

            {(search || selectedEstado || selectedPrioridad || selectedFecha || selectedClienteId) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch('');
                  setSelectedEstado('');
                  setSelectedPrioridad('');
                  setSelectedFecha('');
                  setSelectedClienteId('');
                  setPage(1);
                }}
                className="h-8 text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                Limpiar filtros
              </Button>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-200">
            <input
              type="checkbox"
              checked={includeDeleted}
              onChange={(e) => {
                setIncludeDeleted(e.target.checked);
                setPage(1);
              }}
              className="rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Mostrar órdenes eliminadas</span>
          </label>
        </div>
      </div>

      {/* Main Content Area: Table vs Calendar */}
      {viewMode === 'table' ? (
        <OrdenesTable
          ordenes={ordenes}
          total={total}
          page={page}
          limit={limit}
          sortBy={sortBy}
          sortOrder={sortOrder}
          loading={loading}
          onPageChange={setPage}
          onLimitChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
          onSort={toggleSort}
          onView={handleOpenDetails}
          onEdit={handleOpenEdit}
          onChangeEstado={handleOpenChangeEstado}
          onEvidencias={handleOpenEvidencias}
          onDelete={handleOpenDelete}
          onRestore={(ot) => handleRestore(ot.id)}
        />
      ) : (
        <OrdenesCalendarView
          ordenes={ordenes}
          onView={handleOpenDetails}
          onChangeEstado={handleOpenChangeEstado}
        />
      )}

      {/* Modals */}
      <CreateOrdenFromCotizacionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        cotizacionesAprobadas={cotizacionesAprobadas}
        onSubmit={handleCreate}
      />

      <OrdenFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedOrden(null);
        }}
        orden={selectedOrden}
        onSubmit={handleUpdate}
      />

      <OrdenDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedOrden(null);
        }}
        orden={selectedOrden}
      />

      <EvidenciasGalleryModal
        isOpen={isEvidenciasModalOpen}
        onClose={() => {
          setIsEvidenciasModalOpen(false);
          setSelectedOrden(null);
        }}
        orden={selectedOrden}
        onAddEvidencia={handleAddEvidencia}
        onDeleteEvidencia={handleDeleteEvidencia}
      />

      <ChangeEstadoOrdenModal
        isOpen={isChangeEstadoModalOpen}
        onClose={() => {
          setIsChangeEstadoModalOpen(false);
          setSelectedOrden(null);
        }}
        orden={selectedOrden}
        onSubmit={handleChangeEstado}
      />

      <DeleteConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open) setSelectedOrden(null);
        }}
        onConfirm={confirmDelete}
        title="Eliminar Orden de Trabajo"
        description={`¿Estás seguro de que deseas eliminar lógicamente la orden de trabajo ${selectedOrden?.folio}? Esta acción no eliminará los datos de la cotización.`}
      />
    </div>
  );
}
