import { Cliente } from './cliente.entity';

export interface IClientesRepository {
  findAll(search?: string): Promise<Cliente[]>;
  findById(id: string): Promise<Cliente | null>;
  findByIdentificacion(identificacion: string): Promise<Cliente | null>;
  create(cliente: {
    nombre: string;
    identificacion?: string | null;
    telefono?: string | null;
    email?: string | null;
    direccion?: string | null;
    notas?: string | null;
  }): Promise<Cliente>;
  update(
    id: string,
    cliente: {
      nombre?: string;
      identificacion?: string | null;
      telefono?: string | null;
      email?: string | null;
      direccion?: string | null;
      notas?: string | null;
    },
  ): Promise<Cliente>;
  delete(id: string): Promise<void>;
  hasAssociations(id: string): Promise<boolean>;
}

export const IClientesRepository = Symbol('IClientesRepository');
