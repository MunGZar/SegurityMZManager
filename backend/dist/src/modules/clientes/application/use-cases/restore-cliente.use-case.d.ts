import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';
export declare class RestoreClienteUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(id: string): Promise<Cliente>;
}
