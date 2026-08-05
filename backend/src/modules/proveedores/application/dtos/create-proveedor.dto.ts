import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty({ example: 'Syscom México', description: 'Nombre de la empresa proveedora' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({ example: 'Ing. Alejandro Ruiz', description: 'Nombre del contacto directo', required: false })
  @IsString()
  @IsOptional()
  contacto?: string;

  @ApiProperty({ example: '+52 5543210987', description: 'Teléfono de contacto', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: '+52 5598765432', description: 'Número de WhatsApp', required: false })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ example: 'ventas@syscom.mx', description: 'Correo electrónico de contacto', required: false })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  correo?: string;

  @ApiProperty({ example: 'Chihuahua', description: 'Ciudad del proveedor', required: false })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiProperty({ example: 'Av. Heroico Colegio Militar 123', description: 'Dirección física', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ example: 'Distribuidor principal de cámaras Hikvision', description: 'Observaciones generales', required: false })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiProperty({ example: true, description: 'Estado activo o inactivo', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
