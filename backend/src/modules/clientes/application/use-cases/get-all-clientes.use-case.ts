import { Inject, Injectable } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';

@Injectable()
export class GetAllClientesUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(search?: string): Promise<Cliente[]> {
    return this.clientesRepository.findAll(search);
  }
}
