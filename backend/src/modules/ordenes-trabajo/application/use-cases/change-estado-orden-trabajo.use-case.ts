import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
import { OrdenTrabajoEstado } from '@prisma/client';

@Injectable()
export class ChangeEstadoOrdenTrabajoUseCase {
  constructor(private readonly repository: IOrdenesTrabajoRepository) {}

  async execute(id: string, estado: OrdenTrabajoEstado): Promise<OrdenTrabajoCompleta> {
    const orden = await this.repository.findById(id);
    if (!orden) {
      throw new NotFoundException(`La Orden de Trabajo con ID '${id}' no fue encontrada.`);
    }

    return this.repository.changeEstado(id, estado);
  }
}
