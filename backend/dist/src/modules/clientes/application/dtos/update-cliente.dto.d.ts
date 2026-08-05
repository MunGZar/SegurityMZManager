import { ClienteStatusDto } from './create-cliente.dto';
export declare class UpdateClienteDto {
    nombre?: string;
    identificacion?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    notas?: string;
    status?: ClienteStatusDto;
}
