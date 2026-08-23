import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  IOrdenesTrabajoRepository,
  OrdenTrabajoCompleta,
  PaginatedOrdenesTrabajo,
} from '../../domain/ordenes-trabajo.repository.interface';
import { CreateOrdenTrabajoDto } from '../../application/dtos/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from '../../application/dtos/update-orden-trabajo.dto';
import { GetOrdenesTrabajoQueryDto } from '../../application/dtos/get-ordenes-trabajo-query.dto';
import { AddEvidenciaDto } from '../../application/dtos/add-evidencia.dto';
import { OrdenTrabajoEstado, OrdenTrabajoEvidencia, Prisma } from '@prisma/client';

@Injectable()
export class PrismaOrdenesTrabajoRepository implements IOrdenesTrabajoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get includeRelations() {
    return {
      cliente: true,
      cotizacion: {
        include: {
          detalles: {
            include: {
              producto: {
                include: {
                  marca: true,
                  categoria: true,
                },
              },
            },
          },
        },
      },
      evidencias: {
        orderBy: {
          createdAt: 'desc' as const,
        },
      },
    };
  }

  async generateNextFolio(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const prefix = `OT-${currentYear}-`;

    const lastOrder = await this.prisma.ordenTrabajo.findFirst({
      where: {
        folio: {
          startsWith: prefix,
        },
      },
      orderBy: {
        folio: 'desc',
      },
    });

    let nextNumber = 1;
    if (lastOrder) {
      const parts = lastOrder.folio.split('-');
      if (parts.length === 3) {
        const parsed = parseInt(parts[2], 10);
        if (!isNaN(parsed)) {
          nextNumber = parsed + 1;
        }
      }
    }

    const paddedNumber = String(nextNumber).padStart(4, '0');
    return `${prefix}${paddedNumber}`;
  }

  async create(
    data: CreateOrdenTrabajoDto & { folio: string; clienteId: string }
  ): Promise<OrdenTrabajoCompleta> {
    const {
      cotizacionId,
      clienteId,
      folio,
      fechaProgramada,
      horaProgramada,
      estado,
      prioridad,
      observaciones,
      direccion,
      observacionesTecnicas,
      serialesEquipos,
      usuarioDvr,
      passwordDvrEncrypted,
      direccionIp,
      garantiaMeses,
      fechaEntrega,
    } = data;

    return this.prisma.ordenTrabajo.create({
      data: {
        folio,
        cotizacionId,
        clienteId,
        fechaProgramada: fechaProgramada ? new Date(fechaProgramada) : null,
        horaProgramada,
        estado: estado || OrdenTrabajoEstado.PENDIENTE,
        prioridad: prioridad || 'MEDIA',
        observaciones,
        direccion,
        observacionesTecnicas,
        serialesEquipos,
        usuarioDvr,
        passwordDvrEncrypted,
        direccionIp,
        garantiaMeses: garantiaMeses !== undefined ? garantiaMeses : 12,
        fechaEntrega: fechaEntrega ? new Date(fechaEntrega) : null,
      },
      include: this.includeRelations,
    }) as unknown as OrdenTrabajoCompleta;
  }

  async findAll(query: GetOrdenesTrabajoQueryDto): Promise<PaginatedOrdenesTrabajo> {
    const {
      page = 1,
      limit = 10,
      search,
      clienteId,
      estado,
      prioridad,
      fechaProgramada,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      includeDeleted,
    } = query;

    const where: Prisma.OrdenTrabajoWhereInput = {};

    if (!includeDeleted) {
      where.deletedAt = null;
    }

    if (clienteId) {
      where.clienteId = clienteId;
    }

    if (estado) {
      where.estado = estado;
    }

    if (prioridad) {
      where.prioridad = prioridad;
    }

    if (fechaProgramada) {
      const startDate = new Date(fechaProgramada);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(fechaProgramada);
      endDate.setHours(23, 59, 59, 999);

      where.fechaProgramada = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (search) {
      where.OR = [
        { folio: { contains: search } },
        { direccion: { contains: search } },
        { cliente: { is: { nombre: { contains: search } } } },
        { cliente: { is: { identificacion: { contains: search } } } },
        { cotizacion: { is: { folio: { contains: search } } } },
      ];
    }

    const total = await this.prisma.ordenTrabajo.count({ where });
    const totalPages = Math.ceil(total / limit) || 1;

    const data = await this.prisma.ordenTrabajo.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: this.includeRelations,
    });

    return {
      data: data as unknown as OrdenTrabajoCompleta[],
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findById(id: string): Promise<OrdenTrabajoCompleta | null> {
    const orden = await this.prisma.ordenTrabajo.findUnique({
      where: { id },
      include: this.includeRelations,
    });

    return orden as unknown as OrdenTrabajoCompleta | null;
  }

  async findByCotizacionId(cotizacionId: string): Promise<OrdenTrabajoCompleta | null> {
    const orden = await this.prisma.ordenTrabajo.findUnique({
      where: { cotizacionId },
      include: this.includeRelations,
    });

    return orden as unknown as OrdenTrabajoCompleta | null;
  }

  async update(id: string, data: UpdateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta> {
    const {
      fechaProgramada,
      fechaEntrega,
      ...rest
    } = data;

    return this.prisma.ordenTrabajo.update({
      where: { id },
      data: {
        ...rest,
        ...(fechaProgramada !== undefined && {
          fechaProgramada: fechaProgramada ? new Date(fechaProgramada) : null,
        }),
        ...(fechaEntrega !== undefined && {
          fechaEntrega: fechaEntrega ? new Date(fechaEntrega) : null,
        }),
      },
      include: this.includeRelations,
    }) as unknown as OrdenTrabajoCompleta;
  }

  async changeEstado(id: string, estado: OrdenTrabajoEstado): Promise<OrdenTrabajoCompleta> {
    return this.prisma.ordenTrabajo.update({
      where: { id },
      data: { estado },
      include: this.includeRelations,
    }) as unknown as OrdenTrabajoCompleta;
  }

  async addEvidencia(ordenTrabajoId: string, data: AddEvidenciaDto): Promise<OrdenTrabajoEvidencia> {
    return this.prisma.ordenTrabajoEvidencia.create({
      data: {
        ordenTrabajoId,
        tipo: data.tipo,
        url: data.url,
        descripcion: data.descripcion,
      },
    });
  }

  async deleteEvidencia(evidenciaId: string): Promise<boolean> {
    await this.prisma.ordenTrabajoEvidencia.delete({
      where: { id: evidenciaId },
    });
    return true;
  }

  async delete(id: string): Promise<OrdenTrabajoCompleta> {
    return this.prisma.ordenTrabajo.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: this.includeRelations,
    }) as unknown as OrdenTrabajoCompleta;
  }

  async restore(id: string): Promise<OrdenTrabajoCompleta> {
    return this.prisma.ordenTrabajo.update({
      where: { id },
      data: { deletedAt: null },
      include: this.includeRelations,
    }) as unknown as OrdenTrabajoCompleta;
  }
}
