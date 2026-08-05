'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Search, Eye, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cliente, ClienteStatus } from '@/services/clientes.service';

// Modular imports
import { useClientes } from './hooks/useClientes';
import { ClienteTable } from './components/ClienteTable';
import { ClienteFormModal } from './components/ClienteFormModal';
import { ClienteDetailsModal } from './components/ClienteDetailsModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';

export default function ClientesPage() {
  const {
    clientes,
    total,
    loading,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    sortOrder,
    statusFilter,
    setStatusFilter,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
  } = useClientes();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selected client state
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedCliente(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cliente: Cliente) => {
    setFormMode('edit');
    setSelectedCliente(cliente);
    setIsFormOpen(true);
  };

  const handleOpenDetails = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (payload: any) => {
    if (formMode === 'create') {
      return handleCreate(payload);
    } else {
      return handleUpdate(selectedCliente!.id, payload);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCliente) return false;
    return handleDelete(selectedCliente.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Users className="h-8 w-8 text-indigo-500" />
            Clientes
          </h1>
          <p className="text-sm text-zinc-400">
            Administra la cartera de clientes de venta e instalación con soporte completo de filtros.
          </p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 gap-2 h-10 px-4 rounded-lg cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Filter and search bar Card */}
      <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-lg text-white">Listado de Clientes</CardTitle>
              <CardDescription className="text-zinc-500">
                Búsqueda dinámica y paginada en tiempo real.
              </CardDescription>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  placeholder="Buscar por nombre, teléfono, dirección..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder-zinc-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-lg h-9 w-full"
                />
              </div>

              {/* Status filter dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-zinc-500 shrink-0" />
                <select
                  value={statusFilter || ''}
                  onChange={(e) => setStatusFilter(e.target.value ? (e.target.value as ClienteStatus) : undefined)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 h-9 w-full sm:w-auto"
                >
                  <option value="">Todos los Estados</option>
                  <option value="PROSPECTO">Prospecto</option>
                  <option value="ACTIVO">Cliente Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
              </div>

              {/* Include Deleted Switch */}
              <label className="flex items-center gap-2 text-xs text-zinc-400 select-none cursor-pointer bg-zinc-950/40 border border-zinc-850 px-3 py-2 rounded-lg h-9">
                <input
                  type="checkbox"
                  checked={includeDeleted}
                  onChange={(e) => setIncludeDeleted(e.target.checked)}
                  className="rounded border-zinc-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900 bg-zinc-950 h-4 w-4"
                />
                <span>Mostrar eliminados</span>
              </label>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-0 sm:px-6">
          <ClienteTable
            clientes={clientes}
            total={total}
            page={page}
            limit={limit}
            sortBy={sortBy}
            sortOrder={sortOrder}
            loading={loading}
            onPageChange={setPage}
            onLimitChange={setLimit}
            onSort={toggleSort}
            onView={handleOpenDetails}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onRestore={(cliente) => handleRestore(cliente.id)}
          />
        </CardContent>
      </Card>

      {/* Forms and Action Modals */}
      <ClienteFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        cliente={selectedCliente}
        mode={formMode}
        onSubmit={handleFormSubmit}
      />

      <ClienteDetailsModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        cliente={selectedCliente}
      />

      <DeleteConfirmModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="¿Confirmas la desactivación?"
        description="El cliente será desactivado (eliminación lógica). Podrá restaurarse en el futuro y sus datos históricos de cotizaciones e instalaciones no se perderán."
        itemName={selectedCliente?.nombre}
        itemLabel="Cliente a desactivar"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
