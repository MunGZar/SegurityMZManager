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
exports.CreateProductoUseCase = void 0;
const common_1 = require("@nestjs/common");
const productos_repository_interface_1 = require("../../domain/productos.repository.interface");
let CreateProductoUseCase = class CreateProductoUseCase {
    productosRepository;
    constructor(productosRepository) {
        this.productosRepository = productosRepository;
    }
    async execute(dto) {
        if (dto.precioCompra < 0) {
            throw new common_1.BadRequestException('El precio de compra no puede ser negativo');
        }
        if (dto.margenPorcentaje < 0) {
            throw new common_1.BadRequestException('El porcentaje de margen no puede ser negativo');
        }
        const existingCode = await this.productosRepository.findByCodigoInterno(dto.codigoInterno);
        if (existingCode) {
            throw new common_1.ConflictException(`Ya existe un producto con el código interno "${dto.codigoInterno}"`);
        }
        const existingCombo = await this.productosRepository.findByNombreMarcaModelo(dto.nombre, dto.marcaId, dto.modelo || null);
        if (existingCombo) {
            throw new common_1.ConflictException(`Ya existe un producto registrado con el nombre "${dto.nombre}" para la misma marca y modelo.`);
        }
        const precioCompraNum = Number(dto.precioCompra);
        const margenNum = Number(dto.margenPorcentaje);
        const precioVenta = Number((precioCompraNum + (precioCompraNum * (margenNum / 100))).toFixed(2));
        return this.productosRepository.create({
            ...dto,
            precioVenta,
        });
    }
};
exports.CreateProductoUseCase = CreateProductoUseCase;
exports.CreateProductoUseCase = CreateProductoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [productos_repository_interface_1.IProductosRepository])
], CreateProductoUseCase);
//# sourceMappingURL=create-producto.use-case.js.map