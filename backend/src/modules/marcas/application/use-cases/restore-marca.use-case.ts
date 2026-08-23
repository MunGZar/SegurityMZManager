import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { IMarcasRepository } from '../../domain/marcas.repository.interface';

@Injectable()
export class RestoreMarcaUseCase {
  constructor(private readonly marcasRepository: IMarcasRepository) {}

  async execute(id: string) {
    const existing = await this.marcasRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Marca con ID "${id}" no encontrada`);
    }

    if (!existing.deletedAt) {
      throw new ConflictException(`La marca "${existing.nombre}" no está eliminada`);
    }

    // Check if another active marca has the same name
    const activeSameName = await this.marcasRepository.findByNombre(existing.nombre);
    if (activeSameName && activeSameName.id !== id && !activeSameName.deletedAt) {
      throw new ConflictException(`No se puede restaurar. Ya existe otra marca activa registrada con el nombre "${existing.nombre}"`);
    }

    return this.marcasRepository.restore(id);
  }
}
