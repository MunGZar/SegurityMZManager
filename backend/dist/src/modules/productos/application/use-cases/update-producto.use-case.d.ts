import { IProductosRepository } from '../../domain/productos.repository.interface';
import { UpdateProductoDto } from '../dtos/update-producto.dto';
export declare class UpdateProductoUseCase {
    private readonly productosRepository;
    constructor(productosRepository: IProductosRepository);
    execute(id: string, dto: UpdateProductoDto): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
}
