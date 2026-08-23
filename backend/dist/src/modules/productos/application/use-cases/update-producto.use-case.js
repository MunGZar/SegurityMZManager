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
exports.UpdateProductoUseCase = void 0;
const common_1 = require("@nestjs/common");
const productos_repository_interface_1 = require("../../domain/productos.repository.interface");
let UpdateProductoUseCase = class UpdateProductoUseCase {
    productosRepository;
    constructor(productosRepository) {
        this.productosRepository = productosRepository;
    }
    async execute(id, dto) {
        const existing = await this.productosRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Producto con ID "${id}" no encontrado`);
        }
        if (dto.precioCompra !== undefined && dto.precioCompra < 0) {
            throw new common_1.BadRequestException('El precio de compra no puede ser negativo');
        }
        if (dto.margenPorcentaje !== undefined && dto.margenPorcentaje < 0) {
            throw new common_1.BadRequestException('El porcentaje de margen no puede ser negativo');
        }
        if (dto.codigoInterno && dto.codigoInterno !== existing.codigoInterno) {
            const duplicateCode = await this.productosRepository.findByCodigoInterno(dto.codigoInterno);
            if (duplicateCode) {
                throw new common_1.ConflictException(`Ya existe un producto con el código interno "${dto.codigoInterno}"`);
            }
        }
        const nextNombre = dto.nombre ?? existing.nombre;
        const nextMarcaId = dto.marcaId ?? existing.marcaId;
        const nextModelo = dto.modelo !== undefined ? dto.modelo : existing.modelo;
        if (nextNombre.toLowerCase() !== existing.nombre.toLowerCase() ||
            nextMarcaId !== existing.marcaId ||
            nextModelo !== existing.modelo) {
            const duplicateCombo = await this.productosRepository.findByNombreMarcaModelo(nextNombre, nextMarcaId, nextModelo || null);
            if (duplicateCombo && duplicateCombo.id !== id) {
                throw new common_1.ConflictException(`Ya existe un producto registrado con el nombre "${nextNombre}" para la misma marca y modelo.`);
            }
        }
        const finalPrecioCompra = dto.precioCompra !== undefined ? Number(dto.precioCompra) : Number(existing.precioCompra);
        const finalMargenPorcentaje = dto.margenPorcentaje !== undefined ? Number(dto.margenPorcentaje) : Number(existing.margenPorcentaje);
        const precioVenta = Number((finalPrecioCompra + (finalPrecioCompra * (finalMargenPorcentaje / 100))).toFixed(2));
        return this.productosRepository.update(id, {
            ...dto,
            precioVenta,
        });
    }
};
exports.UpdateProductoUseCase = UpdateProductoUseCase;
exports.UpdateProductoUseCase = UpdateProductoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [productos_repository_interface_1.IProductosRepository])
], UpdateProductoUseCase);
//# sourceMappingURL=update-producto.use-case.js.map