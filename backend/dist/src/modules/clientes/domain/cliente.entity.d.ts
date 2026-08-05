export declare class Cliente {
    readonly id: string;
    readonly nombre: string;
    readonly identificacion: string | null;
    readonly telefono: string | null;
    readonly email: string | null;
    readonly direccion: string | null;
    readonly notas: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, nombre: string, identificacion: string | null, telefono: string | null, email: string | null, direccion: string | null, notas: string | null, createdAt: Date, updatedAt: Date);
}
