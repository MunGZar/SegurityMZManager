import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { categoriasService, Categoria, CreateCategoriaInput, UpdateCategoriaInput } from '@/services/categorias.service';
import { useTableState } from '@/hooks/useTableState';

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
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

  const loadCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const response = await categoriasService.getAll({
        search: search.trim() || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
        includeDeleted,
      });
      setCategorias(response.data);
      setTotal(response.total);
    } catch (err: any) {
      toast.error(err.message || 'Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }, [search, page, limit, sortBy, sortOrder, includeDeleted]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      loadCategorias();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, includeDeleted, sortBy, sortOrder, limit]);

  useEffect(() => {
    loadCategorias();
  }, [page]);

  const handleCreate = async (data: CreateCategoriaInput) => {
    try {
      await categoriasService.create(data);
      toast.success('Categoría creada correctamente');
      loadCategorias();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al crear la categoría');
      return false;
    }
  };

  const handleUpdate = async (id: string, data: UpdateCategoriaInput) => {
    try {
      await categoriasService.update(id, data);
      toast.success('Categoría actualizada correctamente');
      loadCategorias();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar la categoría');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoriasService.delete(id);
      toast.success('Categoría eliminada (desactivada) correctamente');
      loadCategorias();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar la categoría');
      return false;
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await categoriasService.restore(id);
      toast.success('Categoría restaurada correctamente');
      loadCategorias();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al restaurar la categoría');
      return false;
    }
  };

  return {
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
    refresh: loadCategorias,
  };
}
