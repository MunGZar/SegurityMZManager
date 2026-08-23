import { IProductosRepository } from '../../domain/productos.repository.interface';
import { CreateProductoDto } from '../dtos/create-producto.dto';
export declare class CreateProductoUseCase {
    private readonly productosRepository;
    constructor(productosRepository: IProductosRepository);
    execute(dto: CreateProductoDto): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
}
