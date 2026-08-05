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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_proveedor_use_case_1 = require("../../application/use-cases/create-proveedor.use-case");
const get_all_proveedores_use_case_1 = require("../../application/use-cases/get-all-proveedores.use-case");
const get_proveedor_by_id_use_case_1 = require("../../application/use-cases/get-proveedor-by-id.use-case");
const update_proveedor_use_case_1 = require("../../application/use-cases/update-proveedor.use-case");
const delete_proveedor_use_case_1 = require("../../application/use-cases/delete-proveedor.use-case");
const restore_proveedor_use_case_1 = require("../../application/use-cases/restore-proveedor.use-case");
const create_proveedor_dto_1 = require("../../application/dtos/create-proveedor.dto");
const update_proveedor_dto_1 = require("../../application/dtos/update-proveedor.dto");
const get_proveedores_query_dto_1 = require("../../application/dtos/get-proveedores-query.dto");
let ProveedoresController = class ProveedoresController {
    createProveedorUseCase;
    getAllProveedoresUseCase;
    getProveedorByIdUseCase;
    updateProveedorUseCase;
    deleteProveedorUseCase;
    restoreProveedorUseCase;
    constructor(createProveedorUseCase, getAllProveedoresUseCase, getProveedorByIdUseCase, updateProveedorUseCase, deleteProveedorUseCase, restoreProveedorUseCase) {
        this.createProveedorUseCase = createProveedorUseCase;
        this.getAllProveedoresUseCase = getAllProveedoresUseCase;
        this.getProveedorByIdUseCase = getProveedorByIdUseCase;
        this.updateProveedorUseCase = updateProveedorUseCase;
        this.deleteProveedorUseCase = deleteProveedorUseCase;
        this.restoreProveedorUseCase = restoreProveedorUseCase;
    }
    async findAll(query) {
        return this.getAllProveedoresUseCase.execute(query);
    }
    async findOne(id) {
        return this.getProveedorByIdUseCase.execute(id);
    }
    async create(createProveedorDto) {
        return this.createProveedorUseCase.execute(createProveedorDto);
    }
    async update(id, updateProveedorDto) {
        return this.updateProveedorUseCase.execute(id, updateProveedorDto);
    }
    async remove(id) {
        await this.deleteProveedorUseCase.execute(id);
    }
    async restore(id) {
        return this.restoreProveedorUseCase.execute(id);
    }
};
exports.ProveedoresController = ProveedoresController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener listado de proveedores paginado, ordenado y filtrado' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado de proveedores obtenido exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            nombre: { type: 'string' },
                            contacto: { type: 'string', nullable: true },
                            telefono: { type: 'string', nullable: true },
                            whatsapp: { type: 'string', nullable: true },
                            correo: { type: 'string', nullable: true },
                            ciudad: { type: 'string', nullable: true },
                            direccion: { type: 'string', nullable: true },
                            observaciones: { type: 'string', nullable: true },
                            activo: { type: 'boolean' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            deletedAt: { type: 'string', format: 'date-time', nullable: true },
                        }
                    }
                },
                total: { type: 'number', example: 12 }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_proveedores_query_dto_1.GetProveedoresQueryDto]),
    __metadata("design:returntype", Promise)
], ProveedoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un proveedor por su ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Proveedor encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProveedoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo proveedor' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Proveedor creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o proveedor ya registrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedor_dto_1.CreateProveedorDto]),
    __metadata("design:returntype", Promise)
], ProveedoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar la información de un proveedor' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Proveedor actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o nombre duplicado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proveedor_dto_1.UpdateProveedorDto]),
    __metadata("design:returntype", Promise)
], ProveedoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminación lógica de un proveedor (Soft Delete)' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Proveedor eliminado lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProveedoresController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar un proveedor eliminado lógicamente' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Proveedor restaurado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProveedoresController.prototype, "restore", null);
exports.ProveedoresController = ProveedoresController = __decorate([
    (0, swagger_1.ApiTags)('Proveedores'),
    (0, common_1.Controller)('proveedores'),
    __metadata("design:paramtypes", [create_proveedor_use_case_1.CreateProveedorUseCase,
        get_all_proveedores_use_case_1.GetAllProveedoresUseCase,
        get_proveedor_by_id_use_case_1.GetProveedorByIdUseCase,
        update_proveedor_use_case_1.UpdateProveedorUseCase,
        delete_proveedor_use_case_1.DeleteProveedorUseCase,
        restore_proveedor_use_case_1.RestoreProveedorUseCase])
], ProveedoresController);
//# sourceMappingURL=proveedores.controller.js.map