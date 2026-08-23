import { CotizacionEstado } from '@prisma/client';
export declare class GetCotizacionesQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    clienteId?: string;
    estado?: CotizacionEstado;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    includeDeleted?: boolean;
}
