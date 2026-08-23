import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
import { ICotizacionesRepository } from '../../../cotizaciones/domain/cotizaciones.repository.interface';
import { CreateOrdenTrabajoDto } from '../dtos/create-orden-trabajo.dto';
import { CotizacionEstado } from '@prisma/client';

@Injectable()
export class CreateOrdenTrabajoUseCase {
  constructor(
    private readonly ordenesRepository: IOrdenesTrabajoRepository,
    private readonly cotizacionesRepository: ICotizacionesRepository,
  ) {}

  async execute(dto: CreateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta> {
    // 1. Validar existencia de la cotización
    const cotizacion = await this.cotizacionesRepository.findById(dto.cotizacionId);
    if (!cotizacion) {
      throw new NotFoundException(`La cotización con ID '${dto.cotizacionId}' no existe.`);
    }

    // 2. Validar que la cotización esté APROBADA
    if (cotizacion.estado !== CotizacionEstado.APROBADA) {
      throw new BadRequestException(
        `Solo se pueden crear Órdenes de Trabajo a partir de cotizaciones en estado 'APROBADA'. Estado actual: '${cotizacion.estado}'.`
      );
    }

    // 3. Validar que no exista ya una Orden de Trabajo para esta cotización
    const existingOrder = await this.ordenesRepository.findByCotizacionId(dto.cotizacionId);
    if (existingOrder) {
      throw new ConflictException(
        `Ya existe una Orden de Trabajo (${existingOrder.folio}) generada para la cotización #${cotizacion.folio}.`
      );
    }

    // 4. Generar Folio Correlativo (ej: OT-2026-0001)
    const folio = await this.ordenesRepository.generateNextFolio();

    // 5. Reutilizar dirección del cliente si no se especifica una custom
    const direccion = dto.direccion || cotizacion.cliente?.direccion || undefined;

    // 6. Crear la Orden de Trabajo
    return this.ordenesRepository.create({
      ...dto,
      folio,
      clienteId: cotizacion.clienteId,
      direccion,
    });
  }
}
