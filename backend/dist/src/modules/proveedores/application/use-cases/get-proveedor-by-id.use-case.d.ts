import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { Proveedor } from '../../domain/proveedor.entity';
export declare class GetProveedorByIdUseCase {
    private readonly proveedoresRepository;
    constructor(proveedoresRepository: IProveedoresRepository);
    execute(id: string): Promise<Proveedor>;
}
