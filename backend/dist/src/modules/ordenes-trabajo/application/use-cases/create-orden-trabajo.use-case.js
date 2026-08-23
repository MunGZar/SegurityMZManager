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
exports.CreateOrdenTrabajoUseCase = void 0;
const common_1 = require("@nestjs/common");
const ordenes_trabajo_repository_interface_1 = require("../../domain/ordenes-trabajo.repository.interface");
const cotizaciones_repository_interface_1 = require("../../../cotizaciones/domain/cotizaciones.repository.interface");
const client_1 = require("@prisma/client");
let CreateOrdenTrabajoUseCase = class CreateOrdenTrabajoUseCase {
    ordenesRepository;
    cotizacionesRepository;
    constructor(ordenesRepository, cotizacionesRepository) {
        this.ordenesRepository = ordenesRepository;
        this.cotizacionesRepository = cotizacionesRepository;
    }
    async execute(dto) {
        const cotizacion = await this.cotizacionesRepository.findById(dto.cotizacionId);
        if (!cotizacion) {
            throw new common_1.NotFoundException(`La cotización con ID '${dto.cotizacionId}' no existe.`);
        }
        if (cotizacion.estado !== client_1.CotizacionEstado.APROBADA) {
            throw new common_1.BadRequestException(`Solo se pueden crear Órdenes de Trabajo a partir de cotizaciones en estado 'APROBADA'. Estado actual: '${cotizacion.estado}'.`);
        }
        const existingOrder = await this.ordenesRepository.findByCotizacionId(dto.cotizacionId);
        if (existingOrder) {
            throw new common_1.ConflictException(`Ya existe una Orden de Trabajo (${existingOrder.folio}) generada para la cotización #${cotizacion.folio}.`);
        }
        const folio = await this.ordenesRepository.generateNextFolio();
        const direccion = dto.direccion || cotizacion.cliente?.direccion || undefined;
        return this.ordenesRepository.create({
            ...dto,
            folio,
            clienteId: cotizacion.clienteId,
            direccion,
        });
    }
};
exports.CreateOrdenTrabajoUseCase = CreateOrdenTrabajoUseCase;
exports.CreateOrdenTrabajoUseCase = CreateOrdenTrabajoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ordenes_trabajo_repository_interface_1.IOrdenesTrabajoRepository,
        cotizaciones_repository_interface_1.ICotizacionesRepository])
], CreateOrdenTrabajoUseCase);
//# sourceMappingURL=create-orden-trabajo.use-case.js.map