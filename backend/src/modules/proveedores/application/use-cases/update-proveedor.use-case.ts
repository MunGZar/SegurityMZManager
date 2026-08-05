import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { UpdateProveedorDto } from '../dtos/update-proveedor.dto';
import { Proveedor } from '../../domain/proveedor.entity';

@Injectable()
export class UpdateProveedorUseCase {
  constructor(
    @Inject(IProveedoresRepository)
    private readonly proveedoresRepository: IProveedoresRepository,
  ) {}

  async execute(id: string, dto: UpdateProveedorDto): Promise<Proveedor> {
    const existing = await this.proveedoresRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Proveedor con ID '${id}' no encontrado o inactivo`);
    }

    if (dto.nombre) {
      const all = await this.proveedoresRepository.findAll({ search: dto.nombre });
      const match = all.data.find(
        (p) => p.nombre.toLowerCase().trim() === dto.nombre!.toLowerCase().trim() && p.id !== id && !p.deletedAt
      );
      if (match) {
        throw new BadRequestException(`Ya existe otro proveedor activo registrado con el nombre '${dto.nombre}'`);
      }
    }

    return this.proveedoresRepository.update(id, {
      nombre: dto.nombre,
      contacto: dto.contacto !== undefined ? dto.contacto : undefined,
      telefono: dto.telefono !== undefined ? dto.telefono : undefined,
      whatsapp: dto.whatsapp !== undefined ? dto.whatsapp : undefined,
      correo: dto.correo !== undefined ? dto.correo : undefined,
      ciudad: dto.ciudad !== undefined ? dto.ciudad : undefined,
      direccion: dto.direccion !== undefined ? dto.direccion : undefined,
      observaciones: dto.observaciones !== undefined ? dto.observaciones : undefined,
      activo: dto.activo !== undefined ? dto.activo : undefined,
    });
  }
}
