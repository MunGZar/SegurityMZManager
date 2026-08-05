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
exports.UpdateClienteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_cliente_dto_1 = require("./create-cliente.dto");
class UpdateClienteDto {
    nombre;
    identificacion;
    telefono;
    email;
    direccion;
    notas;
    status;
}
exports.UpdateClienteDto = UpdateClienteDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nombre completo del cliente',
        example: 'Juan Pérez Modificado',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Identificación única del cliente (DNI, RUT, RFC, etc.)',
        example: 'PEJ800101',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "identificacion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Teléfono de contacto del cliente',
        example: '+52 5512345678',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Correo electrónico del cliente',
        example: 'juan.perez.mod@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Dirección física del cliente',
        example: 'Nueva Calle 456, Col. Centro, Ciudad de México',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas o comentarios adicionales',
        example: 'Cliente prefiere contacto por la tarde (actualizado).',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "notas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estado actual del cliente',
        enum: create_cliente_dto_1.ClienteStatusDto,
    }),
    (0, class_validator_1.IsEnum)(create_cliente_dto_1.ClienteStatusDto, { message: 'El estado del cliente debe ser PROSPECTO, ACTIVO o INACTIVO' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClienteDto.prototype, "status", void 0);
//# sourceMappingURL=update-cliente.dto.js.map