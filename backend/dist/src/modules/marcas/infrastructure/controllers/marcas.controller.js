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
exports.MarcasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/infrastructure/guards/jwt-auth.guard");
const create_marca_dto_1 = require("../../application/dtos/create-marca.dto");
const update_marca_dto_1 = require("../../application/dtos/update-marca.dto");
const get_marcas_query_dto_1 = require("../../application/dtos/get-marcas-query.dto");
const create_marca_use_case_1 = require("../../application/use-cases/create-marca.use-case");
const get_all_marcas_use_case_1 = require("../../application/use-cases/get-all-marcas.use-case");
const get_marca_by_id_use_case_1 = require("../../application/use-cases/get-marca-by-id.use-case");
const update_marca_use_case_1 = require("../../application/use-cases/update-marca.use-case");
const delete_marca_use_case_1 = require("../../application/use-cases/delete-marca.use-case");
const restore_marca_use_case_1 = require("../../application/use-cases/restore-marca.use-case");
let MarcasController = class MarcasController {
    createMarcaUseCase;
    getAllMarcasUseCase;
    getMarcaByIdUseCase;
    updateMarcaUseCase;
    deleteMarcaUseCase;
    restoreMarcaUseCase;
    constructor(createMarcaUseCase, getAllMarcasUseCase, getMarcaByIdUseCase, updateMarcaUseCase, deleteMarcaUseCase, restoreMarcaUseCase) {
        this.createMarcaUseCase = createMarcaUseCase;
        this.getAllMarcasUseCase = getAllMarcasUseCase;
        this.getMarcaByIdUseCase = getMarcaByIdUseCase;
        this.updateMarcaUseCase = updateMarcaUseCase;
        this.deleteMarcaUseCase = deleteMarcaUseCase;
        this.restoreMarcaUseCase = restoreMarcaUseCase;
    }
    create(createMarcaDto) {
        return this.createMarcaUseCase.execute(createMarcaDto);
    }
    findAll(query) {
        return this.getAllMarcasUseCase.execute(query);
    }
    findOne(id) {
        return this.getMarcaByIdUseCase.execute(id);
    }
    update(id, updateMarcaDto) {
        return this.updateMarcaUseCase.execute(id, updateMarcaDto);
    }
    remove(id) {
        return this.deleteMarcaUseCase.execute(id);
    }
    restore(id) {
        return this.restoreMarcaUseCase.execute(id);
    }
};
exports.MarcasController = MarcasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva marca' }),
    (0, swagger_1.ApiResponse)({ status: 21, description: 'Marca creada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ya existe una marca con el mismo nombre' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_marca_dto_1.CreateMarcaDto]),
    __metadata("design:returntype", void 0)
], MarcasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener marcas con paginación, filtro y orden' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de marcas obtenido' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_marcas_query_dto_1.GetMarcasQueryDto]),
    __metadata("design:returntype", void 0)
], MarcasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una marca por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Marca encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Marca no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una marca por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Marca actualizada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Marca no encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nombre de marca ya en uso' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_marca_dto_1.UpdateMarcaDto]),
    __metadata("design:returntype", void 0)
], MarcasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una marca (Soft Delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Marca desactivada y eliminada lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Marca no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcasController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar una marca eliminada lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Marca restaurada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Marca no encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'La marca ya está activa o conflicto de nombre' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcasController.prototype, "restore", null);
exports.MarcasController = MarcasController = __decorate([
    (0, swagger_1.ApiTags)('Marcas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('marcas'),
    __metadata("design:paramtypes", [create_marca_use_case_1.CreateMarcaUseCase,
        get_all_marcas_use_case_1.GetAllMarcasUseCase,
        get_marca_by_id_use_case_1.GetMarcaByIdUseCase,
        update_marca_use_case_1.UpdateMarcaUseCase,
        delete_marca_use_case_1.DeleteMarcaUseCase,
        restore_marca_use_case_1.RestoreMarcaUseCase])
], MarcasController);
//# sourceMappingURL=marcas.controller.js.map