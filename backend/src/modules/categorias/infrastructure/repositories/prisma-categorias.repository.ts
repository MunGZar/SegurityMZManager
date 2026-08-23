import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ICategoriasRepository, PaginatedCategorias } from '../../domain/categorias.repository.interface';
import { CreateCategoriaDto } from '../../application/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../../application/dtos/update-categoria.dto';
import { GetCategoriasQueryDto } from '../../application/dtos/get-categorias-query.dto';
import { Categoria, Prisma } from '@prisma/client';

@Injectable()
export class PrismaCategoriasRepository implements ICategoriasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoriaDto): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        activo: data.activo ?? true,
      },
    });
  }

  async findAll(query: GetCategoriasQueryDto): Promise<PaginatedCategorias> {
    const { search, page = 1, limit = 10, sortBy = 'nombre', sortOrder = 'asc', includeDeleted = false } = query;

    const where: Prisma.CategoriaWhereInput = {
      ...(includeDeleted ? {} : { deletedAt: null }),
      ...(search
        ? {
            OR: [
              { nombre: { contains: search } },
              { descripcion: { contains: search } },
            ],
          }
        : {}),
    };

    const allowedSortFields = ['nombre', 'createdAt', 'activo'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'nombre';

    const [data, total] = await Promise.all([
      this.prisma.categoria.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [validSortBy]: sortOrder },
      }),
      this.prisma.categoria.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  async findByNombre(nombre: string): Promise<Categoria | null> {
    return this.prisma.categoria.findFirst({
      where: {
        nombre: {
          equals: nombre,
        },
      },
    });
  }

  async update(id: string, data: UpdateCategoriaDto): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        activo: false,
      },
    });
  }

  async restore(id: string): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: { id },
      data: {
        deletedAt: null,
        activo: true,
      },
    });
  }
}
