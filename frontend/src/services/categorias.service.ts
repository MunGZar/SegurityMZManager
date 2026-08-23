import { fetchApi } from '@/lib/api';

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateCategoriaInput {
  nombre: string;
  descripcion?: string;
  activo?: boolean;
}

export interface UpdateCategoriaInput {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}

export interface GetCategoriasParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeDeleted?: boolean;
}

export interface CategoriasPaginatedResponse {
  data: Categoria[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const categoriasService = {
  getAll: (params?: GetCategoriasParams) => {
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
    return fetchApi<CategoriasPaginatedResponse>(`/categorias${query}`);
  },

  getById: (id: string) => {
    return fetchApi<Categoria>(`/categorias/${id}`);
  },

  create: (data: CreateCategoriaInput) => {
    return fetchApi<Categoria>('/categorias', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: UpdateCategoriaInput) => {
    return fetchApi<Categoria>(`/categorias/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return fetchApi<void>(`/categorias/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string) => {
    return fetchApi<Categoria>(`/categorias/${id}/restore`, {
      method: 'PATCH',
    });
  },
};
