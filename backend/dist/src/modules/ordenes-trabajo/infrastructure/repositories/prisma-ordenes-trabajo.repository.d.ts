import { PrismaService } from '../../../../prisma/prisma.service';
import { IOrdenesTrabajoRepository, OrdenTrabajoCompleta, PaginatedOrdenesTrabajo } from '../../domain/ordenes-trabajo.repository.interface';
import { CreateOrdenTrabajoDto } from '../../application/dtos/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from '../../application/dtos/update-orden-trabajo.dto';
import { GetOrdenesTrabajoQueryDto } from '../../application/dtos/get-ordenes-trabajo-query.dto';
import { AddEvidenciaDto } from '../../application/dtos/add-evidencia.dto';
import { OrdenTrabajoEstado, OrdenTrabajoEvidencia } from '@prisma/client';
export declare class PrismaOrdenesTrabajoRepository implements IOrdenesTrabajoRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private get includeRelations();
    generateNextFolio(): Promise<string>;
    create(data: CreateOrdenTrabajoDto & {
        folio: string;
        clienteId: string;
    }): Promise<OrdenTrabajoCompleta>;
    findAll(query: GetOrdenesTrabajoQueryDto): Promise<PaginatedOrdenesTrabajo>;
    findById(id: string): Promise<OrdenTrabajoCompleta | null>;
    findByCotizacionId(cotizacionId: string): Promise<OrdenTrabajoCompleta | null>;
    update(id: string, data: UpdateOrdenTrabajoDto): Promise<OrdenTrabajoCompleta>;
    changeEstado(id: string, estado: OrdenTrabajoEstado): Promise<OrdenTrabajoCompleta>;
    addEvidencia(ordenTrabajoId: string, data: AddEvidenciaDto): Promise<OrdenTrabajoEvidencia>;
    deleteEvidencia(evidenciaId: string): Promise<boolean>;
    delete(id: string): Promise<OrdenTrabajoCompleta>;
    restore(id: string): Promise<OrdenTrabajoCompleta>;
}
