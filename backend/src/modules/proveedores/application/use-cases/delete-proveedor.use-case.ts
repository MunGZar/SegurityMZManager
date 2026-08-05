import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';

@Injectable()
export class DeleteProveedorUseCase {
  constructor(
    @Inject(IProveedoresRepository)
    private readonly proveedoresRepository: IProveedoresRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.proveedoresRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado`);
    }

    await this.proveedoresRepository.delete(id);
  }
}
