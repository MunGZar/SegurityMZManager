import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente, ClienteStatus } from '../../domain/cliente.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaClientesRepository implements IClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(prismaCliente: any): Cliente {
    return new Cliente(
      prismaCliente.id,
      prismaCliente.nombre,
      prismaCliente.identificacion,
      prismaCliente.telefono,
      prismaCliente.email,
      prismaCliente.direccion,
      prismaCliente.notas,
      prismaCliente.status as ClienteStatus,
      prismaCliente.createdAt,
      prismaCliente.updatedAt,
      prismaCliente.deletedAt,
    );
  }

  async findAll(options?: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: ClienteStatus;
    includeDeleted?: boolean;
  }): Promise<{ data: Cliente[]; total: number }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ClienteWhereInput = {};

    // Soft delete filtering
    if (!options?.includeDeleted) {
      where.deletedAt = null;
    }

    // Status filtering
    if (options?.status) {
      where.status = options.status;
    }

    // Search filtering
    if (options?.search) {
      where.OR = [
        { nombre: { contains: options.search } },
        { telefono: { contains: options.search } },
        { direccion: { contains: options.search } },
        { identificacion: { contains: options.search } },
        { email: { contains: options.search } },
      ];
    }

    // Sorting
    const sortBy = options?.sortBy ?? 'nombre';
    const sortOrder = options?.sortOrder ?? 'asc';
    const orderBy: Prisma.ClienteOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [records, total] = await Promise.all([
      this.prisma.cliente.findMany({
        where,
        take: limit,
        skip,
        orderBy,
      }),
      this.prisma.cliente.count({ where }),
    ]);

    return {
      data: records.map((record) => this.mapToDomain(record)),
      total,
    };
  }

  async findById(id: string, includeDeleted = false): Promise<Cliente | null> {
    const where: Prisma.ClienteWhereUniqueInput = { id };
    if (!includeDeleted) {
      // Because findUnique doesn't accept complex where criteria like `deletedAt: null` in Prisma, 
      // we can use findFirst instead.
      const record = await this.prisma.cliente.findFirst({
        where: { id, deletedAt: null },
      });
      return record ? this.mapToDomain(record) : null;
    }
    const record = await this.prisma.cliente.findUnique({
      where,
    });
    return record ? this.mapToDomain(record) : null;
  }

  async findByIdentificacion(identificacion: string): Promise<Cliente | null> {
    if (!identificacion) return null;
    const record = await this.prisma.cliente.findFirst({
      where: { identificacion, deletedAt: null },
    });
    return record ? this.mapToDomain(record) : null;
  }

  async create(cliente: {
    nombre: string;
    identificacion?: string | null;
    telefono?: string | null;
    email?: string | null;
    direccion?: string | null;
    notas?: string | null;
    status?: ClienteStatus;
  }): Promise<Cliente> {
    const record = await this.prisma.cliente.create({
      data: {
        nombre: cliente.nombre,
        identificacion: cliente.identificacion || null,
        telefono: cliente.telefono || null,
        email: cliente.email || null,
        direccion: cliente.direccion || null,
        notas: cliente.notas || null,
        status: cliente.status || 'PROSPECTO',
      },
    });
    return this.mapToDomain(record);
  }

  async update(
    id: string,
    cliente: {
      nombre?: string;
      identificacion?: string | null;
      telefono?: string | null;
      email?: string | null;
      direccion?: string | null;
      notas?: string | null;
      status?: ClienteStatus;
    },
  ): Promise<Cliente> {
    const record = await this.prisma.cliente.update({
      where: { id },
      data: {
        nombre: cliente.nombre,
        identificacion: cliente.identificacion,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion,
        notas: cliente.notas,
        status: cliente.status,
      },
    });
    return this.mapToDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cliente.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string): Promise<Cliente> {
    const record = await this.prisma.cliente.update({
      where: { id },
      data: { deletedAt: null },
    });
    return this.mapToDomain(record);
  }

  async hasAssociations(id: string): Promise<boolean> {
    const counts = await this.prisma.cliente.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            cotizaciones: true,
            instalaciones: true,
          },
        },
      },
    });

    if (!counts) return false;
    return counts._count.cotizaciones > 0 || counts._count.instalaciones > 0;
  }
}
