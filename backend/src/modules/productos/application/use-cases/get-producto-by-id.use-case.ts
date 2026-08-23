import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductosRepository } from '../../domain/productos.repository.interface';

@Injectable()
export class GetProductoByIdUseCase {
  constructor(private readonly productosRepository: IProductosRepository) {}

  async execute(id: string) {
    const producto = await this.productosRepository.findById(id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }
    return producto;
  }
}
