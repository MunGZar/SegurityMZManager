import { Categoria } from '@prisma/client';
import { CreateCategoriaDto } from '../application/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../application/dtos/update-categoria.dto';
import { GetCategoriasQueryDto } from '../application/dtos/get-categorias-query.dto';

export interface PaginatedCategorias {
  data: Categoria[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class ICategoriasRepository {
  abstract create(data: CreateCategoriaDto): Promise<Categoria>;
  abstract findAll(query: GetCategoriasQueryDto): Promise<PaginatedCategorias>;
  abstract findById(id: string): Promise<Categoria | null>;
  abstract findByNombre(nombre: string): Promise<Categoria | null>;
  abstract update(id: string, data: UpdateCategoriaDto): Promise<Categoria>;
  abstract delete(id: string): Promise<Categoria>;
  abstract restore(id: string): Promise<Categoria>;
}
