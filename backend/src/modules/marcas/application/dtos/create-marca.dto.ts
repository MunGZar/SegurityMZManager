import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMarcaDto {
  @ApiProperty({ description: 'Nombre único de la marca', example: 'Dahua' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiPropertyOptional({ description: 'Descripción opcional de la marca', example: 'Fabricante de sistemas de videovigilancia' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Estado activo de la marca', default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
