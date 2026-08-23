import { Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionesRepository, CotizacionConDetalles } from '../../domain/cotizaciones.repository.interface';
import { CotizacionEstado } from '@prisma/client';

@Injectable()
export class DuplicateCotizacionUseCase {
  constructor(private readonly cotizacionesRepository: ICotizacionesRepository) {}

  async execute(id: string): Promise<CotizacionConDetalles> {
    const original = await this.cotizacionesRepository.findById(id);
    if (!original) {
      throw new NotFoundException(`Cotización origen con ID '${id}' no encontrada`);
    }

    const folio = await this.cotizacionesRepository.generateNextFolio();

    const detalles = original.detalles.map((d) => ({
      productoId: d.productoId || undefined,
      tipo: d.tipo,
      nombre: `${d.nombre} (Copia)`,
      descripcion: d.descripcion || undefined,
      cantidad: d.cantidad,
      precioUnit: Number(d.precioUnit),
      subtotal: Number(d.subtotal),
    }));

    return this.cotizacionesRepository.create({
      clienteId: original.clienteId,
      observaciones: original.observaciones ? `Duplicado de ${original.folio}. ${original.observaciones}` : `Duplicado de ${original.folio}`,
      descuento: Number(original.descuento),
      estado: CotizacionEstado.BORRADOR,
      folio,
      subtotal: Number(original.subtotal),
      total: Number(original.total),
      detalles,
    });
  }
}
