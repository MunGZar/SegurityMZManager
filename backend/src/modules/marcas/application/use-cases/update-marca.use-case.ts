import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { IMarcasRepository } from '../../domain/marcas.repository.interface';
import { UpdateMarcaDto } from '../dtos/update-marca.dto';

@Injectable()
export class UpdateMarcaUseCase {
  constructor(private readonly marcasRepository: IMarcasRepository) {}

  async execute(id: string, dto: UpdateMarcaDto) {
    const existing = await this.marcasRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Marca con ID "${id}" no encontrada`);
    }

    if (dto.nombre && dto.nombre.toLowerCase() !== existing.nombre.toLowerCase()) {
      const duplicate = await this.marcasRepository.findByNombre(dto.nombre);
      if (duplicate) {
        throw new ConflictException(`Ya existe una marca registrada con el nombre "${dto.nombre}"`);
      }
    }

    return this.marcasRepository.update(id, dto);
  }
}
