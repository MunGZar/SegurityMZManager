import { fetchApi } from '@/lib/api';

export type OrdenTrabajoEstado = 'PENDIENTE' | 'PROGRAMADA' | 'EN_PROCESO' | 'FINALIZADA' | 'CANCELADA';
export type OrdenTrabajoPrioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
export type TipoEvidencia = 'ANTES' | 'DESPUES' | 'ACTA_ENTREGA' | 'OTRO';

export interface OrdenTrabajoEvidencia {
  id: string;
  ordenTrabajoId: string;
  tipo: TipoEvidencia;
  url: string;
  descripcion?: string | null;
  createdAt: string;
}

export interface OrdenTrabajo {
  id: string;
  folio: string;
  cotizacionId: string;
  clienteId: string;
  fechaProgramada?: string | null;
  horaProgramada?: string | null;
  estado: OrdenTrabajoEstado;
  prioridad: OrdenTrabajoPrioridad;
  observaciones?: string | null;
  direccion?: string | null;

  // Ficha Técnica
  observacionesTecnicas?: string | null;
  serialesEquipos?: string | null;
  usuarioDvr?: string | null;
  passwordDvrEncrypted?: string | null;
  direccionIp?: string | null;
  garantiaMeses: number;
  fechaEntrega?: string | null;

  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;

  cliente: {
    id: string;
    nombre: string;
    identificacion?: string | null;
    email?: string | null;
    telefono?: string | null;
    direccion?: string | null;
  };
  cotizacion: {
    id: string;
    folio: string;
    fecha: string;
    total: number | string;
    observaciones?: string | null;
    detalles: Array<{
      id: string;
      tipo: 'PRODUCTO' | 'SERVICIO';
      nombre: string;
      descripcion?: string | null;
      cantidad: number;
      precioUnit: number | string;
      subtotal: number | string;
      producto?: {
        id: string;
        codigoInterno: string;
        nombre: string;
        modelo?: string | null;
        marca?: { nombre: string } | null;
      } | null;
    }>;
  };
  evidencias: OrdenTrabajoEvidencia[];
}

export interface PaginatedOrdenesTrabajoResponse {
  data: OrdenTrabajo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetOrdenesTrabajoParams {
  page?: number;
  limit?: number;
  search?: string;
  clienteId?: string;
  estado?: OrdenTrabajoEstado;
  prioridad?: OrdenTrabajoPrioridad;
  fechaProgramada?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeDeleted?: boolean;
}

export interface CreateOrdenTrabajoPayload {
  cotizacionId: string;
  fechaProgramada?: string;
  horaProgramada?: string;
  estado?: OrdenTrabajoEstado;
  prioridad?: OrdenTrabajoPrioridad;
  observaciones?: string;
  direccion?: string;
}

export interface UpdateOrdenTrabajoPayload {
  fechaProgramada?: string;
  horaProgramada?: string;
  estado?: OrdenTrabajoEstado;
  prioridad?: OrdenTrabajoPrioridad;
  observaciones?: string;
  direccion?: string;
  observacionesTecnicas?: string;
  serialesEquipos?: string;
  usuarioDvr?: string;
  passwordDvrEncrypted?: string;
  direccionIp?: string;
  garantiaMeses?: number;
  fechaEntrega?: string;
}

export interface AddEvidenciaPayload {
  tipo: TipoEvidencia;
  url: string;
  descripcion?: string;
}

export const ordenesTrabajoService = {
  getAll: (params: GetOrdenesTrabajoParams = {}): Promise<PaginatedOrdenesTrabajoResponse> => {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.clienteId) queryParts.push(`clienteId=${encodeURIComponent(params.clienteId)}`);
    if (params.estado) queryParts.push(`estado=${encodeURIComponent(params.estado)}`);
    if (params.prioridad) queryParts.push(`prioridad=${encodeURIComponent(params.prioridad)}`);
    if (params.fechaProgramada) queryParts.push(`fechaProgramada=${encodeURIComponent(params.fechaProgramada)}`);
    if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
    if (params.includeDeleted) queryParts.push(`includeDeleted=${params.includeDeleted}`);
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

    return fetchApi<PaginatedOrdenesTrabajoResponse>(`/ordenes-trabajo${query}`);
  },

  getById: (id: string): Promise<OrdenTrabajo> => {
    return fetchApi<OrdenTrabajo>(`/ordenes-trabajo/${id}`);
  },

  create: (payload: CreateOrdenTrabajoPayload): Promise<OrdenTrabajo> => {
    return fetchApi<OrdenTrabajo>('/ordenes-trabajo', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: (id: string, payload: UpdateOrdenTrabajoPayload): Promise<OrdenTrabajo> => {
    return fetchApi<OrdenTrabajo>(`/ordenes-trabajo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  changeEstado: (id: string, estado: OrdenTrabajoEstado): Promise<OrdenTrabajo> => {
    return fetchApi<OrdenTrabajo>(`/ordenes-trabajo/${id}/estado`, {
      method: 'PATCH',
      body: JSON.stringify({ estado }),
    });
  },

  addEvidencia: (ordenTrabajoId: string, payload: AddEvidenciaPayload): Promise<OrdenTrabajoEvidencia> => {
    return fetchApi<OrdenTrabajoEvidencia>(`/ordenes-trabajo/${ordenTrabajoId}/evidencias`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  deleteEvidencia: (evidenciaId: string): Promise<void> => {
    return fetchApi<void>(`/ordenes-trabajo/evidencias/${evidenciaId}`, {
      method: 'DELETE',
    });
  },

  delete: (id: string): Promise<OrdenTrabajo> => {
    return fetchApi<OrdenTrabajo>(`/ordenes-trabajo/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string): Promise<OrdenTrabajo> => {
    return fetchApi<OrdenTrabajo>(`/ordenes-trabajo/${id}/restaurar`, {
      method: 'PATCH',
    });
  },
};
