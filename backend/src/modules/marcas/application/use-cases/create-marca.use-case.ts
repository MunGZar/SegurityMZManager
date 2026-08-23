import { Injectable, ConflictException } from '@nestjs/common';
import { IMarcasRepository } from '../../domain/marcas.repository.interface';
import { CreateMarcaDto } from '../dtos/create-marca.dto';

@Injectable()
export class CreateMarcaUseCase {
  constructor(private readonly marcasRepository: IMarcasRepository) {}

  async execute(dto: CreateMarcaDto) {
    const existing = await this.marcasRepository.findByNombre(dto.nombre);
    if (existing) {
      throw new ConflictException(`Ya existe una marca registrada con el nombre "${dto.nombre}"`);
    }
    return this.marcasRepository.create(dto);
  }
}
