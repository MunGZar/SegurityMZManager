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
exports.CreateOrdenTrabajoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateOrdenTrabajoDto {
    cotizacionId;
    fechaProgramada;
    horaProgramada;
    estado;
    prioridad;
    observaciones;
    direccion;
    observacionesTecnicas;
    serialesEquipos;
    usuarioDvr;
    passwordDvrEncrypted;
    direccionIp;
    garantiaMeses;
    fechaEntrega;
}
exports.CreateOrdenTrabajoDto = CreateOrdenTrabajoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la Cotización Aprobada que origina la orden' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "cotizacionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha programada para la instalación (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "fechaProgramada", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Hora programada (ej: 09:30 AM o 14:00)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "horaProgramada", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.OrdenTrabajoEstado, default: client_1.OrdenTrabajoEstado.PENDIENTE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.OrdenTrabajoEstado),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.OrdenTrabajoPrioridad, default: client_1.OrdenTrabajoPrioridad.MEDIA }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.OrdenTrabajoPrioridad),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "prioridad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observaciones generales del servicio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "observaciones", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dirección específica de la instalación' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observaciones técnicas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "observacionesTecnicas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Seriales de los equipos instalados' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "serialesEquipos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Usuario de acceso al DVR/NVR' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "usuarioDvr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Contraseña de acceso al DVR/NVR' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "passwordDvrEncrypted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dirección IP asignada' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "direccionIp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Garantía en meses', default: 12 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOrdenTrabajoDto.prototype, "garantiaMeses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de entrega del trabajo (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrdenTrabajoDto.prototype, "fechaEntrega", void 0);
//# sourceMappingURL=create-orden-trabajo.dto.js.map