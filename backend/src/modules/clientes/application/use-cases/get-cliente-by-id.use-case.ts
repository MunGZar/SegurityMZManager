import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';

@Injectable()
export class GetClienteByIdUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(id: string): Promise<Cliente> {
    const cliente = await this.clientesRepository.findById(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID '${id}' no encontrado`);
    }
    return cliente;
  }
}
