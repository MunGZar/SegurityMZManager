import { Module } from '@nestjs/common';
import { OrdenesTrabajoController } from './ordenes-trabajo.controller';
import { PrismaOrdenesTrabajoRepository } from './repositories/prisma-ordenes-trabajo.repository';
import { IOrdenesTrabajoRepository } from '../domain/ordenes-trabajo.repository.interface';
import { CotizacionesModule } from '../../cotizaciones/infrastructure/cotizaciones.module';

import { CreateOrdenTrabajoUseCase } from '../application/use-cases/create-orden-trabajo.use-case';
import { GetAllOrdenesTrabajoUseCase } from '../application/use-cases/get-all-ordenes-trabajo.use-case';
import { GetOrdenTrabajoByIdUseCase } from '../application/use-cases/get-orden-trabajo-by-id.use-case';
import { UpdateOrdenTrabajoUseCase } from '../application/use-cases/update-orden-trabajo.use-case';
import { ChangeEstadoOrdenTrabajoUseCase } from '../application/use-cases/change-estado-orden-trabajo.use-case';
import { AddEvidenciaUseCase } from '../application/use-cases/add-evidencia.use-case';
import { DeleteEvidenciaUseCase } from '../application/use-cases/delete-evidencia.use-case';
import { DeleteOrdenTrabajoUseCase } from '../application/use-cases/delete-orden-trabajo.use-case';
import { RestoreOrdenTrabajoUseCase } from '../application/use-cases/restore-orden-trabajo.use-case';

@Module({
  imports: [CotizacionesModule],
  controllers: [OrdenesTrabajoController],
  providers: [
    {
      provide: IOrdenesTrabajoRepository,
      useClass: PrismaOrdenesTrabajoRepository,
    },
    CreateOrdenTrabajoUseCase,
    GetAllOrdenesTrabajoUseCase,
    GetOrdenTrabajoByIdUseCase,
    UpdateOrdenTrabajoUseCase,
    ChangeEstadoOrdenTrabajoUseCase,
    AddEvidenciaUseCase,
    DeleteEvidenciaUseCase,
    DeleteOrdenTrabajoUseCase,
    RestoreOrdenTrabajoUseCase,
  ],
  exports: [
    IOrdenesTrabajoRepository,
    GetOrdenTrabajoByIdUseCase,
  ],
})
export class OrdenesTrabajoModule {}
