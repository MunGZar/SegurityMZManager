import { OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@prisma/client';
export declare class GetOrdenesTrabajoQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    clienteId?: string;
    estado?: OrdenTrabajoEstado;
    prioridad?: OrdenTrabajoPrioridad;
    fechaProgramada?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    includeDeleted?: boolean;
}
