import { Injectable, NotFoundException } from '@nestjs/common';
import { IMarcasRepository } from '../../domain/marcas.repository.interface';

@Injectable()
export class DeleteMarcaUseCase {
  constructor(private readonly marcasRepository: IMarcasRepository) {}

  async execute(id: string) {
    const existing = await this.marcasRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Marca con ID "${id}" no encontrada`);
    }
    return this.marcasRepository.delete(id);
  }
}
