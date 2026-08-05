import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IClientesRepository } from '../../domain/clientes.repository.interface';
import { Cliente } from '../../domain/cliente.entity';

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
      prismaCliente.createdAt,
      prismaCliente.updatedAt,
    );
  }

  async findAll(search?: string): Promise<Cliente[]> {
    const records = await this.prisma.cliente.findMany({
      where: search
        ? {
            OR: [
              { nombre: { contains: search } },
              { identificacion: { contains: search } },
              { email: { contains: search } },
              { telefono: { contains: search } },
            ],
          }
        : {},
      orderBy: { nombre: 'asc' },
    });
    return records.map((record) => this.mapToDomain(record));
  }

  async findById(id: string): Promise<Cliente | null> {
    const record = await this.prisma.cliente.findUnique({
      where: { id },
    });
    return record ? this.mapToDomain(record) : null;
  }

  async findByIdentificacion(identificacion: string): Promise<Cliente | null> {
    if (!identificacion) return null;
    const record = await this.prisma.cliente.findUnique({
      where: { identificacion },
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
  }): Promise<Cliente> {
    const record = await this.prisma.cliente.create({
      data: {
        nombre: cliente.nombre,
        identificacion: cliente.identificacion || null,
        telefono: cliente.telefono || null,
        email: cliente.email || null,
        direccion: cliente.direccion || null,
        notas: cliente.notas || null,
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
      },
    });
    return this.mapToDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cliente.delete({
      where: { id },
    });
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
