import { Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';

@Injectable()
export class GetCotizacionByIdUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(id: string): Promise<CotizacionConDetalles> {
    const cotizacion = await this.cotizacionesRepository.findById(id);
    if (!cotizacion) {
      throw new NotFoundException(`Cotización con ID '${id}' no encontrada`);
    }
    return cotizacion;
  }
}
