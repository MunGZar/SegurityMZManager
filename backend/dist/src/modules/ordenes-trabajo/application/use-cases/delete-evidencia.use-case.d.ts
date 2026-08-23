import { IOrdenesTrabajoRepository } from '../../domain/ordenes-trabajo.repository.interface';
export declare class DeleteEvidenciaUseCase {
    private readonly repository;
    constructor(repository: IOrdenesTrabajoRepository);
    execute(evidenciaId: string): Promise<boolean>;
}
