import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';

@Injectable()
export class RestoreClienteUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(id: string): Promise<Cliente> {
    const existing = await this.clientesRepository.findById(id, true);
    if (!existing) {
      throw new NotFoundException(`Cliente con ID '${id}' no encontrado`);
    }

    return this.clientesRepository.restore(id);
  }
}
