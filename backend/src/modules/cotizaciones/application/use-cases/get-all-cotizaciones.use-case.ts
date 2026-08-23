import { Injectable } from '@nestjs/common';
import { ICotizacionesRepository, PaginatedCotizaciones } from '../../domain/cotizaciones.repository.interface';
import { GetCotizacionesQueryDto } from '../dtos/get-cotizaciones-query.dto';

@Injectable()
export class GetAllCotizacionesUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(query: GetCotizacionesQueryDto): Promise<PaginatedCotizaciones> {
    return this.cotizacionesRepository.findAll(query);
  }
}
