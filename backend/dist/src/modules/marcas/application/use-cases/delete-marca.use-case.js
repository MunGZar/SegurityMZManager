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
exports.DeleteMarcaUseCase = void 0;
const common_1 = require("@nestjs/common");
const marcas_repository_interface_1 = require("../../domain/marcas.repository.interface");
let DeleteMarcaUseCase = class DeleteMarcaUseCase {
    marcasRepository;
    constructor(marcasRepository) {
        this.marcasRepository = marcasRepository;
    }
    async execute(id) {
        const existing = await this.marcasRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Marca con ID "${id}" no encontrada`);
        }
        return this.marcasRepository.delete(id);
    }
};
exports.DeleteMarcaUseCase = DeleteMarcaUseCase;
exports.DeleteMarcaUseCase = DeleteMarcaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [marcas_repository_interface_1.IMarcasRepository])
], DeleteMarcaUseCase);
//# sourceMappingURL=delete-marca.use-case.js.map