import { Injectable } from '@nestjs/common';
import { IMarcasRepository } from '../../domain/marcas.repository.interface';
import { GetMarcasQueryDto } from '../dtos/get-marcas-query.dto';

@Injectable()
export class GetAllMarcasUseCase {
  constructor(private readonly marcasRepository: IMarcasRepository) {}

  async execute(query: GetMarcasQueryDto) {
    return this.marcasRepository.findAll(query);
  }
}
