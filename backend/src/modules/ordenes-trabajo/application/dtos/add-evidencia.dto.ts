import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { TipoEvidencia } from '@prisma/client';

export class AddEvidenciaDto {
  @ApiProperty({ enum: TipoEvidencia, default: TipoEvidencia.ANTES })
  @IsEnum(TipoEvidencia)
  @IsNotEmpty()
  tipo: TipoEvidencia;

  @ApiProperty({ description: 'URL de la imagen o documento de evidencia' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ description: 'Descripción o nota sobre la fotografía / evidencia' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
