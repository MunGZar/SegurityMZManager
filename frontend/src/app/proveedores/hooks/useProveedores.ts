import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { proveedoresService, Proveedor, CreateProveedorInput, UpdateProveedorInput } from '@/services/proveedores.service';

export function useProveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<string>('nombre');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const loadProveedores = useCallback(async () => {
    setLoading(true);
    try {
      const response = await proveedoresService.getAll({
        search: search.trim() || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
        includeDeleted,
      });
      setProveedores(response.data);
      setTotal(response.total);
    } catch (err: any) {
      toast.error(err.message || 'Error al cargar proveedores');
    } finally {
      setLoading(false);
    }
  }, [search, page, limit, sortBy, sortOrder, includeDeleted]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      loadProveedores();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, includeDeleted, sortBy, sortOrder, limit]);

  // Direct fetch trigger for pagination page changes
  useEffect(() => {
    loadProveedores();
  }, [page]);

  const handleCreate = async (data: CreateProveedorInput) => {
    try {
      await proveedoresService.create(data);
      toast.success('Proveedor creado correctamente');
      loadProveedores();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al crear el proveedor');
      return false;
    }
  };

  const handleUpdate = async (id: string, data: UpdateProveedorInput) => {
    try {
      await proveedoresService.update(id, data);
      toast.success('Proveedor actualizado correctamente');
      loadProveedores();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar el proveedor');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await proveedoresService.delete(id);
      toast.success('Proveedor desactivado correctamente');
      loadProveedores();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar el proveedor');
      return false;
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await proveedoresService.restore(id);
      toast.success('Proveedor restaurado correctamente');
      loadProveedores();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al restaurar el proveedor');
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
    refresh: loadProveedores,
  };
}
