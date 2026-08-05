export declare enum ClienteStatusDto {
    PROSPECTO = "PROSPECTO",
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO"
}
export declare class CreateClienteDto {
    nombre: string;
    identificacion?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    notas?: string;
    status?: ClienteStatusDto;
}
