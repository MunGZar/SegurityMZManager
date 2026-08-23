import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
import { OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@prisma/client';

export class CreateOrdenTrabajoDto {
  @ApiProperty({ description: 'ID de la Cotización Aprobada que origina la orden' })
  @IsString()
  @IsNotEmpty()
  cotizacionId: string;

  @ApiPropertyOptional({ description: 'Fecha programada para la instalación (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaProgramada?: string;

  @ApiPropertyOptional({ description: 'Hora programada (ej: 09:30 AM o 14:00)' })
  @IsOptional()
  @IsString()
  horaProgramada?: string;

  @ApiPropertyOptional({ enum: OrdenTrabajoEstado, default: OrdenTrabajoEstado.PENDIENTE })
  @IsOptional()
  @IsEnum(OrdenTrabajoEstado)
  estado?: OrdenTrabajoEstado;

  @ApiPropertyOptional({ enum: OrdenTrabajoPrioridad, default: OrdenTrabajoPrioridad.MEDIA })
  @IsOptional()
  @IsEnum(OrdenTrabajoPrioridad)
  prioridad?: OrdenTrabajoPrioridad;

  @ApiPropertyOptional({ description: 'Observaciones generales del servicio' })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({ description: 'Dirección específica de la instalación' })
  @IsOptional()
  @IsString()
  direccion?: string;

  // Ficha Técnica Operativa
  @ApiPropertyOptional({ description: 'Observaciones técnicas' })
  @IsOptional()
  @IsString()
  observacionesTecnicas?: string;

  @ApiPropertyOptional({ description: 'Seriales de los equipos instalados' })
  @IsOptional()
  @IsString()
  serialesEquipos?: string;

  @ApiPropertyOptional({ description: 'Usuario de acceso al DVR/NVR' })
  @IsOptional()
  @IsString()
  usuarioDvr?: string;

  @ApiPropertyOptional({ description: 'Contraseña de acceso al DVR/NVR' })
  @IsOptional()
  @IsString()
  passwordDvrEncrypted?: string;

  @ApiPropertyOptional({ description: 'Dirección IP asignada' })
  @IsOptional()
  @IsString()
  direccionIp?: string;

  @ApiPropertyOptional({ description: 'Garantía en meses', default: 12 })
  @IsOptional()
  @IsInt()
  @Min(0)
  garantiaMeses?: number;

  @ApiPropertyOptional({ description: 'Fecha de entrega del trabajo (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaEntrega?: string;
}
