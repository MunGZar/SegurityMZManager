import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { IProductosRepository } from '../../domain/productos.repository.interface';

@Injectable()
export class RestoreProductoUseCase {
  constructor(private readonly productosRepository: IProductosRepository) {}

  async execute(id: string) {
    const existing = await this.productosRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }

    if (!existing.deletedAt) {
      throw new ConflictException(`El producto "${existing.nombre}" no está eliminado`);
    }

    const activeSameCode = await this.productosRepository.findByCodigoInterno(existing.codigoInterno);
    if (activeSameCode && activeSameCode.id !== id && !activeSameCode.deletedAt) {
      throw new ConflictException(`No se puede restaurar. Ya existe otro producto activo con el código "${existing.codigoInterno}"`);
    }

    return this.productosRepository.restore(id);
  }
}
