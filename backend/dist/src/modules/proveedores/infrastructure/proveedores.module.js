"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedoresModule = void 0;
const common_1 = require("@nestjs/common");
const proveedores_controller_1 = require("./controllers/proveedores.controller");
const proveedores_repository_interface_1 = require("../domain/proveedores.repository.interface");
const prisma_proveedores_repository_1 = require("./repositories/prisma-proveedores.repository");
const create_proveedor_use_case_1 = require("../application/use-cases/create-proveedor.use-case");
const get_all_proveedores_use_case_1 = require("../application/use-cases/get-all-proveedores.use-case");
const get_proveedor_by_id_use_case_1 = require("../application/use-cases/get-proveedor-by-id.use-case");
const update_proveedor_use_case_1 = require("../application/use-cases/update-proveedor.use-case");
const delete_proveedor_use_case_1 = require("../application/use-cases/delete-proveedor.use-case");
const restore_proveedor_use_case_1 = require("../application/use-cases/restore-proveedor.use-case");
let ProveedoresModule = class ProveedoresModule {
};
exports.ProveedoresModule = ProveedoresModule;
exports.ProveedoresModule = ProveedoresModule = __decorate([
    (0, common_1.Module)({
        controllers: [proveedores_controller_1.ProveedoresController],
        providers: [
            create_proveedor_use_case_1.CreateProveedorUseCase,
            get_all_proveedores_use_case_1.GetAllProveedoresUseCase,
            get_proveedor_by_id_use_case_1.GetProveedorByIdUseCase,
            update_proveedor_use_case_1.UpdateProveedorUseCase,
            delete_proveedor_use_case_1.DeleteProveedorUseCase,
            restore_proveedor_use_case_1.RestoreProveedorUseCase,
            {
                provide: proveedores_repository_interface_1.IProveedoresRepository,
                useClass: prisma_proveedores_repository_1.PrismaProveedoresRepository,
            },
        ],
        exports: [
            create_proveedor_use_case_1.CreateProveedorUseCase,
            get_all_proveedores_use_case_1.GetAllProveedoresUseCase,
            get_proveedor_by_id_use_case_1.GetProveedorByIdUseCase,
            update_proveedor_use_case_1.UpdateProveedorUseCase,
            delete_proveedor_use_case_1.DeleteProveedorUseCase,
            restore_proveedor_use_case_1.RestoreProveedorUseCase,
        ],
    })
], ProveedoresModule);
//# sourceMappingURL=proveedores.module.js.map