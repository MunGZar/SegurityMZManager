import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IMarcasRepository, PaginatedMarcas } from '../../domain/marcas.repository.interface';
import { CreateMarcaDto } from '../../application/dtos/create-marca.dto';
import { UpdateMarcaDto } from '../../application/dtos/update-marca.dto';
import { GetMarcasQueryDto } from '../../application/dtos/get-marcas-query.dto';
import { Marca, Prisma } from '@prisma/client';

@Injectable()
export class PrismaMarcasRepository implements IMarcasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMarcaDto): Promise<Marca> {
    return this.prisma.marca.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        activo: data.activo ?? true,
      },
    });
  }

  async findAll(query: GetMarcasQueryDto): Promise<PaginatedMarcas> {
    const { search, page = 1, limit = 10, sortBy = 'nombre', sortOrder = 'asc', includeDeleted = false } = query;

    const where: Prisma.MarcaWhereInput = {
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
      this.prisma.marca.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [validSortBy]: sortOrder },
      }),
      this.prisma.marca.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Marca | null> {
    return this.prisma.marca.findUnique({
      where: { id },
    });
  }

  async findByNombre(nombre: string): Promise<Marca | null> {
    return this.prisma.marca.findFirst({
      where: {
        nombre: {
          equals: nombre,
        },
      },
    });
  }

  async update(id: string, data: UpdateMarcaDto): Promise<Marca> {
    return this.prisma.marca.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Marca> {
    return this.prisma.marca.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        activo: false,
      },
    });
  }

  async restore(id: string): Promise<Marca> {
    return this.prisma.marca.update({
      where: { id },
      data: {
        deletedAt: null,
        activo: true,
      },
    });
  }
}
