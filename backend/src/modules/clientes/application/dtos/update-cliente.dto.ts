import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ClienteStatusDto } from './create-cliente.dto';

export class UpdateClienteDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del cliente',
    example: 'Juan Pérez Modificado',
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Identificación única del cliente (DNI, RUT, RFC, etc.)',
    example: 'PEJ800101',
  })
  @IsString()
  @IsOptional()
  identificacion?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto del cliente',
    example: '+52 5512345678',
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez.mod@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Dirección física del cliente',
    example: 'Nueva Calle 456, Col. Centro, Ciudad de México',
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Notas o comentarios adicionales',
    example: 'Cliente prefiere contacto por la tarde (actualizado).',
  })
  @IsString()
  @IsOptional()
  notas?: string;

  @ApiPropertyOptional({
    description: 'Estado actual del cliente',
    enum: ClienteStatusDto,
  })
  @IsEnum(ClienteStatusDto, { message: 'El estado del cliente debe ser PROSPECTO, ACTIVO o INACTIVO' })
  @IsOptional()
  status?: ClienteStatusDto;
}
