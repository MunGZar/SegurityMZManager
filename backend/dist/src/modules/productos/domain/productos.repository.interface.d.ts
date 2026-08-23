import { Producto, Marca, Categoria, Proveedor } from '@prisma/client';
import { CreateProductoDto } from '../application/dtos/create-producto.dto';
import { UpdateProductoDto } from '../application/dtos/update-producto.dto';
import { GetProductosQueryDto } from '../application/dtos/get-productos-query.dto';
export type ProductoConRelaciones = Producto & {
    marca: Marca;
    categoria: Categoria;
    proveedor: Proveedor;
};
export interface PaginatedProductos {
    data: ProductoConRelaciones[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare abstract class IProductosRepository {
    abstract create(data: CreateProductoDto & {
        precioVenta: number;
    }): Promise<ProductoConRelaciones>;
    abstract findAll(query: GetProductosQueryDto): Promise<PaginatedProductos>;
    abstract findById(id: string): Promise<ProductoConRelaciones | null>;
    abstract findByCodigoInterno(codigoInterno: string): Promise<Producto | null>;
    abstract findByNombreMarcaModelo(nombre: string, marcaId: string, modelo?: string | null): Promise<Producto | null>;
    abstract update(id: string, data: UpdateProductoDto & {
        precioVenta?: number;
    }): Promise<ProductoConRelaciones>;
    abstract delete(id: string): Promise<ProductoConRelaciones>;
    abstract restore(id: string): Promise<ProductoConRelaciones>;
}
