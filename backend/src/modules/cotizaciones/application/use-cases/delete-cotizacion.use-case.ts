import { Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';

@Injectable()
export class DeleteCotizacionUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(id: string): Promise<CotizacionConDetalles> {
    const existing = await this.cotizacionesRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Cotización con ID '${id}' no encontrada`);
    }
    return this.cotizacionesRepository.delete(id);
  }
}
