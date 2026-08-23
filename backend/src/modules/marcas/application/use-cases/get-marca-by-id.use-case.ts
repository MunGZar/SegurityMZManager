import { Injectable, NotFoundException } from '@nestjs/common';
import { IMarcasRepository } from '../../domain/marcas.repository.interface';

@Injectable()
export class GetMarcaByIdUseCase {
  constructor(private readonly marcasRepository: IMarcasRepository) {}

  async execute(id: string) {
    const marca = await this.marcasRepository.findById(id);
    if (!marca) {
      throw new NotFoundException(`Marca con ID "${id}" no encontrada`);
    }
    return marca;
  }
}
