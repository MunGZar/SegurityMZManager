import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';
import { GetClientesQueryDto } from '../dtos/get-clientes-query.dto';
export declare class GetAllClientesUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(query: GetClientesQueryDto): Promise<{
        data: Cliente[];
        total: number;
    }>;
}
