import { Cotizacion, CotizacionDetalle, Cliente, Producto, CotizacionEstado, CotizacionDetalleTipo } from '@prisma/client';
import { CreateCotizacionDto } from '../application/dtos/create-cotizacion.dto';
import { UpdateCotizacionDto } from '../application/dtos/update-cotizacion.dto';
import { GetCotizacionesQueryDto } from '../application/dtos/get-cotizaciones-query.dto';

export type CotizacionConDetalles = Cotizacion & {
  cliente: Cliente;
  detalles: (CotizacionDetalle & {
    producto?: Producto | null;
  })[];
};

export interface PaginatedCotizaciones {
  data: CotizacionConDetalles[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class ICotizacionesRepository {
  abstract create(data: CreateCotizacionDto & { folio: string; subtotal: number; total: number }): Promise<CotizacionConDetalles>;
  abstract findAll(query: GetCotizacionesQueryDto): Promise<PaginatedCotizaciones>;
  abstract findById(id: string): Promise<CotizacionConDetalles | null>;
  abstract findByFolio(folio: string): Promise<CotizacionConDetalles | null>;
  abstract update(id: string, data: UpdateCotizacionDto & { subtotal?: number; total?: number }): Promise<CotizacionConDetalles>;
  abstract changeEstado(id: string, estado: CotizacionEstado): Promise<CotizacionConDetalles>;
  abstract delete(id: string): Promise<CotizacionConDetalles>;
  abstract restore(id: string): Promise<CotizacionConDetalles>;
  abstract generateNextFolio(): Promise<string>;
}
