"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductosRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaProductosRepository = class PrismaProductosRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    includeRelations = {
        marca: true,
        categoria: true,
        proveedor: true,
    };
    async create(data) {
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
    async findAll(query) {
        const { search, marcaId, categoriaId, proveedorId, activo, page = 1, limit = 10, sortBy = 'nombre', sortOrder = 'asc', includeDeleted = false, } = query;
        const where = {
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
    async findById(id) {
        return this.prisma.producto.findUnique({
            where: { id },
            include: this.includeRelations,
        });
    }
    async findByCodigoInterno(codigoInterno) {
        return this.prisma.producto.findFirst({
            where: { codigoInterno },
        });
    }
    async findByNombreMarcaModelo(nombre, marcaId, modelo) {
        return this.prisma.producto.findFirst({
            where: {
                nombre: { equals: nombre },
                marcaId,
                modelo: modelo ? { equals: modelo } : null,
            },
        });
    }
    async update(id, data) {
        return this.prisma.producto.update({
            where: { id },
            data,
            include: this.includeRelations,
        });
    }
    async delete(id) {
        return this.prisma.producto.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                activo: false,
            },
            include: this.includeRelations,
        });
    }
    async restore(id) {
        return this.prisma.producto.update({
            where: { id },
            data: {
                deletedAt: null,
                activo: true,
            },
            include: this.includeRelations,
        });
    }
};
exports.PrismaProductosRepository = PrismaProductosRepository;
exports.PrismaProductosRepository = PrismaProductosRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductosRepository);
//# sourceMappingURL=prisma-productos.repository.js.map