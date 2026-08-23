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
exports.CotizacionesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
const create_cotizacion_use_case_1 = require("../application/use-cases/create-cotizacion.use-case");
const get_all_cotizaciones_use_case_1 = require("../application/use-cases/get-all-cotizaciones.use-case");
const get_cotizacion_by_id_use_case_1 = require("../application/use-cases/get-cotizacion-by-id.use-case");
const update_cotizacion_use_case_1 = require("../application/use-cases/update-cotizacion.use-case");
const change_estado_cotizacion_use_case_1 = require("../application/use-cases/change-estado-cotizacion.use-case");
const duplicate_cotizacion_use_case_1 = require("../application/use-cases/duplicate-cotizacion.use-case");
const delete_cotizacion_use_case_1 = require("../application/use-cases/delete-cotizacion.use-case");
const restore_cotizacion_use_case_1 = require("../application/use-cases/restore-cotizacion.use-case");
const create_cotizacion_dto_1 = require("../application/dtos/create-cotizacion.dto");
const update_cotizacion_dto_1 = require("../application/dtos/update-cotizacion.dto");
const change_estado_cotizacion_dto_1 = require("../application/dtos/change-estado-cotizacion.dto");
const get_cotizaciones_query_dto_1 = require("../application/dtos/get-cotizaciones-query.dto");
let CotizacionesController = class CotizacionesController {
    createCotizacionUseCase;
    getAllCotizacionesUseCase;
    getCotizacionByIdUseCase;
    updateCotizacionUseCase;
    changeEstadoCotizacionUseCase;
    duplicateCotizacionUseCase;
    deleteCotizacionUseCase;
    restoreCotizacionUseCase;
    constructor(createCotizacionUseCase, getAllCotizacionesUseCase, getCotizacionByIdUseCase, updateCotizacionUseCase, changeEstadoCotizacionUseCase, duplicateCotizacionUseCase, deleteCotizacionUseCase, restoreCotizacionUseCase) {
        this.createCotizacionUseCase = createCotizacionUseCase;
        this.getAllCotizacionesUseCase = getAllCotizacionesUseCase;
        this.getCotizacionByIdUseCase = getCotizacionByIdUseCase;
        this.updateCotizacionUseCase = updateCotizacionUseCase;
        this.changeEstadoCotizacionUseCase = changeEstadoCotizacionUseCase;
        this.duplicateCotizacionUseCase = duplicateCotizacionUseCase;
        this.deleteCotizacionUseCase = deleteCotizacionUseCase;
        this.restoreCotizacionUseCase = restoreCotizacionUseCase;
    }
    async create(dto) {
        return this.createCotizacionUseCase.execute(dto);
    }
    async findAll(query) {
        return this.getAllCotizacionesUseCase.execute(query);
    }
    async findOne(id) {
        return this.getCotizacionByIdUseCase.execute(id);
    }
    async update(id, dto) {
        return this.updateCotizacionUseCase.execute(id, dto);
    }
    async changeEstado(id, dto) {
        return this.changeEstadoCotizacionUseCase.execute(id, dto.estado);
    }
    async duplicate(id) {
        return this.duplicateCotizacionUseCase.execute(id);
    }
    async delete(id) {
        return this.deleteCotizacionUseCase.execute(id);
    }
    async restore(id) {
        return this.restoreCotizacionUseCase.execute(id);
    }
};
exports.CotizacionesController = CotizacionesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva cotización' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cotización creada exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cotizacion_dto_1.CreateCotizacionDto]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener listado paginado de cotizaciones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de cotizaciones obtenida' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_cotizaciones_query_dto_1.GetCotizacionesQueryDto]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de una cotización por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotización obtenida' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una cotización existente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotización actualizada exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cotizacion_dto_1.UpdateCotizacionDto]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar el estado de una cotización (Borrador, Enviada, Aprobada, Rechazada, Vencida)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estado actualizado exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_estado_cotizacion_dto_1.ChangeEstadoCotizacionDto]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "changeEstado", null);
__decorate([
    (0, common_1.Post)(':id/duplicar'),
    (0, swagger_1.ApiOperation)({ summary: 'Duplicar una cotización existente (Copia en estado Borrador)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cotización duplicada exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "duplicate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar de forma lógica (Soft Delete) una cotización' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotización eliminada de forma lógica' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar una cotización eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotización restaurada exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CotizacionesController.prototype, "restore", null);
exports.CotizacionesController = CotizacionesController = __decorate([
    (0, swagger_1.ApiTags)('Cotizaciones'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cotizaciones'),
    __metadata("design:paramtypes", [create_cotizacion_use_case_1.CreateCotizacionUseCase,
        get_all_cotizaciones_use_case_1.GetAllCotizacionesUseCase,
        get_cotizacion_by_id_use_case_1.GetCotizacionByIdUseCase,
        update_cotizacion_use_case_1.UpdateCotizacionUseCase,
        change_estado_cotizacion_use_case_1.ChangeEstadoCotizacionUseCase,
        duplicate_cotizacion_use_case_1.DuplicateCotizacionUseCase,
        delete_cotizacion_use_case_1.DeleteCotizacionUseCase,
        restore_cotizacion_use_case_1.RestoreCotizacionUseCase])
], CotizacionesController);
//# sourceMappingURL=cotizaciones.controller.js.map