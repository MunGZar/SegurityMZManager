"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosModule = void 0;
const common_1 = require("@nestjs/common");
const productos_controller_1 = require("./controllers/productos.controller");
const productos_repository_interface_1 = require("../domain/productos.repository.interface");
const prisma_productos_repository_1 = require("./repositories/prisma-productos.repository");
const create_producto_use_case_1 = require("../application/use-cases/create-producto.use-case");
const get_all_productos_use_case_1 = require("../application/use-cases/get-all-productos.use-case");
const get_producto_by_id_use_case_1 = require("../application/use-cases/get-producto-by-id.use-case");
const update_producto_use_case_1 = require("../application/use-cases/update-producto.use-case");
const delete_producto_use_case_1 = require("../application/use-cases/delete-producto.use-case");
const restore_producto_use_case_1 = require("../application/use-cases/restore-producto.use-case");
let ProductosModule = class ProductosModule {
};
exports.ProductosModule = ProductosModule;
exports.ProductosModule = ProductosModule = __decorate([
    (0, common_1.Module)({
        controllers: [productos_controller_1.ProductosController],
        providers: [
            create_producto_use_case_1.CreateProductoUseCase,
            get_all_productos_use_case_1.GetAllProductosUseCase,
            get_producto_by_id_use_case_1.GetProductoByIdUseCase,
            update_producto_use_case_1.UpdateProductoUseCase,
            delete_producto_use_case_1.DeleteProductoUseCase,
            restore_producto_use_case_1.RestoreProductoUseCase,
            {
                provide: productos_repository_interface_1.IProductosRepository,
                useClass: prisma_productos_repository_1.PrismaProductosRepository,
            },
        ],
        exports: [
            create_producto_use_case_1.CreateProductoUseCase,
            get_all_productos_use_case_1.GetAllProductosUseCase,
            get_producto_by_id_use_case_1.GetProductoByIdUseCase,
            update_producto_use_case_1.UpdateProductoUseCase,
            delete_producto_use_case_1.DeleteProductoUseCase,
            restore_producto_use_case_1.RestoreProductoUseCase,
        ],
    })
], ProductosModule);
//# sourceMappingURL=productos.module.js.map