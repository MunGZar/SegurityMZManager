import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { UpdateCotizacionDto } from '../dtos/update-cotizacion.dto';
export declare class UpdateCotizacionUseCase {
    private readonly cotizacionesRepository;
    constructor(cotizacionesRepository: ICotizacionesRepository);
    execute(id: string, dto: UpdateCotizacionDto): Promise<CotizacionConDetalles>;
}
