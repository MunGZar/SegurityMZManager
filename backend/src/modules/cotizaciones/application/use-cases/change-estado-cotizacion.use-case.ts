import { Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { CotizacionEstado } from '@prisma/client';

@Injectable()
export class ChangeEstadoCotizacionUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(id: string, estado: CotizacionEstado): Promise<CotizacionConDetalles> {
    const existing = await this.cotizacionesRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Cotización con ID '${id}' no encontrada`);
    }

    return this.cotizacionesRepository.changeEstado(id, estado);
  }
}
