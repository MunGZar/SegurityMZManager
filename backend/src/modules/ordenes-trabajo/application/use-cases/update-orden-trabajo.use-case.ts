import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta } from '../../domain/ordenes-trabajo.repository.interface';
import { UpdateOrdenTrabajoDto } from '../dtos/update-orden-trabajo.dto';

@Injectable()
export class UpdateOrdenTrabajoUseCase {
  constructor(private readonly repository: IOrdenesTrabajoRepository) {}

  async execute(id: string, dto: UpdateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta> {
    const orden = await this.repository.findById(id);
    if (!orden) {
      throw new NotFoundException(`La Orden de Trabajo con ID '${id}' no fue encontrada.`);
    }

    return this.repository.update(id, dto);
  }
}
