"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcasModule = void 0;
const common_1 = require("@nestjs/common");
const marcas_controller_1 = require("./controllers/marcas.controller");
const marcas_repository_interface_1 = require("../domain/marcas.repository.interface");
const prisma_marcas_repository_1 = require("./repositories/prisma-marcas.repository");
const create_marca_use_case_1 = require("../application/use-cases/create-marca.use-case");
const get_all_marcas_use_case_1 = require("../application/use-cases/get-all-marcas.use-case");
const get_marca_by_id_use_case_1 = require("../application/use-cases/get-marca-by-id.use-case");
const update_marca_use_case_1 = require("../application/use-cases/update-marca.use-case");
const delete_marca_use_case_1 = require("../application/use-cases/delete-marca.use-case");
const restore_marca_use_case_1 = require("../application/use-cases/restore-marca.use-case");
let MarcasModule = class MarcasModule {
};
exports.MarcasModule = MarcasModule;
exports.MarcasModule = MarcasModule = __decorate([
    (0, common_1.Module)({
        controllers: [marcas_controller_1.MarcasController],
        providers: [
            create_marca_use_case_1.CreateMarcaUseCase,
            get_all_marcas_use_case_1.GetAllMarcasUseCase,
            get_marca_by_id_use_case_1.GetMarcaByIdUseCase,
            update_marca_use_case_1.UpdateMarcaUseCase,
            delete_marca_use_case_1.DeleteMarcaUseCase,
            restore_marca_use_case_1.RestoreMarcaUseCase,
            {
                provide: marcas_repository_interface_1.IMarcasRepository,
                useClass: prisma_marcas_repository_1.PrismaMarcasRepository,
            },
        ],
        exports: [
            create_marca_use_case_1.CreateMarcaUseCase,
            get_all_marcas_use_case_1.GetAllMarcasUseCase,
            get_marca_by_id_use_case_1.GetMarcaByIdUseCase,
            update_marca_use_case_1.UpdateMarcaUseCase,
            delete_marca_use_case_1.DeleteMarcaUseCase,
            restore_marca_use_case_1.RestoreMarcaUseCase,
        ],
    })
], MarcasModule);
//# sourceMappingURL=marcas.module.js.map