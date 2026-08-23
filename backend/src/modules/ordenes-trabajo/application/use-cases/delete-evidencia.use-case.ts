import { Injectable } from '@nestjs/common';
import { IOrdenesTrabajoRepository } from '../../domain/ordenes-trabajo.repository.interface';

@Injectable()
export class DeleteEvidenciaUseCase {
  constructor(private readonly repository: IOrdenesTrabajoRepository) {}

  async execute(evidenciaId: string): Promise<boolean> {
    return this.repository.deleteEvidencia(evidenciaId);
  }
}
