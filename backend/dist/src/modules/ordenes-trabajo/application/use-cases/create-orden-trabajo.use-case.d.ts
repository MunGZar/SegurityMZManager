import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
import { ICotizacionesRepository } from '../../../cotizaciones/domain/cotizaciones.repository.interface';
import { CreateOrdenTrabajoDto } from '../dtos/create-orden-trabajo.dto';
export declare class CreateOrdenTrabajoUseCase {
    private readonly ordenesRepository;
    private readonly cotizacionesRepository;
    constructor(ordenesRepository: IOrdenesTrabajoRepository, cotizacionesRepository: ICotizacionesRepository);
    execute(dto: CreateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta>;
}
