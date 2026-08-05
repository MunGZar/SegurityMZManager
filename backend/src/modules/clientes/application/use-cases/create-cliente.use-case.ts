import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { Cliente } from '../../domain/cliente.entity';

@Injectable()
export class CreateClienteUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(dto: CreateClienteDto): Promise<Cliente> {
    if (dto.identificacion) {
      const existing = await this.clientesRepository.findByIdentificacion(dto.identificacion);
      if (existing) {
        throw new BadRequestException(`Ya existe un cliente con la identificación '${dto.identificacion}'`);
      }
    }

    return this.clientesRepository.create({
      nombre: dto.nombre,
      identificacion: dto.identificacion || null,
      telefono: dto.telefono || null,
      email: dto.email || null,
      direccion: dto.direccion || null,
      notas: dto.notas || null,
      status: dto.status as any,
    });
  }
}
