"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasModule = void 0;
const common_1 = require("@nestjs/common");
const categorias_controller_1 = require("./controllers/categorias.controller");
const categorias_repository_interface_1 = require("../domain/categorias.repository.interface");
const prisma_categorias_repository_1 = require("./repositories/prisma-categorias.repository");
const create_categoria_use_case_1 = require("../application/use-cases/create-categoria.use-case");
const get_all_categorias_use_case_1 = require("../application/use-cases/get-all-categorias.use-case");
const get_categoria_by_id_use_case_1 = require("../application/use-cases/get-categoria-by-id.use-case");
const update_categoria_use_case_1 = require("../application/use-cases/update-categoria.use-case");
const delete_categoria_use_case_1 = require("../application/use-cases/delete-categoria.use-case");
const restore_categoria_use_case_1 = require("../application/use-cases/restore-categoria.use-case");
let CategoriasModule = class CategoriasModule {
};
exports.CategoriasModule = CategoriasModule;
exports.CategoriasModule = CategoriasModule = __decorate([
    (0, common_1.Module)({
        controllers: [categorias_controller_1.CategoriasController],
        providers: [
            create_categoria_use_case_1.CreateCategoriaUseCase,
            get_all_categorias_use_case_1.GetAllCategoriasUseCase,
            get_categoria_by_id_use_case_1.GetCategoriaByIdUseCase,
            update_categoria_use_case_1.UpdateCategoriaUseCase,
            delete_categoria_use_case_1.DeleteCategoriaUseCase,
            restore_categoria_use_case_1.RestoreCategoriaUseCase,
            {
                provide: categorias_repository_interface_1.ICategoriasRepository,
                useClass: prisma_categorias_repository_1.PrismaCategoriasRepository,
            },
        ],
        exports: [
            create_categoria_use_case_1.CreateCategoriaUseCase,
            get_all_categorias_use_case_1.GetAllCategoriasUseCase,
            get_categoria_by_id_use_case_1.GetCategoriaByIdUseCase,
            update_categoria_use_case_1.UpdateCategoriaUseCase,
            delete_categoria_use_case_1.DeleteCategoriaUseCase,
            restore_categoria_use_case_1.RestoreCategoriaUseCase,
        ],
    })
], CategoriasModule);
//# sourceMappingURL=categorias.module.js.map