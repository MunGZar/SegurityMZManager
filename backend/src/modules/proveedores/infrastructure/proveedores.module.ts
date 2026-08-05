import { Module } from '@nestjs/common';
import { ProveedoresController } from './controllers/proveedores.controller';
import { IProveedoresRepository } from '../domain/proveedores.repository.interface';
import { PrismaProveedoresRepository } from './repositories/prisma-proveedores.repository';
import { CreateProveedorUseCase } from '../application/use-cases/create-proveedor.use-case';
import { GetAllProveedoresUseCase } from '../application/use-cases/get-all-proveedores.use-case';
import { GetProveedorByIdUseCase } from '../application/use-cases/get-proveedor-by-id.use-case';
import { UpdateProveedorUseCase } from '../application/use-cases/update-proveedor.use-case';
import { DeleteProveedorUseCase } from '../application/use-cases/delete-proveedor.use-case';
import { RestoreProveedorUseCase } from '../application/use-cases/restore-proveedor.use-case';

@Module({
  controllers: [ProveedoresController],
  providers: [
    CreateProveedorUseCase,
    GetAllProveedoresUseCase,
    GetProveedorByIdUseCase,
    UpdateProveedorUseCase,
    DeleteProveedorUseCase,
    RestoreProveedorUseCase,
    {
      provide: IProveedoresRepository,
      useClass: PrismaProveedoresRepository,
    },
  ],
  exports: [
    CreateProveedorUseCase,
    GetAllProveedoresUseCase,
    GetProveedorByIdUseCase,
    UpdateProveedorUseCase,
    DeleteProveedorUseCase,
    RestoreProveedorUseCase,
  ],
})
export class ProveedoresModule {}
