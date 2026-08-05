'use client';

import React, { useState } from 'react';
import { Truck, UserPlus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Proveedor } from '@/services/proveedores.service';

// Modular imports
import { useProveedores } from './hooks/useProveedores';
import { ProveedorTable } from './components/ProveedorTable';
import { ProveedorFormModal } from './components/ProveedorFormModal';
import { ProveedorDetailsModal } from './components/ProveedorDetailsModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';

export default function ProveedoresPage() {
  const {
    proveedores,
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
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
  } = useProveedores();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selected state
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedProveedor(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (proveedor: Proveedor) => {
    setFormMode('edit');
    setSelectedProveedor(proveedor);
    setIsFormOpen(true);
  };

  const handleOpenDetails = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (payload: any) => {
    if (formMode === 'create') {
      return handleCreate(payload);
    } else {
      return handleUpdate(selectedProveedor!.id, payload);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProveedor) return false;
    return handleDelete(selectedProveedor.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Truck className="h-8 w-8 text-indigo-500" />
            Proveedores
          </h1>
          <p className="text-sm text-zinc-400">
            Administración de proveedores de equipos, materiales e insumos de seguridad.
          </p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 gap-2 h-10 px-4 rounded-lg cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      {/* Main card with search and table */}
      <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-lg text-white">Catálogo de Proveedores</CardTitle>
              <CardDescription className="text-zinc-500">
                Filtros avanzados y estado de vigencia comercial.
              </CardDescription>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  placeholder="Buscar por nombre, teléfono, correo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder-zinc-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-lg h-9 w-full"
                />
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
          <ProveedorTable
            proveedores={proveedores}
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
            onRestore={(prov) => handleRestore(prov.id)}
          />
        </CardContent>
      </Card>

      {/* Forms and Action Modals */}
      <ProveedorFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        proveedor={selectedProveedor}
        mode={formMode}
        onSubmit={handleFormSubmit}
      />

      <ProveedorDetailsModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        proveedor={selectedProveedor}
      />

      <DeleteConfirmModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="¿Confirmas la desactivación?"
        description="El proveedor será desactivado lógicamente (soft delete). Sus datos históricos de compras y productos vinculados permanecerán intactos."
        itemName={selectedProveedor?.nombre}
        itemLabel="Proveedor a desactivar"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
