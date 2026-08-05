import { Inject, Injectable } from '@nestjs/common';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente, ClienteStatus } from '../../domain/cliente.entity';
import { GetClientesQueryDto } from '../dtos/get-clientes-query.dto';

@Injectable()
export class GetAllClientesUseCase {
  constructor(
    @Inject(IClientesRepository)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async execute(query: GetClientesQueryDto): Promise<{ data: Cliente[]; total: number }> {
    return this.clientesRepository.findAll({
      search: query.search,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      status: query.status as ClienteStatus,
      includeDeleted: query.includeDeleted,
    });
  }
}
