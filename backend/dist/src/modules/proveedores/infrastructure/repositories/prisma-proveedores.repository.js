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
exports.PrismaProveedoresRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaProveedoresRepository = class PrismaProveedoresRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(options) {
        const where = {};
        if (!options?.includeDeleted) {
            where.deletedAt = null;
        }
        if (options?.search) {
            where.OR = [
                { nombre: { contains: options.search } },
                { telefono: { contains: options.search } },
                { correo: { contains: options.search } },
            ];
        }
        const sortBy = options?.sortBy || 'nombre';
        const sortOrder = options?.sortOrder || 'asc';
        const orderBy = {
            [sortBy]: sortOrder,
        };
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
            data: data.map((d) => this.toEntity(d)),
            total,
        };
    }
    async findById(id, includeDeleted = false) {
        const where = { id };
        const result = await this.prisma.proveedor.findUnique({ where });
        if (!result)
            return null;
        if (result.deletedAt && !includeDeleted)
            return null;
        return this.toEntity(result);
    }
    async create(data) {
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
    async update(id, data) {
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
    async delete(id) {
        await this.prisma.proveedor.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                activo: false,
            },
        });
    }
    async restore(id) {
        const restored = await this.prisma.proveedor.update({
            where: { id },
            data: {
                deletedAt: null,
                activo: true,
            },
        });
        return this.toEntity(restored);
    }
    toEntity(dbProveedor) {
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
};
exports.PrismaProveedoresRepository = PrismaProveedoresRepository;
exports.PrismaProveedoresRepository = PrismaProveedoresRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProveedoresRepository);
//# sourceMappingURL=prisma-proveedores.repository.js.map