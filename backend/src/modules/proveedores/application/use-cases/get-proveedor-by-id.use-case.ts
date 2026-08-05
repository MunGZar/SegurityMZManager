import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { Proveedor } from '../../domain/proveedor.entity';

@Injectable()
export class GetProveedorByIdUseCase {
  constructor(
    @Inject(IProveedoresRepository)
    private readonly proveedoresRepository: IProveedoresRepository,
  ) {}

  async execute(id: string): Promise<Proveedor> {
    const proveedor = await this.proveedoresRepository.findById(id, true);
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado`);
    }
    return proveedor;
  }
}
