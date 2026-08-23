import { IOrdenesTrabajoRepository } from '../../domain/ordenes-trabajo.repository.interface';
import { AddEvidenciaDto } from '../dtos/add-evidencia.dto';
import { OrdenTrabajoEvidencia } from '@prisma/client';
export declare class AddEvidenciaUseCase {
    private readonly repository;
    constructor(repository: IOrdenesTrabajoRepository);
    execute(ordenTrabajoId: string, dto: AddEvidenciaDto): Promise<OrdenTrabajoEvidencia>;
}
