import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { marcasService, Marca, CreateMarcaInput, UpdateMarcaInput } from '@/services/marcas.service';
import { useTableState } from '@/hooks/useTableState';

export function useMarcas() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const loadMarcas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await marcasService.getAll({
        search: search.trim() || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
        includeDeleted,
      });
      setMarcas(response.data);
      setTotal(response.total);
    } catch (err: any) {
      toast.error(err.message || 'Error al cargar marcas');
    } finally {
      setLoading(false);
    }
  }, [search, page, limit, sortBy, sortOrder, includeDeleted]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      loadMarcas();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, includeDeleted, sortBy, sortOrder, limit]);

  useEffect(() => {
    loadMarcas();
  }, [page]);

  const handleCreate = async (data: CreateMarcaInput) => {
    try {
      await marcasService.create(data);
      toast.success('Marca creada correctamente');
      loadMarcas();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al crear la marca');
      return false;
    }
  };

  const handleUpdate = async (id: string, data: UpdateMarcaInput) => {
    try {
      await marcasService.update(id, data);
      toast.success('Marca actualizada correctamente');
      loadMarcas();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar la marca');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await marcasService.delete(id);
      toast.success('Marca eliminada (desactivada) correctamente');
      loadMarcas();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar la marca');
      return false;
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await marcasService.restore(id);
      toast.success('Marca restaurada correctamente');
      loadMarcas();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al restaurar la marca');
      return false;
    }
  };

  return {
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
    setSortBy,
    sortOrder,
    setSortOrder,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    refresh: loadMarcas,
  };
}
