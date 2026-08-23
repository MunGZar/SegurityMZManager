import { PrismaService } from '../../../../prisma/prisma.service';
import { IProductosRepository, PaginatedProductos, ProductoConRelaciones } from '../../domain/productos.repository.interface';
import { CreateProductoDto } from '../../application/dtos/create-producto.dto';
import { UpdateProductoDto } from '../../application/dtos/update-producto.dto';
import { GetProductosQueryDto } from '../../application/dtos/get-productos-query.dto';
import { Producto } from '@prisma/client';
export declare class PrismaProductosRepository implements IProductosRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly includeRelations;
    create(data: CreateProductoDto & {
        precioVenta: number;
    }): Promise<ProductoConRelaciones>;
    findAll(query: GetProductosQueryDto): Promise<PaginatedProductos>;
    findById(id: string): Promise<ProductoConRelaciones | null>;
    findByCodigoInterno(codigoInterno: string): Promise<Producto | null>;
    findByNombreMarcaModelo(nombre: string, marcaId: string, modelo?: string | null): Promise<Producto | null>;
    update(id: string, data: UpdateProductoDto & {
        precioVenta?: number;
    }): Promise<ProductoConRelaciones>;
    delete(id: string): Promise<ProductoConRelaciones>;
    restore(id: string): Promise<ProductoConRelaciones>;
}
