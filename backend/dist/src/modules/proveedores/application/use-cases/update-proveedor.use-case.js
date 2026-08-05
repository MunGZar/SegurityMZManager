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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProveedorUseCase = void 0;
const common_1 = require("@nestjs/common");
const proveedores_repository_interface_1 = require("../../domain/proveedores.repository.interface");
let UpdateProveedorUseCase = class UpdateProveedorUseCase {
    proveedoresRepository;
    constructor(proveedoresRepository) {
        this.proveedoresRepository = proveedoresRepository;
    }
    async execute(id, dto) {
        const existing = await this.proveedoresRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Proveedor con ID '${id}' no encontrado o inactivo`);
        }
        if (dto.nombre) {
            const all = await this.proveedoresRepository.findAll({ search: dto.nombre });
            const match = all.data.find((p) => p.nombre.toLowerCase().trim() === dto.nombre.toLowerCase().trim() && p.id !== id && !p.deletedAt);
            if (match) {
                throw new common_1.BadRequestException(`Ya existe otro proveedor activo registrado con el nombre '${dto.nombre}'`);
            }
        }
        return this.proveedoresRepository.update(id, {
            nombre: dto.nombre,
            contacto: dto.contacto !== undefined ? dto.contacto : undefined,
            telefono: dto.telefono !== undefined ? dto.telefono : undefined,
            whatsapp: dto.whatsapp !== undefined ? dto.whatsapp : undefined,
            correo: dto.correo !== undefined ? dto.correo : undefined,
            ciudad: dto.ciudad !== undefined ? dto.ciudad : undefined,
            direccion: dto.direccion !== undefined ? dto.direccion : undefined,
            observaciones: dto.observaciones !== undefined ? dto.observaciones : undefined,
            activo: dto.activo !== undefined ? dto.activo : undefined,
        });
    }
};
exports.UpdateProveedorUseCase = UpdateProveedorUseCase;
exports.UpdateProveedorUseCase = UpdateProveedorUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(proveedores_repository_interface_1.IProveedoresRepository)),
    __metadata("design:paramtypes", [Object])
], UpdateProveedorUseCase);
//# sourceMappingURL=update-proveedor.use-case.js.map