import { fetchApi } from '@/lib/api';

export interface Marca {
  id: string;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateMarcaInput {
  nombre: string;
  descripcion?: string;
  activo?: boolean;
}

export interface UpdateMarcaInput {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}

export interface GetMarcasParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeDeleted?: boolean;
}

export interface MarcasPaginatedResponse {
  data: Marca[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const marcasService = {
  getAll: (params?: GetMarcasParams) => {
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
    return fetchApi<MarcasPaginatedResponse>(`/marcas${query}`);
  },

  getById: (id: string) => {
    return fetchApi<Marca>(`/marcas/${id}`);
  },

  create: (data: CreateMarcaInput) => {
    return fetchApi<Marca>('/marcas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: UpdateMarcaInput) => {
    return fetchApi<Marca>(`/marcas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return fetchApi<void>(`/marcas/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string) => {
    return fetchApi<Marca>(`/marcas/${id}/restore`, {
      method: 'PATCH',
    });
  },
};
