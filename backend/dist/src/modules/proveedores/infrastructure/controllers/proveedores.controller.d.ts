import { CreateProveedorUseCase } from '../../application/use-cases/create-proveedor.use-case';
import { GetAllProveedoresUseCase } from '../../application/use-cases/get-all-proveedores.use-case';
import { GetProveedorByIdUseCase } from '../../application/use-cases/get-proveedor-by-id.use-case';
import { UpdateProveedorUseCase } from '../../application/use-cases/update-proveedor.use-case';
import { DeleteProveedorUseCase } from '../../application/use-cases/delete-proveedor.use-case';
import { RestoreProveedorUseCase } from '../../application/use-cases/restore-proveedor.use-case';
import { CreateProveedorDto } from '../../application/dtos/create-proveedor.dto';
import { UpdateProveedorDto } from '../../application/dtos/update-proveedor.dto';
import { GetProveedoresQueryDto } from '../../application/dtos/get-proveedores-query.dto';
export declare class ProveedoresController {
    private readonly createProveedorUseCase;
    private readonly getAllProveedoresUseCase;
    private readonly getProveedorByIdUseCase;
    private readonly updateProveedorUseCase;
    private readonly deleteProveedorUseCase;
    private readonly restoreProveedorUseCase;
    constructor(createProveedorUseCase: CreateProveedorUseCase, getAllProveedoresUseCase: GetAllProveedoresUseCase, getProveedorByIdUseCase: GetProveedorByIdUseCase, updateProveedorUseCase: UpdateProveedorUseCase, deleteProveedorUseCase: DeleteProveedorUseCase, restoreProveedorUseCase: RestoreProveedorUseCase);
    findAll(query: GetProveedoresQueryDto): Promise<{
        data: import("../../domain/proveedor.entity").Proveedor[];
        total: number;
    }>;
    findOne(id: string): Promise<import("../../domain/proveedor.entity").Proveedor>;
    create(createProveedorDto: CreateProveedorDto): Promise<import("../../domain/proveedor.entity").Proveedor>;
    update(id: string, updateProveedorDto: UpdateProveedorDto): Promise<import("../../domain/proveedor.entity").Proveedor>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<import("../../domain/proveedor.entity").Proveedor>;
}
