import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { IProductosRepository } from '../../domain/productos.repository.interface';
import { UpdateProductoDto } from '../dtos/update-producto.dto';

@Injectable()
export class UpdateProductoUseCase {
  constructor(private readonly productosRepository: IProductosRepository) {}

  async execute(id: string, dto: UpdateProductoDto) {
    const existing = await this.productosRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }

    if (dto.precioCompra !== undefined && dto.precioCompra < 0) {
      throw new BadRequestException('El precio de compra no puede ser negativo');
    }
    if (dto.margenPorcentaje !== undefined && dto.margenPorcentaje < 0) {
      throw new BadRequestException('El porcentaje de margen no puede ser negativo');
    }

    if (dto.codigoInterno && dto.codigoInterno !== existing.codigoInterno) {
      const duplicateCode = await this.productosRepository.findByCodigoInterno(dto.codigoInterno);
      if (duplicateCode) {
        throw new ConflictException(`Ya existe un producto con el código interno "${dto.codigoInterno}"`);
      }
    }

    const nextNombre = dto.nombre ?? existing.nombre;
    const nextMarcaId = dto.marcaId ?? existing.marcaId;
    const nextModelo = dto.modelo !== undefined ? dto.modelo : existing.modelo;

    if (
      nextNombre.toLowerCase() !== existing.nombre.toLowerCase() ||
      nextMarcaId !== existing.marcaId ||
      nextModelo !== existing.modelo
    ) {
      const duplicateCombo = await this.productosRepository.findByNombreMarcaModelo(
        nextNombre,
        nextMarcaId,
        nextModelo || null,
      );
      if (duplicateCombo && duplicateCombo.id !== id) {
        throw new ConflictException(
          `Ya existe un producto registrado con el nombre "${nextNombre}" para la misma marca y modelo.`,
        );
      }
    }

    // Recalcular precioVenta si cambia precioCompra o margenPorcentaje
    const finalPrecioCompra = dto.precioCompra !== undefined ? Number(dto.precioCompra) : Number(existing.precioCompra);
    const finalMargenPorcentaje = dto.margenPorcentaje !== undefined ? Number(dto.margenPorcentaje) : Number(existing.margenPorcentaje);
    const precioVenta = Number((finalPrecioCompra + (finalPrecioCompra * (finalMargenPorcentaje / 100))).toFixed(2));

    return this.productosRepository.update(id, {
      ...dto,
      precioVenta,
    });
  }
}
