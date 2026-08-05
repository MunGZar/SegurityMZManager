export declare class Proveedor {
    id: string;
    nombre: string;
    contacto?: string | null;
    telefono?: string | null;
    whatsapp?: string | null;
    correo?: string | null;
    ciudad?: string | null;
    direccion?: string | null;
    observaciones?: string | null;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
