"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesTrabajoModule = void 0;
const common_1 = require("@nestjs/common");
const ordenes_trabajo_controller_1 = require("./ordenes-trabajo.controller");
const prisma_ordenes_trabajo_repository_1 = require("./repositories/prisma-ordenes-trabajo.repository");
const ordenes_trabajo_repository_interface_1 = require("../domain/ordenes-trabajo.repository.interface");
const cotizaciones_module_1 = require("../../cotizaciones/infrastructure/cotizaciones.module");
const create_orden_trabajo_use_case_1 = require("../application/use-cases/create-orden-trabajo.use-case");
const get_all_ordenes_trabajo_use_case_1 = require("../application/use-cases/get-all-ordenes-trabajo.use-case");
const get_orden_trabajo_by_id_use_case_1 = require("../application/use-cases/get-orden-trabajo-by-id.use-case");
const update_orden_trabajo_use_case_1 = require("../application/use-cases/update-orden-trabajo.use-case");
const change_estado_orden_trabajo_use_case_1 = require("../application/use-cases/change-estado-orden-trabajo.use-case");
const add_evidencia_use_case_1 = require("../application/use-cases/add-evidencia.use-case");
const delete_evidencia_use_case_1 = require("../application/use-cases/delete-evidencia.use-case");
const delete_orden_trabajo_use_case_1 = require("../application/use-cases/delete-orden-trabajo.use-case");
const restore_orden_trabajo_use_case_1 = require("../application/use-cases/restore-orden-trabajo.use-case");
let OrdenesTrabajoModule = class OrdenesTrabajoModule {
};
exports.OrdenesTrabajoModule = OrdenesTrabajoModule;
exports.OrdenesTrabajoModule = OrdenesTrabajoModule = __decorate([
    (0, common_1.Module)({
        imports: [cotizaciones_module_1.CotizacionesModule],
        controllers: [ordenes_trabajo_controller_1.OrdenesTrabajoController],
        providers: [
            {
                provide: ordenes_trabajo_repository_interface_1.IOrdenesTrabajoRepository,
                useClass: prisma_ordenes_trabajo_repository_1.PrismaOrdenesTrabajoRepository,
            },
            create_orden_trabajo_use_case_1.CreateOrdenTrabajoUseCase,
            get_all_ordenes_trabajo_use_case_1.GetAllOrdenesTrabajoUseCase,
            get_orden_trabajo_by_id_use_case_1.GetOrdenTrabajoByIdUseCase,
            update_orden_trabajo_use_case_1.UpdateOrdenTrabajoUseCase,
            change_estado_orden_trabajo_use_case_1.ChangeEstadoOrdenTrabajoUseCase,
            add_evidencia_use_case_1.AddEvidenciaUseCase,
            delete_evidencia_use_case_1.DeleteEvidenciaUseCase,
            delete_orden_trabajo_use_case_1.DeleteOrdenTrabajoUseCase,
            restore_orden_trabajo_use_case_1.RestoreOrdenTrabajoUseCase,
        ],
        exports: [
            ordenes_trabajo_repository_interface_1.IOrdenesTrabajoRepository,
            get_orden_trabajo_by_id_use_case_1.GetOrdenTrabajoByIdUseCase,
        ],
    })
], OrdenesTrabajoModule);
//# sourceMappingURL=ordenes-trabajo.module.js.map