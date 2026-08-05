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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const create_cliente_use_case_1 = require("../../application/use-cases/create-cliente.use-case");
const get_all_clientes_use_case_1 = require("../../application/use-cases/get-all-clientes.use-case");
const get_cliente_by_id_use_case_1 = require("../../application/use-cases/get-cliente-by-id.use-case");
const update_cliente_use_case_1 = require("../../application/use-cases/update-cliente.use-case");
const delete_cliente_use_case_1 = require("../../application/use-cases/delete-cliente.use-case");
const create_cliente_dto_1 = require("../../application/dtos/create-cliente.dto");
const update_cliente_dto_1 = require("../../application/dtos/update-cliente.dto");
let ClientesController = class ClientesController {
    createClienteUseCase;
    getAllClientesUseCase;
    getClienteByIdUseCase;
    updateClienteUseCase;
    deleteClienteUseCase;
    constructor(createClienteUseCase, getAllClientesUseCase, getClienteByIdUseCase, updateClienteUseCase, deleteClienteUseCase) {
        this.createClienteUseCase = createClienteUseCase;
        this.getAllClientesUseCase = getAllClientesUseCase;
        this.getClienteByIdUseCase = getClienteByIdUseCase;
        this.updateClienteUseCase = updateClienteUseCase;
        this.deleteClienteUseCase = deleteClienteUseCase;
    }
    async findAll(search) {
        return this.getAllClientesUseCase.execute(search);
    }
    async findOne(id) {
        return this.getClienteByIdUseCase.execute(id);
    }
    async create(createClienteDto) {
        return this.createClienteUseCase.execute(createClienteDto);
    }
    async update(id, updateClienteDto) {
        return this.updateClienteUseCase.execute(id, updateClienteDto);
    }
    async remove(id) {
        await this.deleteClienteUseCase.execute(id);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "remove", null);
exports.ClientesController = ClientesController = __decorate([
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [create_cliente_use_case_1.CreateClienteUseCase,
        get_all_clientes_use_case_1.GetAllClientesUseCase,
        get_cliente_by_id_use_case_1.GetClienteByIdUseCase,
        update_cliente_use_case_1.UpdateClienteUseCase,
        delete_cliente_use_case_1.DeleteClienteUseCase])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map