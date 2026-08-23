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
exports.CreateCategoriaUseCase = void 0;
const common_1 = require("@nestjs/common");
const categorias_repository_interface_1 = require("../../domain/categorias.repository.interface");
let CreateCategoriaUseCase = class CreateCategoriaUseCase {
    categoriasRepository;
    constructor(categoriasRepository) {
        this.categoriasRepository = categoriasRepository;
    }
    async execute(dto) {
        const existing = await this.categoriasRepository.findByNombre(dto.nombre);
        if (existing) {
            throw new common_1.ConflictException(`Ya existe una categoría registrada con el nombre "${dto.nombre}"`);
        }
        return this.categoriasRepository.create(dto);
    }
};
exports.CreateCategoriaUseCase = CreateCategoriaUseCase;
exports.CreateCategoriaUseCase = CreateCategoriaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categorias_repository_interface_1.ICategoriasRepository])
], CreateCategoriaUseCase);
//# sourceMappingURL=create-categoria.use-case.js.map