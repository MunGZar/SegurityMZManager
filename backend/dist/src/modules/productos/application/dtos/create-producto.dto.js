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
exports.CreateProductoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateProductoDto {
    codigoInterno;
    nombre;
    modelo;
    descripcion;
    imagenUrl;
    activo;
    marcaId;
    categoriaId;
    proveedorId;
    precioCompra;
    margenPorcentaje;
    garantiaMeses = 12;
    resolucion;
    tecnologia;
    tipo;
    lente;
    audio;
    visionNocturna;
    alimentacion;
    proteccionIP;
}
exports.CreateProductoDto = CreateProductoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código interno o SKU del producto', example: 'CAM-IP-001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El código interno es obligatorio' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigoInterno", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre descriptivo del producto', example: 'Cámara Domo IP 4MP Full Color' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Modelo del fabricante', example: 'DH-IPC-HDW1431S' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción detallada', example: 'Cámara tipo domo metálica para exterior con visión nocturna a color' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL de la imagen principal', example: 'https://ejemplo.com/imagenes/camara.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "imagenUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Estado activo del producto', default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la marca asociada', example: 'uuid-marca' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La marca es obligatoria' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "marcaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la categoría asociada', example: 'uuid-categoria' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoría es obligatoria' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "categoriaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del proveedor principal', example: 'uuid-proveedor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El proveedor es obligatorio' }),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "proveedorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Precio de compra (Costo)', example: 45.50 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio de compra debe ser un número válido' }),
    (0, class_validator_1.Min)(0, { message: 'El precio de compra no puede ser negativo' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "precioCompra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Porcentaje de margen comercial (%)', example: 35 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'El margen debe ser un número válido' }),
    (0, class_validator_1.Min)(0, { message: 'El margen no puede ser negativo' }),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "margenPorcentaje", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Garantía en meses', default: 12, example: 12 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'La garantía debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'La garantía no puede ser negativa' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "garantiaMeses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Resolución del equipo', example: '4MP / 1080p' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "resolucion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tecnología', example: 'IP / HDCVI' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "tecnologia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tipo de equipo', example: 'Domo / Bala / PTZ' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tipo o milimetraje de lente', example: '2.8mm' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "lente", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Características de audio', example: 'Micrófono integrado' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "audio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Alcance o tecnología de visión nocturna', example: 'Smart IR 30m / Full Color' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "visionNocturna", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Alimentación eléctrica', example: '12V DC / PoE 802.3af' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "alimentacion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Grado de protección intemperie/golpes', example: 'IP67 / IK10' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "proteccionIP", void 0);
//# sourceMappingURL=create-producto.dto.js.map