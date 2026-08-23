import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoriasRepository } from '../../domain/categorias.repository.interface';

@Injectable()
export class DeleteCategoriaUseCase {
  constructor(private readonly categoriasRepository: ICategoriasRepository) {}

  async execute(id: string) {
    const existing = await this.categoriasRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada`);
    }
    return this.categoriasRepository.delete(id);
  }
}
