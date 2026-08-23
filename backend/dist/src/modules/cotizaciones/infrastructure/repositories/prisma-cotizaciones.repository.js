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
exports.PrismaCotizacionesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PrismaCotizacionesRepository = class PrismaCotizacionesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    get includeRelations() {
        return {
            cliente: true,
            detalles: {
                orderBy: {
                    orden: 'asc',
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
    async generateNextFolio() {
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
    async create(data) {
        const { clienteId, observaciones, descuento, estado, folio, subtotal, total, detalles } = data;
        return this.prisma.cotizacion.create({
            data: {
                folio,
                clienteId,
                observaciones,
                descuento: descuento || 0,
                subtotal,
                total,
                estado: estado || client_1.CotizacionEstado.BORRADOR,
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
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, clienteId, estado, sortBy = 'createdAt', sortOrder = 'desc', includeDeleted } = query;
        const where = {};
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
            data: data,
            total,
            page,
            limit,
            totalPages,
        };
    }
    async findById(id) {
        const cotizacion = await this.prisma.cotizacion.findUnique({
            where: { id },
            include: this.includeRelations,
        });
        return cotizacion;
    }
    async findByFolio(folio) {
        const cotizacion = await this.prisma.cotizacion.findUnique({
            where: { folio },
            include: this.includeRelations,
        });
        return cotizacion;
    }
    async update(id, data) {
        const { clienteId, observaciones, descuento, estado, subtotal, total, detalles } = data;
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
        });
    }
    async changeEstado(id, estado) {
        return this.prisma.cotizacion.update({
            where: { id },
            data: { estado },
            include: this.includeRelations,
        });
    }
    async delete(id) {
        return this.prisma.cotizacion.update({
            where: { id },
            data: { deletedAt: new Date() },
            include: this.includeRelations,
        });
    }
    async restore(id) {
        return this.prisma.cotizacion.update({
            where: { id },
            data: { deletedAt: null },
            include: this.includeRelations,
        });
    }
};
exports.PrismaCotizacionesRepository = PrismaCotizacionesRepository;
exports.PrismaCotizacionesRepository = PrismaCotizacionesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCotizacionesRepository);
//# sourceMappingURL=prisma-cotizaciones.repository.js.map