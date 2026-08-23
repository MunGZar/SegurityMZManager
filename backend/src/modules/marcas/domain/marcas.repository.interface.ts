import { Marca } from '@prisma/client';
import { CreateMarcaDto } from '../application/dtos/create-marca.dto';
import { UpdateMarcaDto } from '../application/dtos/update-marca.dto';
import { GetMarcasQueryDto } from '../application/dtos/get-marcas-query.dto';

export interface PaginatedMarcas {
  data: Marca[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class IMarcasRepository {
  abstract create(data: CreateMarcaDto): Promise<Marca>;
  abstract findAll(query: GetMarcasQueryDto): Promise<PaginatedMarcas>;
  abstract findById(id: string): Promise<Marca | null>;
  abstract findByNombre(nombre: string): Promise<Marca | null>;
  abstract update(id: string, data: UpdateMarcaDto): Promise<Marca>;
  abstract delete(id: string): Promise<Marca>;
  abstract restore(id: string): Promise<Marca>;
}
