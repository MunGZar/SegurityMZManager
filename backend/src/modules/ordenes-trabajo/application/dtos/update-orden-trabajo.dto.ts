import { PartialType } from '@nestjs/swagger';
import { CreateOrdenTrabajoDto } from './create-orden-trabajo.dto';

export class UpdateOrdenTrabajoDto extends PartialType(CreateOrdenTrabajoDto) {}
