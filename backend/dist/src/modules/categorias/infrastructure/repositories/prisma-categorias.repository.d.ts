import { PrismaService } from '../../../../prisma/prisma.service';
import { ICategoriasRepository, PaginatedCategorias } from '../../domain/categorias.repository.interface';
import { CreateCategoriaDto } from '../../application/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../../application/dtos/update-categoria.dto';
import { GetCategoriasQueryDto } from '../../application/dtos/get-categorias-query.dto';
import { Categoria } from '@prisma/client';
export declare class PrismaCategoriasRepository implements ICategoriasRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCategoriaDto): Promise<Categoria>;
    findAll(query: GetCategoriasQueryDto): Promise<PaginatedCategorias>;
    findById(id: string): Promise<Categoria | null>;
    findByNombre(nombre: string): Promise<Categoria | null>;
    update(id: string, data: UpdateCategoriaDto): Promise<Categoria>;
    delete(id: string): Promise<Categoria>;
    restore(id: string): Promise<Categoria>;
}
