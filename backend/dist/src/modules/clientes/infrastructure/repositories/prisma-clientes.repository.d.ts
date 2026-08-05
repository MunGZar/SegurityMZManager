import { PrismaService } from '../../../../prisma/prisma.service';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente, ClienteStatus } from '../../domain/cliente.entity';
export declare class PrismaClientesRepository implements IClientesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private mapToDomain;
    findAll(options?: {
        search?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        status?: ClienteStatus;
        includeDeleted?: boolean;
    }): Promise<{
        data: Cliente[];
        total: number;
    }>;
    findById(id: string, includeDeleted?: boolean): Promise<Cliente | null>;
    findByIdentificacion(identificacion: string): Promise<Cliente | null>;
    create(cliente: {
        nombre: string;
        identificacion?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        notas?: string | null;
        status?: ClienteStatus;
    }): Promise<Cliente>;
    update(id: string, cliente: {
        nombre?: string;
        identificacion?: string | null;
        telefono?: string | null;
        email?: string | null;
        direccion?: string | null;
        notas?: string | null;
        status?: ClienteStatus;
    }): Promise<Cliente>;
    delete(id: string): Promise<void>;
    restore(id: string): Promise<Cliente>;
    hasAssociations(id: string): Promise<boolean>;
}
