import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoriasRepository } from '../../domain/categorias.repository.interface';

@Injectable()
export class GetCategoriaByIdUseCase {
  constructor(private readonly categoriasRepository: ICategoriasRepository) {}

  async execute(id: string) {
    const categoria = await this.categoriasRepository.findById(id);
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada`);
    }
    return categoria;
  }
}
