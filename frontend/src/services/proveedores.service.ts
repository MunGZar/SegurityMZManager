import { fetchApi } from '@/lib/api';

export interface Proveedor {
  id: string;
  nombre: string;
  contacto: string | null;
  telefono: string | null;
  whatsapp: string | null;
  correo: string | null;
  ciudad: string | null;
  direccion: string | null;
  observaciones: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateProveedorInput {
  nombre: string;
  contacto?: string;
  telefono?: string;
  whatsapp?: string;
  correo?: string;
  ciudad?: string;
  direccion?: string;
  observaciones?: string;
  activo?: boolean;
}

export interface UpdateProveedorInput {
  nombre?: string;
  contacto?: string;
  telefono?: string;
  whatsapp?: string;
  correo?: string;
  ciudad?: string;
  direccion?: string;
  observaciones?: string;
  activo?: boolean;
}

export interface GetProveedoresParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeDeleted?: boolean;
}

export interface ProveedoresPaginatedResponse {
  data: Proveedor[];
  total: number;
}

export const proveedoresService = {
  getAll: (params?: GetProveedoresParams) => {
    const queryParts: string[] = [];
    if (params) {
      if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (params.page !== undefined) queryParts.push(`page=${params.page}`);
      if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
      if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
      if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
      if (params.includeDeleted) queryParts.push(`includeDeleted=${params.includeDeleted}`);
    }
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return fetchApi<ProveedoresPaginatedResponse>(`/proveedores${query}`);
  },

  getById: (id: string) => {
    return fetchApi<Proveedor>(`/proveedores/${id}`);
  },

  create: (data: CreateProveedorInput) => {
    return fetchApi<Proveedor>('/proveedores', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: UpdateProveedorInput) => {
    return fetchApi<Proveedor>(`/proveedores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return fetchApi<void>(`/proveedores/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string) => {
    return fetchApi<Proveedor>(`/proveedores/${id}/restore`, {
      method: 'POST',
    });
  },
};
