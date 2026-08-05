import { ClienteStatusDto } from './create-cliente.dto';
export declare class GetClientesQueryDto {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: ClienteStatusDto;
    includeDeleted?: boolean;
}
