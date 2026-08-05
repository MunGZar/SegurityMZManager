import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { GetProveedoresQueryDto } from '../dtos/get-proveedores-query.dto';
import { Proveedor } from '../../domain/proveedor.entity';
export declare class GetAllProveedoresUseCase {
    private readonly proveedoresRepository;
    constructor(proveedoresRepository: IProveedoresRepository);
    execute(query: GetProveedoresQueryDto): Promise<{
        data: Proveedor[];
        total: number;
    }>;
}
