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
exports.OrdenesTrabajoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
const create_orden_trabajo_use_case_1 = require("../application/use-cases/create-orden-trabajo.use-case");
const get_all_ordenes_trabajo_use_case_1 = require("../application/use-cases/get-all-ordenes-trabajo.use-case");
const get_orden_trabajo_by_id_use_case_1 = require("../application/use-cases/get-orden-trabajo-by-id.use-case");
const update_orden_trabajo_use_case_1 = require("../application/use-cases/update-orden-trabajo.use-case");
const change_estado_orden_trabajo_use_case_1 = require("../application/use-cases/change-estado-orden-trabajo.use-case");
const add_evidencia_use_case_1 = require("../application/use-cases/add-evidencia.use-case");
const delete_evidencia_use_case_1 = require("../application/use-cases/delete-evidencia.use-case");
const delete_orden_trabajo_use_case_1 = require("../application/use-cases/delete-orden-trabajo.use-case");
const restore_orden_trabajo_use_case_1 = require("../application/use-cases/restore-orden-trabajo.use-case");
const create_orden_trabajo_dto_1 = require("../application/dtos/create-orden-trabajo.dto");
const update_orden_trabajo_dto_1 = require("../application/dtos/update-orden-trabajo.dto");
const change_estado_orden_trabajo_dto_1 = require("../application/dtos/change-estado-orden-trabajo.dto");
const add_evidencia_dto_1 = require("../application/dtos/add-evidencia.dto");
const get_ordenes_trabajo_query_dto_1 = require("../application/dtos/get-ordenes-trabajo-query.dto");
let OrdenesTrabajoController = class OrdenesTrabajoController {
    createOrdenTrabajoUseCase;
    getAllOrdenesTrabajoUseCase;
    getOrdenTrabajoByIdUseCase;
    updateOrdenTrabajoUseCase;
    changeEstadoOrdenTrabajoUseCase;
    addEvidenciaUseCase;
    deleteEvidenciaUseCase;
    deleteOrdenTrabajoUseCase;
    restoreOrdenTrabajoUseCase;
    constructor(createOrdenTrabajoUseCase, getAllOrdenesTrabajoUseCase, getOrdenTrabajoByIdUseCase, updateOrdenTrabajoUseCase, changeEstadoOrdenTrabajoUseCase, addEvidenciaUseCase, deleteEvidenciaUseCase, deleteOrdenTrabajoUseCase, restoreOrdenTrabajoUseCase) {
        this.createOrdenTrabajoUseCase = createOrdenTrabajoUseCase;
        this.getAllOrdenesTrabajoUseCase = getAllOrdenesTrabajoUseCase;
        this.getOrdenTrabajoByIdUseCase = getOrdenTrabajoByIdUseCase;
        this.updateOrdenTrabajoUseCase = updateOrdenTrabajoUseCase;
        this.changeEstadoOrdenTrabajoUseCase = changeEstadoOrdenTrabajoUseCase;
        this.addEvidenciaUseCase = addEvidenciaUseCase;
        this.deleteEvidenciaUseCase = deleteEvidenciaUseCase;
        this.deleteOrdenTrabajoUseCase = deleteOrdenTrabajoUseCase;
        this.restoreOrdenTrabajoUseCase = restoreOrdenTrabajoUseCase;
    }
    async create(dto) {
        return this.createOrdenTrabajoUseCase.execute(dto);
    }
    async findAll(query) {
        return this.getAllOrdenesTrabajoUseCase.execute(query);
    }
    async findOne(id) {
        return this.getOrdenTrabajoByIdUseCase.execute(id);
    }
    async update(id, dto) {
        return this.updateOrdenTrabajoUseCase.execute(id, dto);
    }
    async changeEstado(id, dto) {
        return this.changeEstadoOrdenTrabajoUseCase.execute(id, dto.estado);
    }
    async addEvidencia(id, dto) {
        return this.addEvidenciaUseCase.execute(id, dto);
    }
    async deleteEvidencia(evidenciaId) {
        return this.deleteEvidenciaUseCase.execute(evidenciaId);
    }
    async delete(id) {
        return this.deleteOrdenTrabajoUseCase.execute(id);
    }
    async restore(id) {
        return this.restoreOrdenTrabajoUseCase.execute(id);
    }
};
exports.OrdenesTrabajoController = OrdenesTrabajoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una Orden de Trabajo desde una Cotización Aprobada' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Orden de trabajo creada exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_orden_trabajo_dto_1.CreateOrdenTrabajoDto]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener listado paginado de órdenes de trabajo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de órdenes de trabajo obtenida' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_ordenes_trabajo_query_dto_1.GetOrdenesTrabajoQueryDto]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle completo de una orden de trabajo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orden de trabajo obtenida' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar información operativa y ficha técnica' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orden de trabajo actualizada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_orden_trabajo_dto_1.UpdateOrdenTrabajoDto]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar el estado de una orden (Pendiente, Programada, En proceso, Finalizada, Cancelada)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estado actualizado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_estado_orden_trabajo_dto_1.ChangeEstadoOrdenTrabajoDto]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "changeEstado", null);
__decorate([
    (0, common_1.Post)(':id/evidencias'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar una fotografía o evidencia técnica a la orden' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Evidencia registrada exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_evidencia_dto_1.AddEvidenciaDto]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "addEvidencia", null);
__decorate([
    (0, common_1.Delete)('evidencias/:evidenciaId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una fotografía o evidencia técnica' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Evidencia eliminada' }),
    __param(0, (0, common_1.Param)('evidenciaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "deleteEvidencia", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar de forma lógica (Soft Delete) una orden de trabajo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orden de trabajo eliminada lógicamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar una orden de trabajo eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orden de trabajo restaurada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdenesTrabajoController.prototype, "restore", null);
exports.OrdenesTrabajoController = OrdenesTrabajoController = __decorate([
    (0, swagger_1.ApiTags)('Órdenes de Trabajo'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ordenes-trabajo'),
    __metadata("design:paramtypes", [create_orden_trabajo_use_case_1.CreateOrdenTrabajoUseCase,
        get_all_ordenes_trabajo_use_case_1.GetAllOrdenesTrabajoUseCase,
        get_orden_trabajo_by_id_use_case_1.GetOrdenTrabajoByIdUseCase,
        update_orden_trabajo_use_case_1.UpdateOrdenTrabajoUseCase,
        change_estado_orden_trabajo_use_case_1.ChangeEstadoOrdenTrabajoUseCase,
        add_evidencia_use_case_1.AddEvidenciaUseCase,
        delete_evidencia_use_case_1.DeleteEvidenciaUseCase,
        delete_orden_trabajo_use_case_1.DeleteOrdenTrabajoUseCase,
        restore_orden_trabajo_use_case_1.RestoreOrdenTrabajoUseCase])
], OrdenesTrabajoController);
//# sourceMappingURL=ordenes-trabajo.controller.js.map