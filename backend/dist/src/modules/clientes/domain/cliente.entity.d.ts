export type ClienteStatus = 'PROSPECTO' | 'ACTIVO' | 'INACTIVO';
export declare class Cliente {
    readonly id: string;
    readonly nombre: string;
    readonly identificacion: string | null;
    readonly telefono: string | null;
    readonly email: string | null;
    readonly direccion: string | null;
    readonly notas: string | null;
    readonly status: ClienteStatus;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
    constructor(id: string, nombre: string, identificacion: string | null, telefono: string | null, email: string | null, direccion: string | null, notas: string | null, status: ClienteStatus, createdAt: Date, updatedAt: Date, deletedAt?: Date | null);
}
