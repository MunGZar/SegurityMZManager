import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { IClientesRepository } from '../domain/clientes.repository.interface';
import { PrismaClientesRepository } from './repositories/prisma-clientes.repository';
import { CreateClienteUseCase } from '../application/use-cases/create-cliente.use-case';
import { GetAllClientesUseCase } from '../application/use-cases/get-all-clientes.use-case';
import { GetClienteByIdUseCase } from '../application/use-cases/get-cliente-by-id.use-case';
import { UpdateClienteUseCase } from '../application/use-cases/update-cliente.use-case';
import { DeleteClienteUseCase } from '../application/use-cases/delete-cliente.use-case';

@Module({
  controllers: [ClientesController],
  providers: [
    CreateClienteUseCase,
    GetAllClientesUseCase,
    GetClienteByIdUseCase,
    UpdateClienteUseCase,
    DeleteClienteUseCase,
    {
      provide: IClientesRepository,
      useClass: PrismaClientesRepository,
    },
  ],
  exports: [
    CreateClienteUseCase,
    GetAllClientesUseCase,
    GetClienteByIdUseCase,
    UpdateClienteUseCase,
    DeleteClienteUseCase,
  ],
})
export class ClientesModule {}
