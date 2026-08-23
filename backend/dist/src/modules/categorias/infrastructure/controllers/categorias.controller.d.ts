import { CreateCategoriaDto } from '../../application/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../../application/dtos/update-categoria.dto';
import { GetCategoriasQueryDto } from '../../application/dtos/get-categorias-query.dto';
import { CreateCategoriaUseCase } from '../../application/use-cases/create-categoria.use-case';
import { GetAllCategoriasUseCase } from '../../application/use-cases/get-all-categorias.use-case';
import { GetCategoriaByIdUseCase } from '../../application/use-cases/get-categoria-by-id.use-case';
import { UpdateCategoriaUseCase } from '../../application/use-cases/update-categoria.use-case';
import { DeleteCategoriaUseCase } from '../../application/use-cases/delete-categoria.use-case';
import { RestoreCategoriaUseCase } from '../../application/use-cases/restore-categoria.use-case';
export declare class CategoriasController {
    private readonly createCategoriaUseCase;
    private readonly getAllCategoriasUseCase;
    private readonly getCategoriaByIdUseCase;
    private readonly updateCategoriaUseCase;
    private readonly deleteCategoriaUseCase;
    private readonly restoreCategoriaUseCase;
    constructor(createCategoriaUseCase: CreateCategoriaUseCase, getAllCategoriasUseCase: GetAllCategoriasUseCase, getCategoriaByIdUseCase: GetCategoriaByIdUseCase, updateCategoriaUseCase: UpdateCategoriaUseCase, deleteCategoriaUseCase: DeleteCategoriaUseCase, restoreCategoriaUseCase: RestoreCategoriaUseCase);
    create(createCategoriaDto: CreateCategoriaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
    findAll(query: GetCategoriasQueryDto): Promise<import("../../domain/categorias.repository.interface").PaginatedCategorias>;
    findOne(id: string): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
    update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
    restore(id: string): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
}
