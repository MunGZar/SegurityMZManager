import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ICategoriasRepository } from '../../domain/categorias.repository.interface';

@Injectable()
export class RestoreCategoriaUseCase {
  constructor(private readonly categoriasRepository: ICategoriasRepository) {}

  async execute(id: string) {
    const existing = await this.categoriasRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada`);
    }

    if (!existing.deletedAt) {
      throw new ConflictException(`La categoría "${existing.nombre}" no está eliminada`);
    }

    const activeSameName = await this.categoriasRepository.findByNombre(existing.nombre);
    if (activeSameName && activeSameName.id !== id && !activeSameName.deletedAt) {
      throw new ConflictException(`No se puede restaurar. Ya existe otra categoría activa registrada con el nombre "${existing.nombre}"`);
    }

    return this.categoriasRepository.restore(id);
  }
}
