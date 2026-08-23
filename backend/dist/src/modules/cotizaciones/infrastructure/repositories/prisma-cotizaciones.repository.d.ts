import { PrismaService } from '../../../../prisma/prisma.service';
import { ICotizacionesRepository, CotizacionConDetalles, PaginatedCotizaciones } from '../../domain/cotizaciones.repository.interface';
import { CreateCotizacionDto } from '../../application/dtos/create-cotizacion.dto';
import { UpdateCotizacionDto } from '../../application/dtos/update-cotizacion.dto';
import { GetCotizacionesQueryDto } from '../../application/dtos/get-cotizaciones-query.dto';
import { CotizacionEstado } from '@prisma/client';
export declare class PrismaCotizacionesRepository implements ICotizacionesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private get includeRelations();
    generateNextFolio(): Promise<string>;
    create(data: CreateCotizacionDto & {
        folio: string;
        subtotal: number;
        total: number;
    }): Promise<CotizacionConDetalles>;
    findAll(query: GetCotizacionesQueryDto): Promise<PaginatedCotizaciones>;
    findById(id: string): Promise<CotizacionConDetalles | null>;
    findByFolio(folio: string): Promise<CotizacionConDetalles | null>;
    update(id: string, data: UpdateCotizacionDto & {
        subtotal?: number;
        total?: number;
    }): Promise<CotizacionConDetalles>;
    changeEstado(id: string, estado: CotizacionEstado): Promise<CotizacionConDetalles>;
    delete(id: string): Promise<CotizacionConDetalles>;
    restore(id: string): Promise<CotizacionConDetalles>;
}
