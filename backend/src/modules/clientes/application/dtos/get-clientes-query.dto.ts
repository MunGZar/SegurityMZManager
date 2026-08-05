import { IsString, IsOptional, IsInt, Min, Max, IsEnum, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ClienteStatusDto } from './create-cliente.dto';

export class GetClientesQueryDto {
  @ApiPropertyOptional({
    description: 'Búsqueda por nombre, identificación, teléfono, dirección o correo',
    example: 'Juan',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Número de página para la paginación (basado en 1)',
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    example: 10,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    example: 'nombre',
    default: 'nombre',
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'nombre';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento (asc o desc)',
    example: 'asc',
    enum: ['asc', 'desc'],
    default: 'asc',
  })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional({
    description: 'Filtrar por estado del cliente',
    enum: ClienteStatusDto,
  })
  @IsEnum(ClienteStatusDto)
  @IsOptional()
  status?: ClienteStatusDto;

  @ApiPropertyOptional({
    description: 'Indica si se deben incluir los registros eliminados de forma lógica (soft deleted)',
    example: false,
    default: false,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean = false;
}
