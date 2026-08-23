import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { clientesService, Cliente, ClienteStatus, CreateClienteInput, UpdateClienteInput } from '@/services/clientes.service';
import { useTableState } from '@/hooks/useTableState';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ClienteStatus | undefined>(undefined);

  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
  } = useTableState({ initialSortBy: 'nombre' });

  const loadClientes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await clientesService.getAll({
        search: search.trim() || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
        status: statusFilter,
        includeDeleted,
      });
      setClientes(response.data);
      setTotal(response.total);
    } catch (err: any) {
      toast.error(err.message || 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  }, [search, page, limit, sortBy, sortOrder, statusFilter, includeDeleted]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      loadClientes();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, statusFilter, includeDeleted, sortBy, sortOrder, limit]);

  // Direct fetch trigger for pagination page changes
  useEffect(() => {
    loadClientes();
  }, [page]);

  const handleCreate = async (data: CreateClienteInput) => {
    try {
      await clientesService.create(data);
      toast.success('Cliente creado correctamente');
      loadClientes();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al crear el cliente');
      return false;
    }
  };

  const handleUpdate = async (id: string, data: UpdateClienteInput) => {
    try {
      await clientesService.update(id, data);
      toast.success('Cliente actualizado correctamente');
      loadClientes();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar el cliente');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await clientesService.delete(id);
      toast.success('Cliente eliminado (soft delete) correctamente');
      loadClientes();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar el cliente');
      return false;
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await clientesService.restore(id);
      toast.success('Cliente restaurado correctamente');
      loadClientes();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al restaurar el cliente');
      return false;
    }
  };

  return {
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
    setSortBy,
    sortOrder,
    setSortOrder,
    statusFilter,
    setStatusFilter,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    refresh: loadClientes,
  };
}
