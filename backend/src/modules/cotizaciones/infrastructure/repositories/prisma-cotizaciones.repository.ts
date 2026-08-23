import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  ICotizacionesRepository,
  CotizacionConDetalles,
  PaginatedCotizaciones,
} from '../../domain/cotizaciones.repository.interface';
import { CreateCotizacionDto } from '../../application/dtos/create-cotizacion.dto';
import { UpdateCotizacionDto } from '../../application/dtos/update-cotizacion.dto';
import { GetCotizacionesQueryDto } from '../../application/dtos/get-cotizaciones-query.dto';
import { CotizacionEstado, Prisma } from '@prisma/client';

@Injectable()
export class PrismaCotizacionesRepository implements ICotizacionesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get includeRelations() {
    return {
      cliente: true,
      detalles: {
        orderBy: {
          orden: 'asc' as const,
        },
        include: {
          producto: {
            include: {
              marca: true,
              categoria: true,
            },
          },
        },
      },
    };
  }

  async generateNextFolio(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const prefix = `COT-${currentYear}-`;

    const lastQuote = await this.prisma.cotizacion.findFirst({
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
    if (lastQuote) {
      const parts = lastQuote.folio.split('-');
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
    data: CreateCotizacionDto & { folio: string; subtotal: number; total: number }
  ): Promise<CotizacionConDetalles> {
    const { clienteId, observaciones, descuento, estado, folio, subtotal, total, detalles } = data;

    return this.prisma.cotizacion.create({
      data: {
        folio,
        clienteId,
        observaciones,
        descuento: descuento || 0,
        subtotal,
        total,
        estado: estado || CotizacionEstado.BORRADOR,
        detalles: {
          create: detalles.map((d, index) => ({
            productoId: d.productoId || null,
            tipo: d.tipo,
            nombre: d.nombre,
            descripcion: d.descripcion,
            cantidad: d.cantidad,
            orden: d.orden !== undefined ? d.orden : index,
            precioUnit: d.precioUnit,
            subtotal: d.cantidad * d.precioUnit,
          })),
        },
      },
      include: this.includeRelations,
    }) as unknown as CotizacionConDetalles;
  }

  async findAll(query: GetCotizacionesQueryDto): Promise<PaginatedCotizaciones> {
    const { page = 1, limit = 10, search, clienteId, estado, sortBy = 'createdAt', sortOrder = 'desc', includeDeleted } = query;

    const where: Prisma.CotizacionWhereInput = {};

    if (!includeDeleted) {
      where.deletedAt = null;
    }

    if (clienteId) {
      where.clienteId = clienteId;
    }

    if (estado) {
      where.estado = estado;
    }

    if (search) {
      where.OR = [
        { folio: { contains: search } },
        { cliente: { is: { nombre: { contains: search } } } },
        { cliente: { is: { identificacion: { contains: search } } } },
        { cliente: { is: { email: { contains: search } } } },
        { observaciones: { contains: search } },
      ];
    }

    const total = await this.prisma.cotizacion.count({ where });
    const totalPages = Math.ceil(total / limit) || 1;

    const data = await this.prisma.cotizacion.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: this.includeRelations,
    });

    return {
      data: data as unknown as CotizacionConDetalles[],
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findById(id: string): Promise<CotizacionConDetalles | null> {
    const cotizacion = await this.prisma.cotizacion.findUnique({
      where: { id },
      include: this.includeRelations,
    });

    return cotizacion as unknown as CotizacionConDetalles | null;
  }

  async findByFolio(folio: string): Promise<CotizacionConDetalles | null> {
    const cotizacion = await this.prisma.cotizacion.findUnique({
      where: { folio },
      include: this.includeRelations,
    });

    return cotizacion as unknown as CotizacionConDetalles | null;
  }

  async update(
    id: string,
    data: UpdateCotizacionDto & { subtotal?: number; total?: number }
  ): Promise<CotizacionConDetalles> {
    const { clienteId, observaciones, descuento, estado, subtotal, total, detalles } = data;

    // Si vienen detalles, eliminamos los anteriores y creamos los nuevos
    if (detalles) {
      await this.prisma.cotizacionDetalle.deleteMany({
        where: { cotizacionId: id },
      });
    }

    return this.prisma.cotizacion.update({
      where: { id },
      data: {
        ...(clienteId && { clienteId }),
        ...(observaciones !== undefined && { observaciones }),
        ...(descuento !== undefined && { descuento }),
        ...(estado && { estado }),
        ...(subtotal !== undefined && { subtotal }),
        ...(total !== undefined && { total }),
        ...(detalles && {
          detalles: {
            create: detalles.map((d, index) => ({
              productoId: d.productoId || null,
              tipo: d.tipo,
              nombre: d.nombre,
              descripcion: d.descripcion,
              cantidad: d.cantidad,
              orden: d.orden !== undefined ? d.orden : index,
              precioUnit: d.precioUnit,
              subtotal: d.cantidad * d.precioUnit,
            })),
          },
        }),
      },
      include: this.includeRelations,
    }) as unknown as CotizacionConDetalles;
  }

  async changeEstado(id: string, estado: CotizacionEstado): Promise<CotizacionConDetalles> {
    return this.prisma.cotizacion.update({
      where: { id },
      data: { estado },
      include: this.includeRelations,
    }) as unknown as CotizacionConDetalles;
  }

  async delete(id: string): Promise<CotizacionConDetalles> {
    return this.prisma.cotizacion.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: this.includeRelations,
    }) as unknown as CotizacionConDetalles;
  }

  async restore(id: string): Promise<CotizacionConDetalles> {
    return this.prisma.cotizacion.update({
      where: { id },
      data: { deletedAt: null },
      include: this.includeRelations,
    }) as unknown as CotizacionConDetalles;
  }
}
