import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { clientesService, Cliente, ClienteStatus, CreateClienteInput, UpdateClienteInput } from '@/services/clientes.service';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<string>('nombre');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<ClienteStatus | undefined>(undefined);
  const [includeDeleted, setIncludeDeleted] = useState(false);

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
      // Reset to page 1 on search change
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

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(1);
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
    refresh: loadClientes,
  };
}
