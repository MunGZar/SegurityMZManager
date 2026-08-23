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
exports.DuplicateCotizacionUseCase = void 0;
const common_1 = require("@nestjs/common");
const cotizaciones_repository_interface_1 = require("../../domain/cotizaciones.repository.interface");
const client_1 = require("@prisma/client");
let DuplicateCotizacionUseCase = class DuplicateCotizacionUseCase {
    cotizacionesRepository;
    constructor(cotizacionesRepository) {
        this.cotizacionesRepository = cotizacionesRepository;
    }
    async execute(id) {
        const original = await this.cotizacionesRepository.findById(id);
        if (!original) {
            throw new common_1.NotFoundException(`Cotización origen con ID '${id}' no encontrada`);
        }
        const folio = await this.cotizacionesRepository.generateNextFolio();
        const detalles = original.detalles.map((d) => ({
            productoId: d.productoId || undefined,
            tipo: d.tipo,
            nombre: `${d.nombre} (Copia)`,
            descripcion: d.descripcion || undefined,
            cantidad: d.cantidad,
            precioUnit: Number(d.precioUnit),
            subtotal: Number(d.subtotal),
        }));
        return this.cotizacionesRepository.create({
            clienteId: original.clienteId,
            observaciones: original.observaciones ? `Duplicado de ${original.folio}. ${original.observaciones}` : `Duplicado de ${original.folio}`,
            descuento: Number(original.descuento),
            estado: client_1.CotizacionEstado.BORRADOR,
            folio,
            subtotal: Number(original.subtotal),
            total: Number(original.total),
            detalles,
        });
    }
};
exports.DuplicateCotizacionUseCase = DuplicateCotizacionUseCase;
exports.DuplicateCotizacionUseCase = DuplicateCotizacionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cotizaciones_repository_interface_1.ICotizacionesRepository])
], DuplicateCotizacionUseCase);
//# sourceMappingURL=duplicate-cotizacion.use-case.js.map