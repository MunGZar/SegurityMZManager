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
exports.AddEvidenciaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class AddEvidenciaDto {
    tipo;
    url;
    descripcion;
}
exports.AddEvidenciaDto = AddEvidenciaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.TipoEvidencia, default: client_1.TipoEvidencia.ANTES }),
    (0, class_validator_1.IsEnum)(client_1.TipoEvidencia),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddEvidenciaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL de la imagen o documento de evidencia' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddEvidenciaDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descripción o nota sobre la fotografía / evidencia' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddEvidenciaDto.prototype, "descripcion", void 0);
//# sourceMappingURL=add-evidencia.dto.js.map