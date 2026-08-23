import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { CreateCotizacionDto } from '../dtos/create-cotizacion.dto';
export declare class CreateCotizacionUseCase {
    private readonly cotizacionesRepository;
    constructor(cotizacionesRepository: ICotizacionesRepository);
    execute(dto: CreateCotizacionDto): Promise<CotizacionConDetalles>;
}
