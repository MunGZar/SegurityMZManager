import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ClienteStatusDto {
  PROSPECTO = 'PROSPECTO',
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del cliente no puede estar vacío' })
  nombre: string;

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
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Dirección física del cliente',
    example: 'Calle 123, Col. Centro, Ciudad de México',
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Notas o comentarios adicionales',
    example: 'Cliente prefiere contacto por la tarde.',
  })
  @IsString()
  @IsOptional()
  notas?: string;

  @ApiPropertyOptional({
    description: 'Estado actual del cliente',
    enum: ClienteStatusDto,
    default: ClienteStatusDto.PROSPECTO,
  })
  @IsEnum(ClienteStatusDto, { message: 'El estado del cliente debe ser PROSPECTO, ACTIVO o INACTIVO' })
  @IsOptional()
  status?: ClienteStatusDto;
}
