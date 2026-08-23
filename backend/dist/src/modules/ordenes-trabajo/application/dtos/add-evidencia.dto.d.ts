import { TipoEvidencia } from '@prisma/client';
export declare class AddEvidenciaDto {
    tipo: TipoEvidencia;
    url: string;
    descripcion?: string;
}
