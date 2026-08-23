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
exports.PrismaCategoriasRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaCategoriasRepository = class PrismaCategoriasRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.categoria.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                activo: data.activo ?? true,
            },
        });
    }
    async findAll(query) {
        const { search, page = 1, limit = 10, sortBy = 'nombre', sortOrder = 'asc', includeDeleted = false } = query;
        const where = {
            ...(includeDeleted ? {} : { deletedAt: null }),
            ...(search
                ? {
                    OR: [
                        { nombre: { contains: search } },
                        { descripcion: { contains: search } },
                    ],
                }
                : {}),
        };
        const allowedSortFields = ['nombre', 'createdAt', 'activo'];
        const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'nombre';
        const [data, total] = await Promise.all([
            this.prisma.categoria.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [validSortBy]: sortOrder },
            }),
            this.prisma.categoria.count({ where }),
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
        return this.prisma.categoria.findUnique({
            where: { id },
        });
    }
    async findByNombre(nombre) {
        return this.prisma.categoria.findFirst({
            where: {
                nombre: {
                    equals: nombre,
                },
            },
        });
    }
    async update(id, data) {
        return this.prisma.categoria.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.categoria.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                activo: false,
            },
        });
    }
    async restore(id) {
        return this.prisma.categoria.update({
            where: { id },
            data: {
                deletedAt: null,
                activo: true,
            },
        });
    }
};
exports.PrismaCategoriasRepository = PrismaCategoriasRepository;
exports.PrismaCategoriasRepository = PrismaCategoriasRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCategoriasRepository);
//# sourceMappingURL=prisma-categorias.repository.js.map