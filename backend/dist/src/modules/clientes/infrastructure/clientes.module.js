"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesModule = void 0;
const common_1 = require("@nestjs/common");
const clientes_controller_1 = require("./controllers/clientes.controller");
const clientes_repository_interface_1 = require("../domain/clientes.repository.interface");
const prisma_clientes_repository_1 = require("./repositories/prisma-clientes.repository");
const create_cliente_use_case_1 = require("../application/use-cases/create-cliente.use-case");
const get_all_clientes_use_case_1 = require("../application/use-cases/get-all-clientes.use-case");
const get_cliente_by_id_use_case_1 = require("../application/use-cases/get-cliente-by-id.use-case");
const update_cliente_use_case_1 = require("../application/use-cases/update-cliente.use-case");
const delete_cliente_use_case_1 = require("../application/use-cases/delete-cliente.use-case");
let ClientesModule = class ClientesModule {
};
exports.ClientesModule = ClientesModule;
exports.ClientesModule = ClientesModule = __decorate([
    (0, common_1.Module)({
        controllers: [clientes_controller_1.ClientesController],
        providers: [
            create_cliente_use_case_1.CreateClienteUseCase,
            get_all_clientes_use_case_1.GetAllClientesUseCase,
            get_cliente_by_id_use_case_1.GetClienteByIdUseCase,
            update_cliente_use_case_1.UpdateClienteUseCase,
            delete_cliente_use_case_1.DeleteClienteUseCase,
            {
                provide: clientes_repository_interface_1.IClientesRepository,
                useClass: prisma_clientes_repository_1.PrismaClientesRepository,
            },
        ],
        exports: [
            create_cliente_use_case_1.CreateClienteUseCase,
            get_all_clientes_use_case_1.GetAllClientesUseCase,
            get_cliente_by_id_use_case_1.GetClienteByIdUseCase,
            update_cliente_use_case_1.UpdateClienteUseCase,
            delete_cliente_use_case_1.DeleteClienteUseCase,
        ],
    })
], ClientesModule);
//# sourceMappingURL=clientes.module.js.map