"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_producto_dto_1 = require("./create-producto.dto");
class UpdateProductoDto extends (0, swagger_1.PartialType)(create_producto_dto_1.CreateProductoDto) {
}
exports.UpdateProductoDto = UpdateProductoDto;
//# sourceMappingURL=update-producto.dto.js.map