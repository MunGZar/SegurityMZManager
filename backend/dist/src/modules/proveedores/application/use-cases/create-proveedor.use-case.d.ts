import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { CreateProveedorDto } from '../dtos/create-proveedor.dto';
import { Proveedor } from '../../domain/proveedor.entity';
export declare class CreateProveedorUseCase {
    private readonly proveedoresRepository;
    constructor(proveedoresRepository: IProveedoresRepository);
    execute(dto: CreateProveedorDto): Promise<Proveedor>;
}
