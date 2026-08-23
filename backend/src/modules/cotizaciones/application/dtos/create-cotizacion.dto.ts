import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CotizacionDetalleTipo, CotizacionEstado } from '@prisma/client';

export class CreateCotizacionDetalleDto {
  @ApiPropertyOptional({ description: 'ID del producto asociado si pertenece al catálogo' })
  @IsString()
  @IsOptional()
  productoId?: string;

  @ApiProperty({ enum: ['PRODUCTO', 'SERVICIO'], default: 'PRODUCTO' })
  @IsEnum(CotizacionDetalleTipo)
  tipo: CotizacionDetalleTipo;

  @ApiProperty({ description: 'Nombre o concepto del ítem' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del ítem es obligatorio' })
  nombre: string;

  @ApiPropertyOptional({ description: 'Descripción detallada' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ description: 'Cantidad de unidades', minimum: 1, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad: number;

  @ApiPropertyOptional({ description: 'Orden o posición visual del ítem', default: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  orden?: number;

  @ApiProperty({ description: 'Precio unitario histórico', example: 25000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'El precio unitario no puede ser negativo' })
  precioUnit: number;
}

export class CreateCotizacionDto {
  @ApiProperty({ description: 'ID del cliente asignado' })
  @IsString()
  @IsNotEmpty({ message: 'El cliente es obligatorio' })
  clienteId: string;

  @ApiPropertyOptional({ description: 'Observaciones o condiciones comerciales' })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiPropertyOptional({ description: 'Descuento global aplicado a la cotización', default: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'El descuento no puede ser negativo' })
  @IsOptional()
  descuento?: number = 0;

  @ApiPropertyOptional({ enum: CotizacionEstado, default: CotizacionEstado.BORRADOR })
  @IsEnum(CotizacionEstado)
  @IsOptional()
  estado?: CotizacionEstado = CotizacionEstado.BORRADOR;

  @ApiProperty({ type: [CreateCotizacionDetalleDto], description: 'Líneas o ítems de la cotización' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCotizacionDetalleDto)
  @IsNotEmpty({ message: 'La cotización debe incluir al menos un ítem' })
  detalles: CreateCotizacionDetalleDto[];
}
