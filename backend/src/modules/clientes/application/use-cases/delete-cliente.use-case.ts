import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';

@Injectable()
export class DeleteClienteUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.clientesRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Cliente con ID '${id}' no encontrado`);
    }

    await this.clientesRepository.delete(id);
  }
}
