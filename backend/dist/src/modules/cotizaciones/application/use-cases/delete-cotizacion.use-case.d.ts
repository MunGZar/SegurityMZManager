import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
export declare class DeleteCotizacionUseCase {
    private readonly cotizacionesRepository;
    constructor(cotizacionesRepository: ICotizacionesRepository);
    execute(id: string): Promise<CotizacionConDetalles>;
}
