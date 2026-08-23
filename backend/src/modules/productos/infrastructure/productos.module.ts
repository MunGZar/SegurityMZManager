import { Module } from '@nestjs/common';
import { ProductosController } from './controllers/productos.controller';
import { IProductosRepository } from '../domain/productos.repository.interface';
import { PrismaProductosRepository } from './repositories/prisma-productos.repository';
import { CreateProductoUseCase } from '../application/use-cases/create-producto.use-case';
import { GetAllProductosUseCase } from '../application/use-cases/get-all-productos.use-case';
import { GetProductoByIdUseCase } from '../application/use-cases/get-producto-by-id.use-case';
import { UpdateProductoUseCase } from '../application/use-cases/update-producto.use-case';
import { DeleteProductoUseCase } from '../application/use-cases/delete-producto.use-case';
import { RestoreProductoUseCase } from '../application/use-cases/restore-producto.use-case';

@Module({
  controllers: [ProductosController],
  providers: [
    CreateProductoUseCase,
    GetAllProductosUseCase,
    GetProductoByIdUseCase,
    UpdateProductoUseCase,
    DeleteProductoUseCase,
    RestoreProductoUseCase,
    {
      provide: IProductosRepository,
      useClass: PrismaProductosRepository,
    },
  ],
  exports: [
    CreateProductoUseCase,
    GetAllProductosUseCase,
    GetProductoByIdUseCase,
    UpdateProductoUseCase,
    DeleteProductoUseCase,
    RestoreProductoUseCase,
  ],
})
export class ProductosModule {}
