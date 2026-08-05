"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProveedorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_proveedor_dto_1 = require("./create-proveedor.dto");
class UpdateProveedorDto extends (0, swagger_1.PartialType)(create_proveedor_dto_1.CreateProveedorDto) {
}
exports.UpdateProveedorDto = UpdateProveedorDto;
//# sourceMappingURL=update-proveedor.dto.js.map