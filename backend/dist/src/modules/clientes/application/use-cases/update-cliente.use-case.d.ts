import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';
import { Cliente } from '../../domain/cliente.entity';
export declare class UpdateClienteUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(id: string, dto: UpdateClienteDto): Promise<Cliente>;
}
