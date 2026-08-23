import { Module } from '@nestjs/common';
import { MarcasController } from './controllers/marcas.controller';
import { IMarcasRepository } from '../domain/marcas.repository.interface';
import { PrismaMarcasRepository } from './repositories/prisma-marcas.repository';
import { CreateMarcaUseCase } from '../application/use-cases/create-marca.use-case';
import { GetAllMarcasUseCase } from '../application/use-cases/get-all-marcas.use-case';
import { GetMarcaByIdUseCase } from '../application/use-cases/get-marca-by-id.use-case';
import { UpdateMarcaUseCase } from '../application/use-cases/update-marca.use-case';
import { DeleteMarcaUseCase } from '../application/use-cases/delete-marca.use-case';
import { RestoreMarcaUseCase } from '../application/use-cases/restore-marca.use-case';

@Module({
  controllers: [MarcasController],
  providers: [
    CreateMarcaUseCase,
    GetAllMarcasUseCase,
    GetMarcaByIdUseCase,
    UpdateMarcaUseCase,
    DeleteMarcaUseCase,
    RestoreMarcaUseCase,
    {
      provide: IMarcasRepository,
      useClass: PrismaMarcasRepository,
    },
  ],
  exports: [
    CreateMarcaUseCase,
    GetAllMarcasUseCase,
    GetMarcaByIdUseCase,
    UpdateMarcaUseCase,
    DeleteMarcaUseCase,
    RestoreMarcaUseCase,
  ],
})
export class MarcasModule {}
