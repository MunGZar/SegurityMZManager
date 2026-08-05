import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { CreateProveedorDto } from '../dtos/create-proveedor.dto';
import { Proveedor } from '../../domain/proveedor.entity';

@Injectable()
export class CreateProveedorUseCase {
  constructor(
    @Inject(IProveedoresRepository)
    private readonly proveedoresRepository: IProveedoresRepository,
  ) {}

  async execute(dto: CreateProveedorDto): Promise<Proveedor> {
    const existing = await this.proveedoresRepository.findAll({ search: dto.nombre });
    const match = existing.data.find(
      (p) => p.nombre.toLowerCase().trim() === dto.nombre.toLowerCase().trim() && !p.deletedAt
    );
    if (match) {
      throw new BadRequestException(`Ya existe un proveedor activo registrado con el nombre '${dto.nombre}'`);
    }

    return this.proveedoresRepository.create({
      nombre: dto.nombre,
      contacto: dto.contacto,
      telefono: dto.telefono,
      whatsapp: dto.whatsapp,
      correo: dto.correo,
      ciudad: dto.ciudad,
      direccion: dto.direccion,
      observaciones: dto.observaciones,
      activo: dto.activo !== undefined ? dto.activo : true,
    });
  }
}
