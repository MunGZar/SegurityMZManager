import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';

@Injectable()
export class UpdateCategoriaUseCase {
  constructor(private readonly categoriasRepository: ICategoriasRepository) {}

  async execute(id: string, dto: UpdateCategoriaDto) {
    const existing = await this.categoriasRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada`);
    }

    if (dto.nombre && dto.nombre.toLowerCase() !== existing.nombre.toLowerCase()) {
      const duplicate = await this.categoriasRepository.findByNombre(dto.nombre);
      if (duplicate) {
        throw new ConflictException(`Ya existe una categoría registrada con el nombre "${dto.nombre}"`);
      }
    }

    return this.categoriasRepository.update(id, dto);
  }
}
