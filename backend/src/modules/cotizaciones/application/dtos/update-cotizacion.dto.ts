import { PartialType } from '@nestjs/swagger';
import { CreateCotizacionDto } from './create-cotizacion.dto';

export class UpdateCotizacionDto extends PartialType(CreateCotizacionDto) {}
