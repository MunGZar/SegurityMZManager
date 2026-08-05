import { Inject, Injectable } from '@nestjs/common';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
import { GetProveedoresQueryDto } from '../dtos/get-proveedores-query.dto';
import { Proveedor } from '../../domain/proveedor.entity';

@Injectable()
export class GetAllProveedoresUseCase {
  constructor(
    @Inject(IProveedoresRepository)
    private readonly proveedoresRepository: IProveedoresRepository,
  ) {}

  async execute(query: GetProveedoresQueryDto): Promise<{ data: Proveedor[]; total: number }> {
    return this.proveedoresRepository.findAll({
      search: query.search,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      includeDeleted: query.includeDeleted,
    });
  }
}
