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
exports.GetProductoByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const productos_repository_interface_1 = require("../../domain/productos.repository.interface");
let GetProductoByIdUseCase = class GetProductoByIdUseCase {
    productosRepository;
    constructor(productosRepository) {
        this.productosRepository = productosRepository;
    }
    async execute(id) {
        const producto = await this.productosRepository.findById(id);
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID "${id}" no encontrado`);
        }
        return producto;
    }
};
exports.GetProductoByIdUseCase = GetProductoByIdUseCase;
exports.GetProductoByIdUseCase = GetProductoByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [productos_repository_interface_1.IProductosRepository])
], GetProductoByIdUseCase);
//# sourceMappingURL=get-producto-by-id.use-case.js.map