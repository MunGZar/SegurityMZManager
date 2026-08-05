import { fetchApi } from '@/lib/api';

export interface Cliente {
  id: string;
  nombre: string;
  identificacion: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  notas: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClienteInput {
  nombre: string;
  identificacion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

export interface UpdateClienteInput {
  nombre?: string;
  identificacion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

export const clientesService = {
  getAll: (search?: string) => {
    const query = search ? `?q=${encodeURIComponent(search)}` : '';
    return fetchApi<Cliente[]>(`/clientes${query}`);
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
};
