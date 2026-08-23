import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, Min, IsUUID, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @ApiProperty({ description: 'Código interno o SKU del producto', example: 'CAM-IP-001' })
  @IsString()
  @IsNotEmpty({ message: 'El código interno es obligatorio' })
  codigoInterno: string;

  @ApiProperty({ description: 'Nombre descriptivo del producto', example: 'Cámara Domo IP 4MP Full Color' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiPropertyOptional({ description: 'Modelo del fabricante', example: 'DH-IPC-HDW1431S' })
  @IsString()
  @IsOptional()
  modelo?: string;

  @ApiPropertyOptional({ description: 'Descripción detallada', example: 'Cámara tipo domo metálica para exterior con visión nocturna a color' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen principal', example: 'https://ejemplo.com/imagenes/camara.jpg' })
  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @ApiPropertyOptional({ description: 'Estado activo del producto', default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  // Relaciones (FKs)
  @ApiProperty({ description: 'ID de la marca asociada', example: 'uuid-marca' })
  @IsString()
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  marcaId: string;

  @ApiProperty({ description: 'ID de la categoría asociada', example: 'uuid-categoria' })
  @IsString()
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  categoriaId: string;

  @ApiProperty({ description: 'ID del proveedor principal', example: 'uuid-proveedor' })
  @IsString()
  @IsNotEmpty({ message: 'El proveedor es obligatorio' })
  proveedorId: string;

  // Comercial
  @ApiProperty({ description: 'Precio de compra (Costo)', example: 45.50 })
  @Type(() => Number)
  @IsNumber({}, { message: 'El precio de compra debe ser un número válido' })
  @Min(0, { message: 'El precio de compra no puede ser negativo' })
  precioCompra: number;

  @ApiProperty({ description: 'Porcentaje de margen comercial (%)', example: 35 })
  @Type(() => Number)
  @IsNumber({}, { message: 'El margen debe ser un número válido' })
  @Min(0, { message: 'El margen no puede ser negativo' })
  margenPorcentaje: number;

  @ApiPropertyOptional({ description: 'Garantía en meses', default: 12, example: 12 })
  @Type(() => Number)
  @IsInt({ message: 'La garantía debe ser un número entero' })
  @Min(0, { message: 'La garantía no puede ser negativa' })
  @IsOptional()
  garantiaMeses?: number = 12;

  // Ficha Técnica
  @ApiPropertyOptional({ description: 'Resolución del equipo', example: '4MP / 1080p' })
  @IsString()
  @IsOptional()
  resolucion?: string;

  @ApiPropertyOptional({ description: 'Tecnología', example: 'IP / HDCVI' })
  @IsString()
  @IsOptional()
  tecnologia?: string;

  @ApiPropertyOptional({ description: 'Tipo de equipo', example: 'Domo / Bala / PTZ' })
  @IsString()
  @IsOptional()
  tipo?: string;

  @ApiPropertyOptional({ description: 'Tipo o milimetraje de lente', example: '2.8mm' })
  @IsString()
  @IsOptional()
  lente?: string;

  @ApiPropertyOptional({ description: 'Características de audio', example: 'Micrófono integrado' })
  @IsString()
  @IsOptional()
  audio?: string;

  @ApiPropertyOptional({ description: 'Alcance o tecnología de visión nocturna', example: 'Smart IR 30m / Full Color' })
  @IsString()
  @IsOptional()
  visionNocturna?: string;

  @ApiPropertyOptional({ description: 'Alimentación eléctrica', example: '12V DC / PoE 802.3af' })
  @IsString()
  @IsOptional()
  alimentacion?: string;

  @ApiPropertyOptional({ description: 'Grado de protección intemperie/golpes', example: 'IP67 / IK10' })
  @IsString()
  @IsOptional()
  proteccionIP?: string;
}
