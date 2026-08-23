import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrdenesTrabajoRepository } from '../../domain/ordenes-trabajo.repository.interface';
import { AddEvidenciaDto } from '../dtos/add-evidencia.dto';
import { OrdenTrabajoEvidencia } from '@prisma/client';

@Injectable()
export class AddEvidenciaUseCase {
  constructor(private readonly repository: IOrdenesTrabajoRepository) {}

  async execute(ordenTrabajoId: string, dto: AddEvidenciaDto): Promise<OrdenTrabajoEvidencia> {
    const orden = await this.repository.findById(ordenTrabajoId);
    if (!orden) {
      throw new NotFoundException(`La Orden de Trabajo con ID '${ordenTrabajoId}' no fue encontrada.`);
    }

    return this.repository.addEvidencia(ordenTrabajoId, dto);
  }
}
