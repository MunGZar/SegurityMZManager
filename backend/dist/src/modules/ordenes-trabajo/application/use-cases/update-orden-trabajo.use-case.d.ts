import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
import { UpdateOrdenTrabajoDto } from '../dtos/update-orden-trabajo.dto';
export declare class UpdateOrdenTrabajoUseCase {
    private readonly repository;
    constructor(repository: IOrdenesTrabajoRepository);
    execute(id: string, dto: UpdateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta>;
}
