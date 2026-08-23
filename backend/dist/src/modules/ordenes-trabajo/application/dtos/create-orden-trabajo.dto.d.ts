import { OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@prisma/client';
export declare class CreateOrdenTrabajoDto {
    cotizacionId: string;
    fechaProgramada?: string;
    horaProgramada?: string;
    estado?: OrdenTrabajoEstado;
    prioridad?: OrdenTrabajoPrioridad;
    observaciones?: string;
    direccion?: string;
    observacionesTecnicas?: string;
    serialesEquipos?: string;
    usuarioDvr?: string;
    passwordDvrEncrypted?: string;
    direccionIp?: string;
    garantiaMeses?: number;
    fechaEntrega?: string;
}
