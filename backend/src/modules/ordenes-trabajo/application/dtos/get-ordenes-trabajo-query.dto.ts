import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, IsEnum, IsBoolean } from 'class-validator';
import { OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@prisma/client';

export class GetOrdenesTrabajoQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Búsqueda por folio, cliente, dirección' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filtrar por Cliente' })
  @IsOptional()
  @IsString()
  clienteId?: string;

  @ApiPropertyOptional({ enum: OrdenTrabajoEstado })
  @IsOptional()
  @IsEnum(OrdenTrabajoEstado)
  estado?: OrdenTrabajoEstado;

  @ApiPropertyOptional({ enum: OrdenTrabajoPrioridad })
  @IsOptional()
  @IsEnum(OrdenTrabajoPrioridad)
  prioridad?: OrdenTrabajoPrioridad;

  @ApiPropertyOptional({ description: 'Filtrar por fecha programada (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  fechaProgramada?: string;

  @ApiPropertyOptional({ default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ default: 'desc' })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  includeDeleted?: boolean = false;
}
