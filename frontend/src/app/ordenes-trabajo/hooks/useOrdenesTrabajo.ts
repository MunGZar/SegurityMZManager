import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  ordenesTrabajoService,
  OrdenTrabajo,
  OrdenTrabajoEstado,
  OrdenTrabajoPrioridad,
  CreateOrdenTrabajoPayload,
  UpdateOrdenTrabajoPayload,
  AddEvidenciaPayload,
} from '@/services/ordenes-trabajo.service';
import { cotizacionesService, Cotizacion } from '@/services/cotizaciones.service';
import { clientesService, Cliente } from '@/services/clientes.service';

export function useOrdenesTrabajo() {
  const [ordenes, setOrdenes] = useState<OrdenTrabajo[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filtros y paginación
  const [search, setSearch] = useState('');
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<OrdenTrabajoEstado | ''>('');
  const [selectedPrioridad, setSelectedPrioridad] = useState<OrdenTrabajoPrioridad | ''>('');
  const [selectedFecha, setSelectedFecha] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Catálogos auxiliares
  const [cotizacionesAprobadas, setCotizacionesAprobadas] = useState<Cotizacion[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [catalogsLoading, setCatalogsLoading] = useState(false);

  const fetchOrdenes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ordenesTrabajoService.getAll({
        page,
        limit,
        search: search.trim() || undefined,
        clienteId: selectedClienteId || undefined,
        estado: selectedEstado || undefined,
        prioridad: selectedPrioridad || undefined,
        fechaProgramada: selectedFecha || undefined,
        includeDeleted,
        sortBy,
        sortOrder,
      });
      setOrdenes(res.data);
      setTotal(res.total);
    } catch (err: any) {
      toast.error(err?.message || 'Error al cargar órdenes de trabajo');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedClienteId, selectedEstado, selectedPrioridad, selectedFecha, includeDeleted, sortBy, sortOrder]);

  const fetchCatalogs = useCallback(async () => {
    try {
      setCatalogsLoading(true);
      const [resCot, resCli] = await Promise.all([
        cotizacionesService.getAll({ estado: 'APROBADA', limit: 100 }),
        clientesService.getAll({ limit: 100 }),
      ]);
      setCotizacionesAprobadas(resCot.data);
      setClientes(resCli.data);
    } catch (err) {
      console.error('Error al cargar catálogos', err);
    } finally {
      setCatalogsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrdenes();
  }, [fetchOrdenes]);

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

  const handleCreate = async (payload: CreateOrdenTrabajoPayload): Promise<boolean> => {
    try {
      const nueva = await ordenesTrabajoService.create(payload);
      toast.success(`Orden de Trabajo ${nueva.folio} creada exitosamente`);
      fetchOrdenes();
      fetchCatalogs(); // Refrescar cotizaciones aprobadas
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al generar Orden de Trabajo');
      return false;
    }
  };

  const handleUpdate = async (id: string, payload: UpdateOrdenTrabajoPayload): Promise<boolean> => {
    try {
      await ordenesTrabajoService.update(id, payload);
      toast.success('Orden de Trabajo actualizada');
      fetchOrdenes();
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al actualizar Orden de Trabajo');
      return false;
    }
  };

  const handleChangeEstado = async (id: string, estado: OrdenTrabajoEstado): Promise<boolean> => {
    try {
      await ordenesTrabajoService.changeEstado(id, estado);
      toast.success(`Estado actualizado a ${estado}`);
      fetchOrdenes();
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al cambiar estado');
      return false;
    }
  };

  const handleAddEvidencia = async (id: string, payload: AddEvidenciaPayload): Promise<boolean> => {
    try {
      await ordenesTrabajoService.addEvidencia(id, payload);
      toast.success('Evidencia técnica registrada');
      fetchOrdenes();
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al registrar evidencia');
      return false;
    }
  };

  const handleDeleteEvidencia = async (evidenciaId: string): Promise<boolean> => {
    try {
      await ordenesTrabajoService.deleteEvidencia(evidenciaId);
      toast.success('Evidencia eliminada');
      fetchOrdenes();
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al eliminar evidencia');
      return false;
    }
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      await ordenesTrabajoService.delete(id);
      toast.success('Orden de trabajo eliminada lógicamente');
      fetchOrdenes();
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al eliminar orden de trabajo');
      return false;
    }
  };

  const handleRestore = async (id: string): Promise<boolean> => {
    try {
      await ordenesTrabajoService.restore(id);
      toast.success('Orden de trabajo restaurada');
      fetchOrdenes();
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Error al restaurar orden de trabajo');
      return false;
    }
  };

  return {
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
    catalogsLoading,
    handleCreate,
    handleUpdate,
    handleChangeEstado,
    handleAddEvidencia,
    handleDeleteEvidencia,
    handleDelete,
    handleRestore,
    refresh: fetchOrdenes,
  };
}
