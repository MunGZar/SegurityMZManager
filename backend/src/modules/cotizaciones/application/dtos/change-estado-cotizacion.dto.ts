import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CotizacionEstado } from '@prisma/client';

export class ChangeEstadoCotizacionDto {
  @ApiProperty({ enum: CotizacionEstado, description: 'Nuevo estado de la cotización' })
  @IsEnum(CotizacionEstado)
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  estado: CotizacionEstado;
}
