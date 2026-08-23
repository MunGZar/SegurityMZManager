import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductosQueryDto {
  @ApiPropertyOptional({ description: 'Término de búsqueda para nombre, código interno o modelo' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Filtrar por ID de marca' })
  @IsString()
  @IsOptional()
  marcaId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por ID de categoría' })
  @IsString()
  @IsOptional()
  categoriaId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por ID de proveedor' })
  @IsString()
  @IsOptional()
  proveedorId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por estado activo/inactivo' })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @ApiPropertyOptional({ minimum: 1, default: 1, description: 'Número de página' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ minimum: 1, default: 10, description: 'Cantidad de registros por página' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ default: 'nombre', description: 'Campo por el cual ordenar' })
  @IsString()
  @IsOptional()
  sortBy?: string = 'nombre';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'asc', description: 'Dirección del ordenamiento' })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional({ default: false, description: 'Indica si se deben incluir los registros eliminados lógicamente' })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean = false;
}
