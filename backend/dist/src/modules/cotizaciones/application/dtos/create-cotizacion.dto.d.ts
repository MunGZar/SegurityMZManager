import { CotizacionDetalleTipo, CotizacionEstado } from '@prisma/client';
export declare class CreateCotizacionDetalleDto {
    productoId?: string;
    tipo: CotizacionDetalleTipo;
    nombre: string;
    descripcion?: string;
    cantidad: number;
    orden?: number;
    precioUnit: number;
}
export declare class CreateCotizacionDto {
    clienteId: string;
    observaciones?: string;
    descuento?: number;
    estado?: CotizacionEstado;
    detalles: CreateCotizacionDetalleDto[];
}
