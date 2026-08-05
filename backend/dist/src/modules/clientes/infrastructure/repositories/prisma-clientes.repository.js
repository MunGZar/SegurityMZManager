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
exports.PrismaClientesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const cliente_entity_1 = require("../../domain/cliente.entity");
let PrismaClientesRepository = class PrismaClientesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapToDomain(prismaCliente) {
        return new cliente_entity_1.Cliente(prismaCliente.id, prismaCliente.nombre, prismaCliente.identificacion, prismaCliente.telefono, prismaCliente.email, prismaCliente.direccion, prismaCliente.notas, prismaCliente.createdAt, prismaCliente.updatedAt);
    }
    async findAll(search) {
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
    async findById(id) {
        const record = await this.prisma.cliente.findUnique({
            where: { id },
        });
        return record ? this.mapToDomain(record) : null;
    }
    async findByIdentificacion(identificacion) {
        if (!identificacion)
            return null;
        const record = await this.prisma.cliente.findUnique({
            where: { identificacion },
        });
        return record ? this.mapToDomain(record) : null;
    }
    async create(cliente) {
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
    async update(id, cliente) {
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
    async delete(id) {
        await this.prisma.cliente.delete({
            where: { id },
        });
    }
    async hasAssociations(id) {
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
        if (!counts)
            return false;
        return counts._count.cotizaciones > 0 || counts._count.instalaciones > 0;
    }
};
exports.PrismaClientesRepository = PrismaClientesRepository;
exports.PrismaClientesRepository = PrismaClientesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaClientesRepository);
//# sourceMappingURL=prisma-clientes.repository.js.map