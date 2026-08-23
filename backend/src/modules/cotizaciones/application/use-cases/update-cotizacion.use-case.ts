import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { UpdateCotizacionDto } from '../dtos/update-cotizacion.dto';

@Injectable()
export class UpdateCotizacionUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(id: string, dto: UpdateCotizacionDto): Promise<CotizacionConDetalles> {
    const existing = await this.cotizacionesRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Cotización con ID '${id}' no encontrada`);
    }

    let subtotal = Number(existing.subtotal);
    let descuento = dto.descuento !== undefined ? dto.descuento : Number(existing.descuento);

    if (dto.detalles) {
      if (dto.detalles.length === 0) {
        throw new BadRequestException('La cotización debe incluir al menos un ítem o servicio');
      }

      subtotal = 0;
      dto.detalles = dto.detalles.map((item) => {
        const itemSubtotal = item.cantidad * item.precioUnit;
        subtotal += itemSubtotal;
        return {
          ...item,
          subtotal: itemSubtotal,
        };
      });
    }

    const total = Math.max(0, subtotal - descuento);

    return this.cotizacionesRepository.update(id, {
      ...dto,
      subtotal,
      total,
    });
  }
}
