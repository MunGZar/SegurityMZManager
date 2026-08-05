import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { GetAllClientesUseCase } from '../../application/use-cases/get-all-clientes.use-case';
import { GetClienteByIdUseCase } from '../../application/use-cases/get-cliente-by-id.use-case';
import { UpdateClienteUseCase } from '../../application/use-cases/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../application/use-cases/delete-cliente.use-case';
import { CreateClienteDto } from '../../application/dtos/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dtos/update-cliente.dto';
export declare class ClientesController {
    private readonly createClienteUseCase;
    private readonly getAllClientesUseCase;
    private readonly getClienteByIdUseCase;
    private readonly updateClienteUseCase;
    private readonly deleteClienteUseCase;
    constructor(createClienteUseCase: CreateClienteUseCase, getAllClientesUseCase: GetAllClientesUseCase, getClienteByIdUseCase: GetClienteByIdUseCase, updateClienteUseCase: UpdateClienteUseCase, deleteClienteUseCase: DeleteClienteUseCase);
    findAll(search?: string): Promise<import("../../domain/cliente.entity").Cliente[]>;
    findOne(id: string): Promise<import("../../domain/cliente.entity").Cliente>;
    create(createClienteDto: CreateClienteDto): Promise<import("../../domain/cliente.entity").Cliente>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<import("../../domain/cliente.entity").Cliente>;
    remove(id: string): Promise<void>;
}
