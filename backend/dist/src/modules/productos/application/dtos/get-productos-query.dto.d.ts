export declare class GetProductosQueryDto {
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
