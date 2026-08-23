"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotizacionesModule = void 0;
const common_1 = require("@nestjs/common");
const cotizaciones_controller_1 = require("./cotizaciones.controller");
const prisma_cotizaciones_repository_1 = require("./repositories/prisma-cotizaciones.repository");
const cotizaciones_repository_interface_1 = require("../domain/cotizaciones.repository.interface");
const create_cotizacion_use_case_1 = require("../application/use-cases/create-cotizacion.use-case");
const get_all_cotizaciones_use_case_1 = require("../application/use-cases/get-all-cotizaciones.use-case");
const get_cotizacion_by_id_use_case_1 = require("../application/use-cases/get-cotizacion-by-id.use-case");
const update_cotizacion_use_case_1 = require("../application/use-cases/update-cotizacion.use-case");
const change_estado_cotizacion_use_case_1 = require("../application/use-cases/change-estado-cotizacion.use-case");
const duplicate_cotizacion_use_case_1 = require("../application/use-cases/duplicate-cotizacion.use-case");
const delete_cotizacion_use_case_1 = require("../application/use-cases/delete-cotizacion.use-case");
const restore_cotizacion_use_case_1 = require("../application/use-cases/restore-cotizacion.use-case");
let CotizacionesModule = class CotizacionesModule {
};
exports.CotizacionesModule = CotizacionesModule;
exports.CotizacionesModule = CotizacionesModule = __decorate([
    (0, common_1.Module)({
        controllers: [cotizaciones_controller_1.CotizacionesController],
        providers: [
            {
                provide: cotizaciones_repository_interface_1.ICotizacionesRepository,
                useClass: prisma_cotizaciones_repository_1.PrismaCotizacionesRepository,
            },
            create_cotizacion_use_case_1.CreateCotizacionUseCase,
            get_all_cotizaciones_use_case_1.GetAllCotizacionesUseCase,
            get_cotizacion_by_id_use_case_1.GetCotizacionByIdUseCase,
            update_cotizacion_use_case_1.UpdateCotizacionUseCase,
            change_estado_cotizacion_use_case_1.ChangeEstadoCotizacionUseCase,
            duplicate_cotizacion_use_case_1.DuplicateCotizacionUseCase,
            delete_cotizacion_use_case_1.DeleteCotizacionUseCase,
            restore_cotizacion_use_case_1.RestoreCotizacionUseCase,
        ],
        exports: [
            cotizaciones_repository_interface_1.ICotizacionesRepository,
            get_cotizacion_by_id_use_case_1.GetCotizacionByIdUseCase,
        ],
    })
], CotizacionesModule);
//# sourceMappingURL=cotizaciones.module.js.map