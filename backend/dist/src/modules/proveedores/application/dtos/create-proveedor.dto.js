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
exports.CreateProveedorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProveedorDto {
    nombre;
    contacto;
    telefono;
    whatsapp;
    correo;
    ciudad;
    direccion;
    observaciones;
    activo;
}
exports.CreateProveedorDto = CreateProveedorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Syscom México', description: 'Nombre de la empresa proveedora' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ing. Alejandro Ruiz', description: 'Nombre del contacto directo', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "contacto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+52 5543210987', description: 'Teléfono de contacto', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+52 5598765432', description: 'Número de WhatsApp', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ventas@syscom.mx', description: 'Correo electrónico de contacto', required: false }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "correo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chihuahua', description: 'Ciudad del proveedor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "ciudad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Av. Heroico Colegio Militar 123', description: 'Dirección física', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Distribuidor principal de cámaras Hikvision', description: 'Observaciones generales', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedorDto.prototype, "observaciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Estado activo o inactivo', required: false, default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProveedorDto.prototype, "activo", void 0);
//# sourceMappingURL=create-proveedor.dto.js.map