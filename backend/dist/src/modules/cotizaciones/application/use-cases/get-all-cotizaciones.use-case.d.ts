import { ICotizacionesRepository, PaginatedCotizaciones } from '../../domain/cotizaciones.repository.interface';
import { GetCotizacionesQueryDto } from '../dtos/get-cotizaciones-query.dto';
export declare class GetAllCotizacionesUseCase {
    private readonly cotizacionesRepository;
    constructor(cotizacionesRepository: ICotizacionesRepository);
    execute(query: GetCotizacionesQueryDto): Promise<PaginatedCotizaciones>;
}
