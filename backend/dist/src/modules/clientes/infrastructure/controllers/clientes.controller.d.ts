import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { GetAllClientesUseCase } from '../../application/use-cases/get-all-clientes.use-case';
import { GetClienteByIdUseCase } from '../../application/use-cases/get-cliente-by-id.use-case';
import { UpdateClienteUseCase } from '../../application/use-cases/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../application/use-cases/delete-cliente.use-case';
import { RestoreClienteUseCase } from '../../application/use-cases/restore-cliente.use-case';
import { CreateClienteDto } from '../../application/dtos/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dtos/update-cliente.dto';
import { GetClientesQueryDto } from '../../application/dtos/get-clientes-query.dto';
export declare class ClientesController {
    private readonly createClienteUseCase;
    private readonly getAllClientesUseCase;
    private readonly getClienteByIdUseCase;
    private readonly updateClienteUseCase;
    private readonly deleteClienteUseCase;
    private readonly restoreClienteUseCase;
    constructor(createClienteUseCase: CreateClienteUseCase, getAllClientesUseCase: GetAllClientesUseCase, getClienteByIdUseCase: GetClienteByIdUseCase, updateClienteUseCase: UpdateClienteUseCase, deleteClienteUseCase: DeleteClienteUseCase, restoreClienteUseCase: RestoreClienteUseCase);
    findAll(query: GetClientesQueryDto): Promise<{
        data: import("../../domain/cliente.entity").Cliente[];
        total: number;
    }>;
    findOne(id: string): Promise<import("../../domain/cliente.entity").Cliente>;
    create(createClienteDto: CreateClienteDto): Promise<import("../../domain/cliente.entity").Cliente>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<import("../../domain/cliente.entity").Cliente>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<import("../../domain/cliente.entity").Cliente>;
}
