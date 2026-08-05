"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    id;
    nombre;
    identificacion;
    telefono;
    email;
    direccion;
    notas;
    status;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, nombre, identificacion, telefono, email, direccion, notas, status, createdAt, updatedAt, deletedAt = null) {
        this.id = id;
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.notas = notas;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.entity.js.map