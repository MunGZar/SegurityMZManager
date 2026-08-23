import { Injectable } from '@nestjs/common';
import { IOrdenesTrabajoRepository, PaginatedOrdenesTrabajo } from '../../domain/ordenes-trabajo.repository.interface';
import { GetOrdenesTrabajoQueryDto } from '../dtos/get-ordenes-trabajo-query.dto';

@Injectable()
export class GetAllOrdenesTrabajoUseCase {
  constructor(private readonly repository: IOrdenesTrabajoRepository) {}

  async execute(query: GetOrdenesTrabajoQueryDto): Promise<PaginatedOrdenesTrabajo> {
    return this.repository.findAll(query);
  }
}
