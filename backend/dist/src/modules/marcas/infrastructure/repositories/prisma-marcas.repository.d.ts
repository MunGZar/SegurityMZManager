import { PrismaService } from '../../../../prisma/prisma.service';
import { IMarcasRepository, PaginatedMarcas } from '../../domain/marcas.repository.interface';
import { CreateMarcaDto } from '../../application/dtos/create-marca.dto';
import { UpdateMarcaDto } from '../../application/dtos/update-marca.dto';
import { GetMarcasQueryDto } from '../../application/dtos/get-marcas-query.dto';
import { Marca } from '@prisma/client';
export declare class PrismaMarcasRepository implements IMarcasRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateMarcaDto): Promise<Marca>;
    findAll(query: GetMarcasQueryDto): Promise<PaginatedMarcas>;
    findById(id: string): Promise<Marca | null>;
    findByNombre(nombre: string): Promise<Marca | null>;
    update(id: string, data: UpdateMarcaDto): Promise<Marca>;
    delete(id: string): Promise<Marca>;
    restore(id: string): Promise<Marca>;
}
