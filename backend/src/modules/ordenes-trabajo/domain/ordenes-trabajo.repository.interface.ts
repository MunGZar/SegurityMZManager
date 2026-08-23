import {
  OrdenTrabajo,
  OrdenTrabajoEvidencia,
  Cliente,
  Cotizacion,
  CotizacionDetalle,
  Producto,
  OrdenTrabajoEstado,
  OrdenTrabajoPrioridad,
  TipoEvidencia,
} from '@prisma/client';
import { CreateOrdenTrabajoDto } from '../application/dtos/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from '../application/dtos/update-orden-trabajo.dto';
import { GetOrdenesTrabajoQueryDto } from '../application/dtos/get-ordenes-trabajo-query.dto';
import { AddEvidenciaDto } from '../application/dtos/add-evidencia.dto';

export type OrdenTrabajoCompleta = OrdenTrabajo & {
  cliente: Cliente;
  cotizacion: Cotizacion & {
    detalles: (CotizacionDetalle & {
      producto?: Producto | null;
    })[];
  };
  evidencias: OrdenTrabajoEvidencia[];
};

export interface PaginatedOrdenesTrabajo {
  data: OrdenTrabajoCompleta[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class IOrdenesTrabajoRepository {
  abstract create(data: CreateOrdenTrabajoDto & { folio: string; clienteId: string }): Promise<OrdenTrabajoCompleta>;
  abstract findAll(query: GetOrdenesTrabajoQueryDto): Promise<PaginatedOrdenesTrabajo>;
  abstract findById(id: string): Promise<OrdenTrabajoCompleta | null>;
  abstract findByCotizacionId(cotizacionId: string): Promise<OrdenTrabajoCompleta | null>;
  abstract update(id: string, data: UpdateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta>;
  abstract changeEstado(id: string, estado: OrdenTrabajoEstado): Promise<OrdenTrabajoCompleta>;
  abstract addEvidencia(ordenTrabajoId: string, data: AddEvidenciaDto): Promise<OrdenTrabajoEvidencia>;
  abstract deleteEvidencia(evidenciaId: string): Promise<boolean>;
  abstract delete(id: string): Promise<OrdenTrabajoCompleta>;
  abstract restore(id: string): Promise<OrdenTrabajoCompleta>;
  abstract generateNextFolio(): Promise<string>;
}
