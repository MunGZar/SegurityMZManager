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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreCotizacionUseCase = void 0;
const common_1 = require("@nestjs/common");
const cotizaciones_repository_interface_1 = require("../../domain/cotizaciones.repository.interface");
let RestoreCotizacionUseCase = class RestoreCotizacionUseCase {
    cotizacionesRepository;
    constructor(cotizacionesRepository) {
        this.cotizacionesRepository = cotizacionesRepository;
    }
    async execute(id) {
        const existing = await this.cotizacionesRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Cotización con ID '${id}' no encontrada`);
        }
        return this.cotizacionesRepository.restore(id);
    }
};
exports.RestoreCotizacionUseCase = RestoreCotizacionUseCase;
exports.RestoreCotizacionUseCase = RestoreCotizacionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cotizaciones_repository_interface_1.ICotizacionesRepository])
], RestoreCotizacionUseCase);
//# sourceMappingURL=restore-cotizacion.use-case.js.map