import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';

@Injectable()
export class GetOrdenTrabajoByIdUseCase {
  constructor(private readonly repository: IOrdenesTrabajoRepository) {}

  async execute(id: string): Promise<OrdenTrabajoCompleta> {
    const orden = await this.repository.findById(id);
    if (!orden) {
      throw new NotFoundException(`La Orden de Trabajo con ID '${id}' no fue encontrada.`);
    }
    return orden;
  }
}
