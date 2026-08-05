import { PrismaService } from '../../../../prisma/prisma.service';
import { Proveedor } from '../../domain/proveedor.entity';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
export declare class PrismaProveedoresRepository implements IProveedoresRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(options?: {
        search?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        includeDeleted?: boolean;
    }): Promise<{
        data: Proveedor[];
        total: number;
    }>;
    findById(id: string, includeDeleted?: boolean): Promise<Proveedor | null>;
    create(data: {
        nombre: string;
        contacto?: string;
        telefono?: string;
        whatsapp?: string;
        correo?: string;
        ciudad?: string;
        direccion?: string;
        observaciones?: string;
        activo?: boolean;
    }): Promise<Proveedor>;
    update(id: string, data: {
        nombre?: string;
        contacto?: string;
        telefono?: string;
        whatsapp?: string;
        correo?: string;
        ciudad?: string;
        direccion?: string;
        observaciones?: string;
        activo?: boolean;
    }): Promise<Proveedor>;
    delete(id: string): Promise<void>;
    restore(id: string): Promise<Proveedor>;
    private toEntity;
}
