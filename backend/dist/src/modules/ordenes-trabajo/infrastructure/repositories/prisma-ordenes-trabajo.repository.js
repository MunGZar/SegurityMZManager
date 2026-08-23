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
exports.PrismaOrdenesTrabajoRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PrismaOrdenesTrabajoRepository = class PrismaOrdenesTrabajoRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    get includeRelations() {
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
                    createdAt: 'desc',
                },
            },
        };
    }
    async generateNextFolio() {
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
    async create(data) {
        const { cotizacionId, clienteId, folio, fechaProgramada, horaProgramada, estado, prioridad, observaciones, direccion, observacionesTecnicas, serialesEquipos, usuarioDvr, passwordDvrEncrypted, direccionIp, garantiaMeses, fechaEntrega, } = data;
        return this.prisma.ordenTrabajo.create({
            data: {
                folio,
                cotizacionId,
                clienteId,
                fechaProgramada: fechaProgramada ? new Date(fechaProgramada) : null,
                horaProgramada,
                estado: estado || client_1.OrdenTrabajoEstado.PENDIENTE,
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
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, clienteId, estado, prioridad, fechaProgramada, sortBy = 'createdAt', sortOrder = 'desc', includeDeleted, } = query;
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
            data: data,
            total,
            page,
            limit,
            totalPages,
        };
    }
    async findById(id) {
        const orden = await this.prisma.ordenTrabajo.findUnique({
            where: { id },
            include: this.includeRelations,
        });
        return orden;
    }
    async findByCotizacionId(cotizacionId) {
        const orden = await this.prisma.ordenTrabajo.findUnique({
            where: { cotizacionId },
            include: this.includeRelations,
        });
        return orden;
    }
    async update(id, data) {
        const { fechaProgramada, fechaEntrega, ...rest } = data;
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
        });
    }
    async changeEstado(id, estado) {
        return this.prisma.ordenTrabajo.update({
            where: { id },
            data: { estado },
            include: this.includeRelations,
        });
    }
    async addEvidencia(ordenTrabajoId, data) {
        return this.prisma.ordenTrabajoEvidencia.create({
            data: {
                ordenTrabajoId,
                tipo: data.tipo,
                url: data.url,
                descripcion: data.descripcion,
            },
        });
    }
    async deleteEvidencia(evidenciaId) {
        await this.prisma.ordenTrabajoEvidencia.delete({
            where: { id: evidenciaId },
        });
        return true;
    }
    async delete(id) {
        return this.prisma.ordenTrabajo.update({
            where: { id },
            data: { deletedAt: new Date() },
            include: this.includeRelations,
        });
    }
    async restore(id) {
        return this.prisma.ordenTrabajo.update({
            where: { id },
            data: { deletedAt: null },
            include: this.includeRelations,
        });
    }
};
exports.PrismaOrdenesTrabajoRepository = PrismaOrdenesTrabajoRepository;
exports.PrismaOrdenesTrabajoRepository = PrismaOrdenesTrabajoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaOrdenesTrabajoRepository);
//# sourceMappingURL=prisma-ordenes-trabajo.repository.js.map