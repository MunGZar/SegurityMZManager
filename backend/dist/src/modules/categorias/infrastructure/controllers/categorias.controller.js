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
exports.CategoriasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/infrastructure/guards/jwt-auth.guard");
const create_categoria_dto_1 = require("../../application/dtos/create-categoria.dto");
const update_categoria_dto_1 = require("../../application/dtos/update-categoria.dto");
const get_categorias_query_dto_1 = require("../../application/dtos/get-categorias-query.dto");
const create_categoria_use_case_1 = require("../../application/use-cases/create-categoria.use-case");
const get_all_categorias_use_case_1 = require("../../application/use-cases/get-all-categorias.use-case");
const get_categoria_by_id_use_case_1 = require("../../application/use-cases/get-categoria-by-id.use-case");
const update_categoria_use_case_1 = require("../../application/use-cases/update-categoria.use-case");
const delete_categoria_use_case_1 = require("../../application/use-cases/delete-categoria.use-case");
const restore_categoria_use_case_1 = require("../../application/use-cases/restore-categoria.use-case");
let CategoriasController = class CategoriasController {
    createCategoriaUseCase;
    getAllCategoriasUseCase;
    getCategoriaByIdUseCase;
    updateCategoriaUseCase;
    deleteCategoriaUseCase;
    restoreCategoriaUseCase;
    constructor(createCategoriaUseCase, getAllCategoriasUseCase, getCategoriaByIdUseCase, updateCategoriaUseCase, deleteCategoriaUseCase, restoreCategoriaUseCase) {
        this.createCategoriaUseCase = createCategoriaUseCase;
        this.getAllCategoriasUseCase = getAllCategoriasUseCase;
        this.getCategoriaByIdUseCase = getCategoriaByIdUseCase;
        this.updateCategoriaUseCase = updateCategoriaUseCase;
        this.deleteCategoriaUseCase = deleteCategoriaUseCase;
        this.restoreCategoriaUseCase = restoreCategoriaUseCase;
    }
    create(createCategoriaDto) {
        return this.createCategoriaUseCase.execute(createCategoriaDto);
    }
    findAll(query) {
        return this.getAllCategoriasUseCase.execute(query);
    }
    findOne(id) {
        return this.getCategoriaByIdUseCase.execute(id);
    }
    update(id, updateCategoriaDto) {
        return this.updateCategoriaUseCase.execute(id, updateCategoriaDto);
    }
    remove(id) {
        return this.deleteCategoriaUseCase.execute(id);
    }
    restore(id) {
        return this.restoreCategoriaUseCase.execute(id);
    }
};
exports.CategoriasController = CategoriasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva categoría' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Categoría creada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ya existe una categoría con el mismo nombre' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categoria_dto_1.CreateCategoriaDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener categorías con paginación, filtro y orden' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de categorías obtenido' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_categorias_query_dto_1.GetCategoriasQueryDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una categoría por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoría encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una categoría por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoría actualizada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nombre de categoría ya en uso' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_categoria_dto_1.UpdateCategoriaDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una categoría (Soft Delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoría desactivada y eliminada lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar una categoría eliminada lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoría restaurada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'La categoría ya está activa o conflicto de nombre' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "restore", null);
exports.CategoriasController = CategoriasController = __decorate([
    (0, swagger_1.ApiTags)('Categorías'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('categorias'),
    __metadata("design:paramtypes", [create_categoria_use_case_1.CreateCategoriaUseCase,
        get_all_categorias_use_case_1.GetAllCategoriasUseCase,
        get_categoria_by_id_use_case_1.GetCategoriaByIdUseCase,
        update_categoria_use_case_1.UpdateCategoriaUseCase,
        delete_categoria_use_case_1.DeleteCategoriaUseCase,
        restore_categoria_use_case_1.RestoreCategoriaUseCase])
], CategoriasController);
//# sourceMappingURL=categorias.controller.js.map