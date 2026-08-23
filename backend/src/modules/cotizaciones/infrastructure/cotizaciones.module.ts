import { Module } from '@nestjs/common';
import { CotizacionesController } from './cotizaciones.controller';
import { PrismaCotizacionesRepository } from './repositories/prisma-cotizaciones.repository';
import { ICotizacionesRepository } from '../domain/cotizaciones.repository.interface';

import { CreateCotizacionUseCase } from '../application/use-cases/create-cotizacion.use-case';
import { GetAllCotizacionesUseCase } from '../application/use-cases/get-all-cotizaciones.use-case';
import { GetCotizacionByIdUseCase } from '../application/use-cases/get-cotizacion-by-id.use-case';
import { UpdateCotizacionUseCase } from '../application/use-cases/update-cotizacion.use-case';
import { ChangeEstadoCotizacionUseCase } from '../application/use-cases/change-estado-cotizacion.use-case';
import { DuplicateCotizacionUseCase } from '../application/use-cases/duplicate-cotizacion.use-case';
import { DeleteCotizacionUseCase } from '../application/use-cases/delete-cotizacion.use-case';
import { RestoreCotizacionUseCase } from '../application/use-cases/restore-cotizacion.use-case';

@Module({
  controllers: [CotizacionesController],
  providers: [
    {
      provide: ICotizacionesRepository,
      useClass: PrismaCotizacionesRepository,
    },
    CreateCotizacionUseCase,
    GetAllCotizacionesUseCase,
    GetCotizacionByIdUseCase,
    UpdateCotizacionUseCase,
    ChangeEstadoCotizacionUseCase,
    DuplicateCotizacionUseCase,
    DeleteCotizacionUseCase,
    RestoreCotizacionUseCase,
  ],
  exports: [
    ICotizacionesRepository,
    GetCotizacionByIdUseCase,
  ],
})
export class CotizacionesModule {}
