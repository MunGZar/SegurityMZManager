import { Module } from '@nestjs/common';
import { CategoriasController } from './controllers/categorias.controller';
import { ICategoriasRepository } from '../domain/categorias.repository.interface';
import { PrismaCategoriasRepository } from './repositories/prisma-categorias.repository';
import { CreateCategoriaUseCase } from '../application/use-cases/create-categoria.use-case';
import { GetAllCategoriasUseCase } from '../application/use-cases/get-all-categorias.use-case';
import { GetCategoriaByIdUseCase } from '../application/use-cases/get-categoria-by-id.use-case';
import { UpdateCategoriaUseCase } from '../application/use-cases/update-categoria.use-case';
import { DeleteCategoriaUseCase } from '../application/use-cases/delete-categoria.use-case';
import { RestoreCategoriaUseCase } from '../application/use-cases/restore-categoria.use-case';

@Module({
  controllers: [CategoriasController],
  providers: [
    CreateCategoriaUseCase,
    GetAllCategoriasUseCase,
    GetCategoriaByIdUseCase,
    UpdateCategoriaUseCase,
    DeleteCategoriaUseCase,
    RestoreCategoriaUseCase,
    {
      provide: ICategoriasRepository,
      useClass: PrismaCategoriasRepository,
    },
  ],
  exports: [
    CreateCategoriaUseCase,
    GetAllCategoriasUseCase,
    GetCategoriaByIdUseCase,
    UpdateCategoriaUseCase,
    DeleteCategoriaUseCase,
    RestoreCategoriaUseCase,
  ],
})
export class CategoriasModule {}
