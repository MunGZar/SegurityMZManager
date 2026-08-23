import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
import { OrdenTrabajoEstado } from '@prisma/client';
export declare class ChangeEstadoOrdenTrabajoUseCase {
    private readonly repository;
    constructor(repository: IOrdenesTrabajoRepository);
    execute(id: string, estado: OrdenTrabajoEstado): Promise<OrdenTrabajoCompleta>;
}
