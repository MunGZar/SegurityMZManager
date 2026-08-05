import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';
export declare class GetAllClientesUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(search?: string): Promise<Cliente[]>;
}
