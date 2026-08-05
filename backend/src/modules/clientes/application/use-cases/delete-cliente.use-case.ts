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

    const hasAssociations = await this.clientesRepository.hasAssociations(id);
    if (hasAssociations) {
      throw new BadRequestException('No se puede eliminar el cliente porque tiene cotizaciones o instalaciones asociadas');
    }

    await this.clientesRepository.delete(id);
  }
}
