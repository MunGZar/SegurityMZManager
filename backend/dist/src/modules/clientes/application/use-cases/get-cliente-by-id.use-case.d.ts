import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';
export declare class GetClienteByIdUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(id: string): Promise<Cliente>;
}
