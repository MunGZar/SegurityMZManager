import { Injectable, ConflictException } from '@nestjs/common';
import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';

@Injectable()
export class CreateCategoriaUseCase {
  constructor(private readonly categoriasRepository: ICategoriasRepository) {}

  async execute(dto: CreateCategoriaDto) {
    const existing = await this.categoriasRepository.findByNombre(dto.nombre);
    if (existing) {
      throw new ConflictException(`Ya existe una categoría registrada con el nombre "${dto.nombre}"`);
    }
    return this.categoriasRepository.create(dto);
  }
}
