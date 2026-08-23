import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  cotizacionesService,
  Cotizacion,
  CotizacionEstado,
  CreateCotizacionPayload,
  UpdateCotizacionPayload,
} from '@/services/cotizaciones.service';
import { clientesService, Cliente } from '@/services/clientes.service';
import { productosService, Producto } from '@/services/productos.service';

export function useCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filtros y paginación
  const [search, setSearch] = useState('');
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<CotizacionEstado | ''>('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Catálogos auxiliares
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [catalogsLoading, setCatalogsLoading] = useState(false);

  const fetchCotizaciones = useCallback(async () => {
    try {
      setLoading(true);
      const res = await cotizacionesService.getAll({
        page,
        limit,
        search: search.trim() || undefined,
        clienteId: selectedClienteId || undefined,
        estado: selectedEstado || undefined,
        includeDeleted,
        sortBy,
        sortOrder,
      });
      setCotizaciones(res.data);
      setTotal(res.total);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al cargar cotizaciones');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedClienteId, selectedEstado, includeDeleted, sortBy, sortOrder]);

  const fetchCatalogs = useCallback(async () => {
    try {
      setCatalogsLoading(true);
      const [resClientes, resProductos] = await Promise.all([
        clientesService.getAll({ limit: 100 }),
        productosService.getAll({ limit: 200 }),
      ]);
      setClientes(resClientes.data);
      setProductos(resProductos.data);
    } catch (err) {
      console.error('Error al cargar catálogos auxiliares', err);
    } finally {
      setCatalogsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCotizaciones();
  }, [fetchCotizaciones]);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const handleCreate = async (payload: CreateCotizacionPayload): Promise<boolean> => {
    try {
      await cotizacionesService.create(payload);
      toast.success('Cotización creada exitosamente');
      fetchCotizaciones();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al crear cotización');
      return false;
    }
  };

  const handleUpdate = async (id: string, payload: UpdateCotizacionPayload): Promise<boolean> => {
    try {
      await cotizacionesService.update(id, payload);
      toast.success('Cotización actualizada exitosamente');
      fetchCotizaciones();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al actualizar cotización');
      return false;
    }
  };

  const handleChangeEstado = async (id: string, estado: CotizacionEstado): Promise<boolean> => {
    try {
      await cotizacionesService.changeEstado(id, estado);
      toast.success(`Estado cambiado a ${estado}`);
      fetchCotizaciones();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al cambiar estado');
      return false;
    }
  };

  const handleDuplicate = async (id: string): Promise<boolean> => {
    try {
      const nueva = await cotizacionesService.duplicate(id);
      toast.success(`Cotización duplicada como ${nueva.folio}`);
      fetchCotizaciones();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al duplicar cotización');
      return false;
    }
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      await cotizacionesService.delete(id);
      toast.success('Cotización eliminada de forma lógica');
      fetchCotizaciones();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al eliminar cotización');
      return false;
    }
  };

  const handleRestore = async (id: string): Promise<boolean> => {
    try {
      await cotizacionesService.restore(id);
      toast.success('Cotización restaurada exitosamente');
      fetchCotizaciones();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al restaurar cotización');
      return false;
    }
  };

  return {
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
    catalogsLoading,
    handleCreate,
    handleUpdate,
    handleChangeEstado,
    handleDuplicate,
    handleDelete,
    handleRestore,
    refresh: fetchCotizaciones,
  };
}
