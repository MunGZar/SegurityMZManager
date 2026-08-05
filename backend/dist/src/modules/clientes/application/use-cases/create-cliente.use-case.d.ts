import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { Cliente } from '../../domain/cliente.entity';
export declare class CreateClienteUseCase {
    private readonly clientesRepository;
    constructor(clientesRepository: IClientesRepository);
    execute(dto: CreateClienteDto): Promise<Cliente>;
}
