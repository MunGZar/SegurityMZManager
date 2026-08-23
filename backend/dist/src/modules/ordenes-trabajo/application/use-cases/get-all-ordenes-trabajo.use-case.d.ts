import { IOrdenesTrabajoRepository, PaginatedOrdenesTrabajo } from '../../domain/ordenes-trabajo.repository.interface';
import { GetOrdenesTrabajoQueryDto } from '../dtos/get-ordenes-trabajo-query.dto';
export declare class GetAllOrdenesTrabajoUseCase {
    private readonly repository;
    constructor(repository: IOrdenesTrabajoRepository);
    execute(query: GetOrdenesTrabajoQueryDto): Promise<PaginatedOrdenesTrabajo>;
}
