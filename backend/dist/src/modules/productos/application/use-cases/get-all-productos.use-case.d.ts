import { IProductosRepository } from '../../domain/productos.repository.interface';
import { GetProductosQueryDto } from '../dtos/get-productos-query.dto';
export declare class GetAllProductosUseCase {
    private readonly productosRepository;
    constructor(productosRepository: IProductosRepository);
    execute(query: GetProductosQueryDto): Promise<import("../../domain/productos.repository.interface").PaginatedProductos>;
}
