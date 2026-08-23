import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { CotizacionEstado } from '@prisma/client';
export declare class ChangeEstadoCotizacionUseCase {
    private readonly cotizacionesRepository;
    constructor(cotizacionesRepository: ICotizacionesRepository);
    execute(id: string, estado: CotizacionEstado): Promise<CotizacionConDetalles>;
}
