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
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_cliente_use_case_1 = require("../../application/use-cases/create-cliente.use-case");
const get_all_clientes_use_case_1 = require("../../application/use-cases/get-all-clientes.use-case");
const get_cliente_by_id_use_case_1 = require("../../application/use-cases/get-cliente-by-id.use-case");
const update_cliente_use_case_1 = require("../../application/use-cases/update-cliente.use-case");
const delete_cliente_use_case_1 = require("../../application/use-cases/delete-cliente.use-case");
const restore_cliente_use_case_1 = require("../../application/use-cases/restore-cliente.use-case");
const create_cliente_dto_1 = require("../../application/dtos/create-cliente.dto");
const update_cliente_dto_1 = require("../../application/dtos/update-cliente.dto");
const get_clientes_query_dto_1 = require("../../application/dtos/get-clientes-query.dto");
let ClientesController = class ClientesController {
    createClienteUseCase;
    getAllClientesUseCase;
    getClienteByIdUseCase;
    updateClienteUseCase;
    deleteClienteUseCase;
    restoreClienteUseCase;
    constructor(createClienteUseCase, getAllClientesUseCase, getClienteByIdUseCase, updateClienteUseCase, deleteClienteUseCase, restoreClienteUseCase) {
        this.createClienteUseCase = createClienteUseCase;
        this.getAllClientesUseCase = getAllClientesUseCase;
        this.getClienteByIdUseCase = getClienteByIdUseCase;
        this.updateClienteUseCase = updateClienteUseCase;
        this.deleteClienteUseCase = deleteClienteUseCase;
        this.restoreClienteUseCase = restoreClienteUseCase;
    }
    async findAll(query) {
        return this.getAllClientesUseCase.execute(query);
    }
    async findOne(id) {
        return this.getClienteByIdUseCase.execute(id);
    }
    async create(createClienteDto) {
        return this.createClienteUseCase.execute(createClienteDto);
    }
    async update(id, updateClienteDto) {
        return this.updateClienteUseCase.execute(id, updateClienteDto);
    }
    async remove(id) {
        await this.deleteClienteUseCase.execute(id);
    }
    async restore(id) {
        return this.restoreClienteUseCase.execute(id);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener listado de clientes paginado, ordenado y filtrado' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado de clientes obtenido exitosamente',
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
                            identificacion: { type: 'string', nullable: true },
                            telefono: { type: 'string', nullable: true },
                            email: { type: 'string', nullable: true },
                            direccion: { type: 'string', nullable: true },
                            notas: { type: 'string', nullable: true },
                            status: { type: 'string', enum: ['PROSPECTO', 'ACTIVO', 'INACTIVO'] },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            deletedAt: { type: 'string', format: 'date-time', nullable: true },
                        }
                    }
                },
                total: { type: 'number', example: 45 }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_clientes_query_dto_1.GetClientesQueryDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un cliente por su ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Cliente encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo cliente' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Cliente creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o identificación ya registrada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar la información de un cliente' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Cliente actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o identificación duplicada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminación lógica de un cliente (Soft Delete)' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Cliente eliminado lógicamente exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar un cliente eliminado lógicamente' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Cliente restaurado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "restore", null);
exports.ClientesController = ClientesController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [create_cliente_use_case_1.CreateClienteUseCase,
        get_all_clientes_use_case_1.GetAllClientesUseCase,
        get_cliente_by_id_use_case_1.GetClienteByIdUseCase,
        update_cliente_use_case_1.UpdateClienteUseCase,
        delete_cliente_use_case_1.DeleteClienteUseCase,
        restore_cliente_use_case_1.RestoreClienteUseCase])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map