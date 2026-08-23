"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMarcaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_marca_dto_1 = require("./create-marca.dto");
class UpdateMarcaDto extends (0, swagger_1.PartialType)(create_marca_dto_1.CreateMarcaDto) {
}
exports.UpdateMarcaDto = UpdateMarcaDto;
//# sourceMappingURL=update-marca.dto.js.map