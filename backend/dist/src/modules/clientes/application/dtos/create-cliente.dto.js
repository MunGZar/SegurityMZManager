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
exports.CreateClienteDto = exports.ClienteStatusDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ClienteStatusDto;
(function (ClienteStatusDto) {
    ClienteStatusDto["PROSPECTO"] = "PROSPECTO";
    ClienteStatusDto["ACTIVO"] = "ACTIVO";
    ClienteStatusDto["INACTIVO"] = "INACTIVO";
})(ClienteStatusDto || (exports.ClienteStatusDto = ClienteStatusDto = {}));
class CreateClienteDto {
    nombre;
    identificacion;
    telefono;
    email;
    direccion;
    notas;
    status;
}
exports.CreateClienteDto = CreateClienteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre completo del cliente',
        example: 'Juan Pérez',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del cliente no puede estar vacío' }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Identificación única del cliente (DNI, RUT, RFC, etc.)',
        example: 'PEJ800101',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "identificacion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Teléfono de contacto del cliente',
        example: '+52 5512345678',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Correo electrónico del cliente',
        example: 'juan.perez@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Dirección física del cliente',
        example: 'Calle 123, Col. Centro, Ciudad de México',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas o comentarios adicionales',
        example: 'Cliente prefiere contacto por la tarde.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "notas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estado actual del cliente',
        enum: ClienteStatusDto,
        default: ClienteStatusDto.PROSPECTO,
    }),
    (0, class_validator_1.IsEnum)(ClienteStatusDto, { message: 'El estado del cliente debe ser PROSPECTO, ACTIVO o INACTIVO' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "status", void 0);
//# sourceMappingURL=create-cliente.dto.js.map