import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nombre único de la categoría', example: 'Cámaras' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiPropertyOptional({ description: 'Descripción opcional de la categoría', example: 'Cámaras de seguridad IP, HDCVI y Térmicas' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Estado activo de la categoría', default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
