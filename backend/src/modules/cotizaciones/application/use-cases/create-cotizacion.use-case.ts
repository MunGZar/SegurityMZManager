import { Injectable, BadRequestException } from '@nestjs/common';
import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { CreateCotizacionDto } from '../dtos/create-cotizacion.dto';

@Injectable()
export class CreateCotizacionUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(dto: CreateCotizacionDto): Promise<CotizacionConDetalles> {
    if (!dto.detalles || dto.detalles.length === 0) {
      throw new BadRequestException('La cotización debe incluir al menos un ítem o servicio');
    }

    // 1. Generar Folio automático (ej: COT-2026-0001)
    const folio = await this.cotizacionesRepository.generateNextFolio();

    // 2. Calular Subtotal y Total en backend
    let subtotal = 0;
    const detallesCalculados = dto.detalles.map((item) => {
      const itemSubtotal = item.cantidad * item.precioUnit;
      subtotal += itemSubtotal;
      return {
        ...item,
        subtotal: itemSubtotal,
      };
    });

    const descuento = dto.descuento || 0;
    const total = Math.max(0, subtotal - descuento);

    return this.cotizacionesRepository.create({
      ...dto,
      folio,
      subtotal,
      total,
      detalles: detallesCalculados,
    });
  }
}
