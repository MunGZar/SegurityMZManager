import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { Proveedor } from '../../domain/proveedor.entity';

@Injectable()
export class RestoreProveedorUseCase {
  constructor(
    @Inject(IProveedoresRepository)
    private readonly proveedoresRepository: IProveedoresRepository,
  ) {}

  async execute(id: string): Promise<Proveedor> {
    const existing = await this.proveedoresRepository.findById(id, true);
    if (!existing) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado`);
    }

    return this.proveedoresRepository.restore(id);
  }
}
