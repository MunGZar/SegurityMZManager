import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrdenTrabajoEstado } from '@prisma/client';

export class ChangeEstadoOrdenTrabajoDto {
  @ApiProperty({ enum: OrdenTrabajoEstado, description: 'Nuevo estado de la orden de trabajo' })
  @IsEnum(OrdenTrabajoEstado)
  @IsNotEmpty()
  estado: OrdenTrabajoEstado;
}
