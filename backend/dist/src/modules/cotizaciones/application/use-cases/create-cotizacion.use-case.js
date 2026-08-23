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
exports.CreateCotizacionUseCase = void 0;
const common_1 = require("@nestjs/common");
const cotizaciones_repository_interface_1 = require("../../domain/cotizaciones.repository.interface");
let CreateCotizacionUseCase = class CreateCotizacionUseCase {
    cotizacionesRepository;
    constructor(cotizacionesRepository) {
        this.cotizacionesRepository = cotizacionesRepository;
    }
    async execute(dto) {
        if (!dto.detalles || dto.detalles.length === 0) {
            throw new common_1.BadRequestException('La cotización debe incluir al menos un ítem o servicio');
        }
        const folio = await this.cotizacionesRepository.generateNextFolio();
        let subtotal = 0;
        const detallesCalculados = dto.detalles.map((item) => {
            const itemSubtotal = item.cantidad * item.precioUnit;
            subtotal += itemSubtotal;
            return {
                ...item,
                subtotal: itemSubtotal,
            };
        });
        const descuento = dto.descuento || 0;
        const total = Math.max(0, subtotal - descuento);
        return this.cotizacionesRepository.create({
            ...dto,
            folio,
            subtotal,
            total,
            detalles: detallesCalculados,
        });
    }
};
exports.CreateCotizacionUseCase = CreateCotizacionUseCase;
exports.CreateCotizacionUseCase = CreateCotizacionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cotizaciones_repository_interface_1.ICotizacionesRepository])
], CreateCotizacionUseCase);
//# sourceMappingURL=create-cotizacion.use-case.js.map