import { IProductosRepository } from '../../domain/productos.repository.interface';
export declare class RestoreProductoUseCase {
    private readonly productosRepository;
    constructor(productosRepository: IProductosRepository);
    execute(id: string): Promise<import("../../domain/productos.repository.interface").ProductoConRelaciones>;
}
