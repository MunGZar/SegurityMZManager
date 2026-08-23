import { Injectable } from '@nestjs/common';
import { IProductosRepository } from '../../domain/productos.repository.interface';
import { GetProductosQueryDto } from '../dtos/get-productos-query.dto';

@Injectable()
export class GetAllProductosUseCase {
  constructor(private readonly productosRepository: IProductosRepository) {}

  async execute(query: GetProductosQueryDto) {
    return this.productosRepository.findAll(query);
  }
}
