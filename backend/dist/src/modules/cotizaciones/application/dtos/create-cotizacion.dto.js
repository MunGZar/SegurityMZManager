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
exports.CreateCotizacionDto = exports.CreateCotizacionDetalleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class CreateCotizacionDetalleDto {
    productoId;
    tipo;
    nombre;
    descripcion;
    cantidad;
    orden;
    precioUnit;
}
exports.CreateCotizacionDetalleDto = CreateCotizacionDetalleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID del producto asociado si pertenece al catálogo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCotizacionDetalleDto.prototype, "productoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['PRODUCTO', 'SERVICIO'], default: 'PRODUCTO' }),
    (0, class_validator_1.IsEnum)(client_1.CotizacionDetalleTipo),
    __metadata("design:type", String)
], CreateCotizacionDetalleDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre o concepto del ítem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del ítem es obligatorio' }),
    __metadata("design:type", String)
], CreateCotizacionDetalleDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción detallada' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCotizacionDetalleDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cantidad de unidades', minimum: 1, default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cantidad debe ser al menos 1' }),
    __metadata("design:type", Number)
], CreateCotizacionDetalleDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Orden o posición visual del ítem', default: 0 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCotizacionDetalleDto.prototype, "orden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Precio unitario histórico', example: 25000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El precio unitario no puede ser negativo' }),
    __metadata("design:type", Number)
], CreateCotizacionDetalleDto.prototype, "precioUnit", void 0);
class CreateCotizacionDto {
    clienteId;
    observaciones;
    descuento = 0;
    estado = client_1.CotizacionEstado.BORRADOR;
    detalles;
}
exports.CreateCotizacionDto = CreateCotizacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del cliente asignado' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El cliente es obligatorio' }),
    __metadata("design:type", String)
], CreateCotizacionDto.prototype, "clienteId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observaciones o condiciones comerciales' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCotizacionDto.prototype, "observaciones", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descuento global aplicado a la cotización', default: 0 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El descuento no puede ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCotizacionDto.prototype, "descuento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.CotizacionEstado, default: client_1.CotizacionEstado.BORRADOR }),
    (0, class_validator_1.IsEnum)(client_1.CotizacionEstado),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCotizacionDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateCotizacionDetalleDto], description: 'Líneas o ítems de la cotización' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateCotizacionDetalleDto),
    (0, class_validator_1.IsNotEmpty)({ message: 'La cotización debe incluir al menos un ítem' }),
    __metadata("design:type", Array)
], CreateCotizacionDto.prototype, "detalles", void 0);
//# sourceMappingURL=create-cotizacion.dto.js.map