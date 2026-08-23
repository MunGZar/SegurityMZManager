import { CreateProductoDto } from '../../application/dtos/create-producto.dto';
import { UpdateProductoDto } from '../../application/dtos/update-producto.dto';
import { GetProductosQueryDto } from '../../application/dtos/get-productos-query.dto';
import { CreateProductoUseCase } from '../../application/use-cases/create-producto.use-case';
import { GetAllProductosUseCase } from '../../application/use-cases/get-all-productos.use-case';
import { GetProductoByIdUseCase } from '../../application/use-cases/get-producto-by-id.use-case';
import { UpdateProductoUseCase } from '../../application/use-cases/update-producto.use-case';
import { DeleteProductoUseCase } from '../../application/use-cases/delete-producto.use-case';
import { RestoreProductoUseCase } from '../../application/use-cases/restore-producto.use-case';
export declare class ProductosController {
    private readonly createProductoUseCase;
    private readonly getAllProductosUseCase;
    private readonly getProductoByIdUseCase;
    private readonly updateProductoUseCase;
    private readonly deleteProductoUseCase;
    private readonly restoreProductoUseCase;
    constructor(createProductoUseCase: CreateProductoUseCase, getAllProductosUseCase: GetAllProductosUseCase, getProductoByIdUseCase: GetProductoByIdUseCase, updateProductoUseCase: UpdateProductoUseCase, deleteProductoUseCase: DeleteProductoUseCase, restoreProductoUseCase: RestoreProductoUseCase);
    create(createProductoDto: CreateProductoDto): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
    findAll(query: GetProductosQueryDto): Promise<import("../../domain/productos.repository.interface").PaginatedProductos>;
    findOne(id: string): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
    update(id: string, updateProductoDto: UpdateProductoDto): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
    remove(id: string): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
    restore(id: string): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
}
