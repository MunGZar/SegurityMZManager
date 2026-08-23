import { fetchApi } from '@/lib/api';

export type CotizacionEstado = 'BORRADOR' | 'ENVIADA' | 'APROBADA' | 'RECHAZADA' | 'VENCIDA';
export type CotizacionDetalleTipo = 'PRODUCTO' | 'SERVICIO';

export interface CotizacionDetalle {
  id?: string;
  cotizacionId?: string;
  productoId?: string | null;
  tipo: CotizacionDetalleTipo;
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
}

export interface Cotizacion {
  id: string;
  folio: string;
  clienteId: string;
  fecha: string;
  estado: CotizacionEstado;
  observaciones?: string | null;
  subtotal: number | string;
  descuento: number | string;
  total: number | string;
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
  detalles: CotizacionDetalle[];
}

export interface PaginatedCotizacionesResponse {
  data: Cotizacion[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetCotizacionesParams {
  page?: number;
  limit?: number;
  search?: string;
  clienteId?: string;
  estado?: CotizacionEstado;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeDeleted?: boolean;
}

export interface CreateCotizacionDetallePayload {
  productoId?: string;
  tipo: CotizacionDetalleTipo;
  nombre: string;
  descripcion?: string;
  cantidad: number;
  precioUnit: number;
}

export interface CreateCotizacionPayload {
  clienteId: string;
  observaciones?: string;
  descuento?: number;
  estado?: CotizacionEstado;
  detalles: CreateCotizacionDetallePayload[];
}

export interface UpdateCotizacionPayload {
  clienteId?: string;
  observaciones?: string;
  descuento?: number;
  estado?: CotizacionEstado;
  detalles?: CreateCotizacionDetallePayload[];
}

export const cotizacionesService = {
  getAll: (params: GetCotizacionesParams = {}): Promise<PaginatedCotizacionesResponse> => {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.clienteId) queryParts.push(`clienteId=${encodeURIComponent(params.clienteId)}`);
    if (params.estado) queryParts.push(`estado=${encodeURIComponent(params.estado)}`);
    if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
    if (params.includeDeleted) queryParts.push(`includeDeleted=${params.includeDeleted}`);
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

    return fetchApi<PaginatedCotizacionesResponse>(`/cotizaciones${query}`);
  },

  getById: (id: string): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>(`/cotizaciones/${id}`);
  },

  create: (payload: CreateCotizacionPayload): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>('/cotizaciones', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: (id: string, payload: UpdateCotizacionPayload): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>(`/cotizaciones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  changeEstado: (id: string, estado: CotizacionEstado): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>(`/cotizaciones/${id}/estado`, {
      method: 'PATCH',
      body: JSON.stringify({ estado }),
    });
  },

  duplicate: (id: string): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>(`/cotizaciones/${id}/duplicar`, {
      method: 'POST',
    });
  },

  delete: (id: string): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>(`/cotizaciones/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string): Promise<Cotizacion> => {
    return fetchApi<Cotizacion>(`/cotizaciones/${id}/restaurar`, {
      method: 'PATCH',
    });
  },
};
