import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IProductosRepository, PaginatedProductos, ProductoConRelaciones } from '../../domain/productos.repository.interface';
import { CreateProductoDto } from '../../application/dtos/create-producto.dto';
import { UpdateProductoDto } from '../../application/dtos/update-producto.dto';
import { GetProductosQueryDto } from '../../application/dtos/get-productos-query.dto';
import { Producto, Prisma } from '@prisma/client';

@Injectable()
export class PrismaProductosRepository implements IProductosRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeRelations = {
    marca: true,
    categoria: true,
    proveedor: true,
  };

  async create(data: CreateProductoDto & { precioVenta: number }): Promise<ProductoConRelaciones> {
    return this.prisma.producto.create({
      data: {
        codigoInterno: data.codigoInterno,
        nombre: data.nombre,
        modelo: data.modelo,
        descripcion: data.descripcion,
        imagenUrl: data.imagenUrl,
        activo: data.activo ?? true,
        marcaId: data.marcaId,
        categoriaId: data.categoriaId,
        proveedorId: data.proveedorId,
        precioCompra: data.precioCompra,
        margenPorcentaje: data.margenPorcentaje,
        precioVenta: data.precioVenta,
        garantiaMeses: data.garantiaMeses ?? 12,
        resolucion: data.resolucion,
        tecnologia: data.tecnologia,
        tipo: data.tipo,
        lente: data.lente,
        audio: data.audio,
        visionNocturna: data.visionNocturna,
        alimentacion: data.alimentacion,
        proteccionIP: data.proteccionIP,
      },
      include: this.includeRelations,
    });
  }

  async findAll(query: GetProductosQueryDto): Promise<PaginatedProductos> {
    const {
      search,
      marcaId,
      categoriaId,
      proveedorId,
      activo,
      page = 1,
      limit = 10,
      sortBy = 'nombre',
      sortOrder = 'asc',
      includeDeleted = false,
    } = query;

    const where: Prisma.ProductoWhereInput = {
      ...(includeDeleted ? {} : { deletedAt: null }),
      ...(activo !== undefined ? { activo } : {}),
      ...(marcaId ? { marcaId } : {}),
      ...(categoriaId ? { categoriaId } : {}),
      ...(proveedorId ? { proveedorId } : {}),
      ...(search
        ? {
            OR: [
              { nombre: { contains: search } },
              { codigoInterno: { contains: search } },
              { modelo: { contains: search } },
            ],
          }
        : {}),
    };

    const allowedSortFields = ['nombre', 'codigoInterno', 'modelo', 'precioVenta', 'createdAt', 'activo'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'nombre';

    const [data, total] = await Promise.all([
      this.prisma.producto.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [validSortBy]: sortOrder },
        include: this.includeRelations,
      }),
      this.prisma.producto.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<ProductoConRelaciones | null> {
    return this.prisma.producto.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  async findByCodigoInterno(codigoInterno: string): Promise<Producto | null> {
    return this.prisma.producto.findFirst({
      where: { codigoInterno },
    });
  }

  async findByNombreMarcaModelo(nombre: string, marcaId: string, modelo?: string | null): Promise<Producto | null> {
    return this.prisma.producto.findFirst({
      where: {
        nombre: { equals: nombre },
        marcaId,
        modelo: modelo ? { equals: modelo } : null,
      },
    });
  }

  async update(id: string, data: UpdateProductoDto & { precioVenta?: number }): Promise<ProductoConRelaciones> {
    return this.prisma.producto.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  async delete(id: string): Promise<ProductoConRelaciones> {
    return this.prisma.producto.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        activo: false,
      },
      include: this.includeRelations,
    });
  }

  async restore(id: string): Promise<ProductoConRelaciones> {
    return this.prisma.producto.update({
      where: { id },
      data: {
        deletedAt: null,
        activo: true,
      },
      include: this.includeRelations,
    });
  }
}
