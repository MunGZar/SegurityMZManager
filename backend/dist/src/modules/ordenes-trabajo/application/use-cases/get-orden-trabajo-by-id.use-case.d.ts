import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
export declare class GetOrdenTrabajoByIdUseCase {
    private readonly repository;
    constructor(repository: IOrdenesTrabajoRepository);
    execute(id: string): Promise<OrdenTrabajoCompleta>;
}
