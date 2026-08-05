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
exports.CreateClienteUseCase = void 0;
const common_1 = require("@nestjs/common");
const clientes_repository_interface_1 = require("../../domain/clientes.repository.interface");
let CreateClienteUseCase = class CreateClienteUseCase {
    clientesRepository;
    constructor(clientesRepository) {
        this.clientesRepository = clientesRepository;
    }
    async execute(dto) {
        if (dto.identificacion) {
            const existing = await this.clientesRepository.findByIdentificacion(dto.identificacion);
            if (existing) {
                throw new common_1.BadRequestException(`Ya existe un cliente con la identificación '${dto.identificacion}'`);
            }
        }
        return this.clientesRepository.create({
            nombre: dto.nombre,
            identificacion: dto.identificacion || null,
            telefono: dto.telefono || null,
            email: dto.email || null,
            direccion: dto.direccion || null,
            notas: dto.notas || null,
        });
    }
};
exports.CreateClienteUseCase = CreateClienteUseCase;
exports.CreateClienteUseCase = CreateClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(clientes_repository_interface_1.IClientesRepository)),
    __metadata("design:paramtypes", [Object])
], CreateClienteUseCase);
//# sourceMappingURL=create-cliente.use-case.js.map