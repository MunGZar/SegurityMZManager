import { IClientesRepository } from '../../domain/clientes.repository.interface';
export declare class DeleteClienteUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(id: string): Promise<void>;
}
