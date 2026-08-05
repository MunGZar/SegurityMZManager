import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { UpdateProveedorDto } from '../dtos/update-proveedor.dto';
import { Proveedor } from '../../domain/proveedor.entity';
export declare class UpdateProveedorUseCase {
    private readonly proveedoresRepository;
    constructor(proveedoresRepository: IProveedoresRepository);
    execute(id: string, dto: UpdateProveedorDto): Promise<Proveedor>;
}
