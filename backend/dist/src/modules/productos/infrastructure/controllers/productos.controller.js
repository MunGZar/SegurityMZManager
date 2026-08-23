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
exports.ProductosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/infrastructure/guards/jwt-auth.guard");
const create_producto_dto_1 = require("../../application/dtos/create-producto.dto");
const update_producto_dto_1 = require("../../application/dtos/update-producto.dto");
const get_productos_query_dto_1 = require("../../application/dtos/get-productos-query.dto");
const create_producto_use_case_1 = require("../../application/use-cases/create-producto.use-case");
const get_all_productos_use_case_1 = require("../../application/use-cases/get-all-productos.use-case");
const get_producto_by_id_use_case_1 = require("../../application/use-cases/get-producto-by-id.use-case");
const update_producto_use_case_1 = require("../../application/use-cases/update-producto.use-case");
const delete_producto_use_case_1 = require("../../application/use-cases/delete-producto.use-case");
const restore_producto_use_case_1 = require("../../application/use-cases/restore-producto.use-case");
let ProductosController = class ProductosController {
    createProductoUseCase;
    getAllProductosUseCase;
    getProductoByIdUseCase;
    updateProductoUseCase;
    deleteProductoUseCase;
    restoreProductoUseCase;
    constructor(createProductoUseCase, getAllProductosUseCase, getProductoByIdUseCase, updateProductoUseCase, deleteProductoUseCase, restoreProductoUseCase) {
        this.createProductoUseCase = createProductoUseCase;
        this.getAllProductosUseCase = getAllProductosUseCase;
        this.getProductoByIdUseCase = getProductoByIdUseCase;
        this.updateProductoUseCase = updateProductoUseCase;
        this.deleteProductoUseCase = deleteProductoUseCase;
        this.restoreProductoUseCase = restoreProductoUseCase;
    }
    create(createProductoDto) {
        return this.createProductoUseCase.execute(createProductoDto);
    }
    findAll(query) {
        return this.getAllProductosUseCase.execute(query);
    }
    findOne(id) {
        return this.getProductoByIdUseCase.execute(id);
    }
    update(id, updateProductoDto) {
        return this.updateProductoUseCase.execute(id, updateProductoDto);
    }
    remove(id) {
        return this.deleteProductoUseCase.execute(id);
    }
    restore(id) {
        return this.restoreProductoUseCase.execute(id);
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo producto' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos o importes inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Código interno o combinación (nombre, marca, modelo) duplicado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_dto_1.CreateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener productos con paginación, filtros y orden' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listado de productos obtenido' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_productos_query_dto_1.GetProductosQueryDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un producto por su ID con sus relaciones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un producto por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Código o combinación duplicado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_producto_dto_1.UpdateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un producto (Soft Delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto desactivado y eliminado lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restaurar un producto eliminado lógicamente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto restaurado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'El producto ya está activo o conflicto de código' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "restore", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('Productos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [create_producto_use_case_1.CreateProductoUseCase,
        get_all_productos_use_case_1.GetAllProductosUseCase,
        get_producto_by_id_use_case_1.GetProductoByIdUseCase,
        update_producto_use_case_1.UpdateProductoUseCase,
        delete_producto_use_case_1.DeleteProductoUseCase,
        restore_producto_use_case_1.RestoreProductoUseCase])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map