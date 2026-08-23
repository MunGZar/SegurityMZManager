import { Injectable } from '@nestjs/common';
import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
import { GetCategoriasQueryDto } from '../dtos/get-categorias-query.dto';

@Injectable()
export class GetAllCategoriasUseCase {
  constructor(private readonly categoriasRepository: ICategoriasRepository) {}

  async execute(query: GetCategoriasQueryDto) {
    return this.categoriasRepository.findAll(query);
  }
}
