import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Proveedor } from '../../domain/proveedor.entity';
import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';

@Injectable()
export class PrismaProveedoresRepository implements IProveedoresRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options?: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    includeDeleted?: boolean;
  }): Promise<{ data: Proveedor[]; total: number }> {
    const where: Prisma.ProveedorWhereInput = {};

    // Soft delete filtering
    if (!options?.includeDeleted) {
      where.deletedAt = null;
    }

    // Search filters
    if (options?.search) {
      where.OR = [
        { nombre: { contains: options.search } },
        { telefono: { contains: options.search } },
        { correo: { contains: options.search } },
      ];
    }

    // Sorting parameters
    const sortBy = options?.sortBy || 'nombre';
    const sortOrder = options?.sortOrder || 'asc';
    const orderBy: Prisma.ProveedorOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Pagination
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.proveedor.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.proveedor.count({ where }),
    ]);

    return {
      data: data.map((d: any) => this.toEntity(d)),
      total,
    };
  }

  async findById(id: string, includeDeleted = false): Promise<Proveedor | null> {
    const where: Prisma.ProveedorWhereUniqueInput = { id };
    const result = await this.prisma.proveedor.findUnique({ where });

    if (!result) return null;
    if (result.deletedAt && !includeDeleted) return null;

    return this.toEntity(result);
  }

  async create(data: {
    nombre: string;
    contacto?: string;
    telefono?: string;
    whatsapp?: string;
    correo?: string;
    ciudad?: string;
    direccion?: string;
    observaciones?: string;
    activo?: boolean;
  }): Promise<Proveedor> {
    const created = await this.prisma.proveedor.create({
      data: {
        nombre: data.nombre,
        contacto: data.contacto,
        telefono: data.telefono,
        whatsapp: data.whatsapp,
        correo: data.correo,
        ciudad: data.ciudad,
        direccion: data.direccion,
        observaciones: data.observaciones,
        activo: data.activo ?? true,
      },
    });

    return this.toEntity(created);
  }

  async update(
    id: string,
    data: {
      nombre?: string;
      contacto?: string;
      telefono?: string;
      whatsapp?: string;
      correo?: string;
      ciudad?: string;
      direccion?: string;
      observaciones?: string;
      activo?: boolean;
    },
  ): Promise<Proveedor> {
    const updated = await this.prisma.proveedor.update({
      where: { id },
      data: {
        nombre: data.nombre,
        contacto: data.contacto,
        telefono: data.telefono,
        whatsapp: data.whatsapp,
        correo: data.correo,
        ciudad: data.ciudad,
        direccion: data.direccion,
        observaciones: data.observaciones,
        activo: data.activo,
      },
    });

    return this.toEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.proveedor.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        activo: false, // Desactivar también en delete lógico
      },
    });
  }

  async restore(id: string): Promise<Proveedor> {
    const restored = await this.prisma.proveedor.update({
      where: { id },
      data: {
        deletedAt: null,
        activo: true, // Reactivar al restaurar
      },
    });

    return this.toEntity(restored);
  }

  private toEntity(dbProveedor: any): Proveedor {
    return {
      id: dbProveedor.id,
      nombre: dbProveedor.nombre,
      contacto: dbProveedor.contacto,
      telefono: dbProveedor.telefono,
      whatsapp: dbProveedor.whatsapp,
      correo: dbProveedor.correo,
      ciudad: dbProveedor.ciudad,
      direccion: dbProveedor.direccion,
      observaciones: dbProveedor.observaciones,
      activo: dbProveedor.activo,
      createdAt: dbProveedor.createdAt,
      updatedAt: dbProveedor.updatedAt,
      deletedAt: dbProveedor.deletedAt,
    };
  }
}
