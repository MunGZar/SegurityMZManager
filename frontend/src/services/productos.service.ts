import { fetchApi } from '@/lib/api';
import { Marca } from './marcas.service';
import { Categoria } from './categorias.service';
import { Proveedor } from './proveedores.service';

export interface Producto {
  id: string;
  codigoInterno: string;
  nombre: string;
  modelo: string | null;
  descripcion: string | null;
  imagenUrl: string | null;
  activo: boolean;
  marcaId: string;
  categoriaId: string;
  proveedorId: string;
  precioCompra: number;
  margenPorcentaje: number;
  precioVenta: number;
  garantiaMeses: number;
  resolucion: string | null;
  tecnologia: string | null;
  tipo: string | null;
  lente: string | null;
  audio: string | null;
  visionNocturna: string | null;
  alimentacion: string | null;
  proteccionIP: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;

  marca?: Marca;
  categoria?: Categoria;
  proveedor?: Proveedor;
}

export interface CreateProductoInput {
  codigoInterno: string;
  nombre: string;
  modelo?: string;
  descripcion?: string;
  imagenUrl?: string;
  activo?: boolean;
  marcaId: string;
  categoriaId: string;
  proveedorId: string;
  precioCompra: number;
  margenPorcentaje: number;
  garantiaMeses?: number;
  resolucion?: string;
  tecnologia?: string;
  tipo?: string;
  lente?: string;
  audio?: string;
  visionNocturna?: string;
  alimentacion?: string;
  proteccionIP?: string;
}

export interface UpdateProductoInput extends Partial<CreateProductoInput> {}

export interface GetProductosParams {
  search?: string;
  marcaId?: string;
  categoriaId?: string;
  proveedorId?: string;
  activo?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeDeleted?: boolean;
}

export interface ProductosPaginatedResponse {
  data: Producto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productosService = {
  getAll: (params?: GetProductosParams) => {
    const queryParts: string[] = [];
    if (params) {
      if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (params.marcaId) queryParts.push(`marcaId=${encodeURIComponent(params.marcaId)}`);
      if (params.categoriaId) queryParts.push(`categoriaId=${encodeURIComponent(params.categoriaId)}`);
      if (params.proveedorId) queryParts.push(`proveedorId=${encodeURIComponent(params.proveedorId)}`);
      if (params.activo !== undefined) queryParts.push(`activo=${params.activo}`);
      if (params.page !== undefined) queryParts.push(`page=${params.page}`);
      if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
      if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
      if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
      if (params.includeDeleted) queryParts.push(`includeDeleted=${params.includeDeleted}`);
    }
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return fetchApi<ProductosPaginatedResponse>(`/productos${query}`);
  },

  getById: (id: string) => {
    return fetchApi<Producto>(`/productos/${id}`);
  },

  create: (data: CreateProductoInput) => {
    return fetchApi<Producto>('/productos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: UpdateProductoInput) => {
    return fetchApi<Producto>(`/productos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return fetchApi<void>(`/productos/${id}`, {
      method: 'DELETE',
    });
  },

  restore: (id: string) => {
    return fetchApi<Producto>(`/productos/${id}/restore`, {
      method: 'PATCH',
    });
  },
};
