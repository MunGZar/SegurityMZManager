import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { IProductosRepository } from '../../domain/productos.repository.interface';
import { CreateProductoDto } from '../dtos/create-producto.dto';

@Injectable()
export class CreateProductoUseCase {
  constructor(private readonly productosRepository: IProductosRepository) {}

  async execute(dto: CreateProductoDto) {
    if (dto.precioCompra < 0) {
      throw new BadRequestException('El precio de compra no puede ser negativo');
    }
    if (dto.margenPorcentaje < 0) {
      throw new BadRequestException('El porcentaje de margen no puede ser negativo');
    }

    const existingCode = await this.productosRepository.findByCodigoInterno(dto.codigoInterno);
    if (existingCode) {
      throw new ConflictException(`Ya existe un producto con el código interno "${dto.codigoInterno}"`);
    }

    const existingCombo = await this.productosRepository.findByNombreMarcaModelo(
      dto.nombre,
      dto.marcaId,
      dto.modelo || null,
    );
    if (existingCombo) {
      throw new ConflictException(
        `Ya existe un producto registrado con el nombre "${dto.nombre}" para la misma marca y modelo.`,
      );
    }

    // Cálculo automático de precioVenta = precioCompra + (precioCompra * margen / 100)
    const precioCompraNum = Number(dto.precioCompra);
    const margenNum = Number(dto.margenPorcentaje);
    const precioVenta = Number((precioCompraNum + (precioCompraNum * (margenNum / 100))).toFixed(2));

    return this.productosRepository.create({
      ...dto,
      precioVenta,
    });
  }
}
