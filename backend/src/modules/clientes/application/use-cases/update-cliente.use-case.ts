import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';
import { Cliente } from '../../domain/cliente.entity';

@Injectable()
export class UpdateClienteUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(id: string, dto: UpdateClienteDto): Promise<Cliente> {
    const existing = await this.clientesRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Cliente con ID '${id}' no encontrado`);
    }

    if (dto.identificacion && dto.identificacion !== existing.identificacion) {
      const match = await this.clientesRepository.findByIdentificacion(dto.identificacion);
      if (match) {
        throw new BadRequestException(`Ya existe otro cliente con la identificación '${dto.identificacion}'`);
      }
    }

    return this.clientesRepository.update(id, {
      nombre: dto.nombre,
      identificacion: dto.identificacion !== undefined ? dto.identificacion : undefined,
      telefono: dto.telefono !== undefined ? dto.telefono : undefined,
      email: dto.email !== undefined ? dto.email : undefined,
      direccion: dto.direccion !== undefined ? dto.direccion : undefined,
      notas: dto.notas !== undefined ? dto.notas : undefined,
      status: dto.status as any,
    });
  }
}
