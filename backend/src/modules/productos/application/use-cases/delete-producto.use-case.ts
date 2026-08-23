import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductosRepository } from '../../domain/productos.repository.interface';

@Injectable()
export class DeleteProductoUseCase {
  constructor(private readonly productosRepository: IProductosRepository) {}

  async execute(id: string) {
    const existing = await this.productosRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }
    return this.productosRepository.delete(id);
  }
}
