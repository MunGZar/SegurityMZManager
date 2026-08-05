import { fetchApi } from '@/lib/api';

export type ClienteStatus = 'PROSPECTO' | 'ACTIVO' | 'INACTIVO';

export interface Cliente {
  id: string;
  nombre: string;
  identificacion: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  notas: string | null;
  status: ClienteStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateClienteInput {
  nombre: string;
  identificacion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  notas?: string;
  status?: ClienteStatus;
}

export interface UpdateClienteInput {
  nombre?: string;
  identificacion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  notas?: string;
  status?: ClienteStatus;
}

export interface GetClientesParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: ClienteStatus;
  includeDeleted?: boolean;
}

export interface ClientesPaginatedResponse {
  data: Cliente[];
  total: number;
}

export const clientesService = {
  getAll: (params?: GetClientesParams) => {
    const queryParts: string[] = [];
    if (params) {
      if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (params.page !== undefined) queryParts.push(`page=${params.page}`);
      if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
      if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
      if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
      if (params.status) queryParts.push(`status=${params.status}`);
      if (params.includeDeleted) queryParts.push(`includeDeleted=${params.includeDeleted}`);
    }
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return fetchApi<ClientesPaginatedResponse>(`/clientes${query}`);
  },

  getById: (id: string) => {
    return fetchApi<Cliente>(`/clientes/${id}`);
  },

  create: (data: CreateClienteInput) => {
    return fetchApi<Cliente>('/clientes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: UpdateClienteInput) => {
    return fetchApi<Cliente>(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return fetchApi<void>(`/clientes/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string) => {
    return fetchApi<Cliente>(`/clientes/${id}/restore`, {
      method: 'POST',
    });
  },
};
