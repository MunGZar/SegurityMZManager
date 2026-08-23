import { CreateMarcaDto } from '../../application/dtos/create-marca.dto';
import { UpdateMarcaDto } from '../../application/dtos/update-marca.dto';
import { GetMarcasQueryDto } from '../../application/dtos/get-marcas-query.dto';
import { CreateMarcaUseCase } from '../../application/use-cases/create-marca.use-case';
import { GetAllMarcasUseCase } from '../../application/use-cases/get-all-marcas.use-case';
import { GetMarcaByIdUseCase } from '../../application/use-cases/get-marca-by-id.use-case';
import { UpdateMarcaUseCase } from '../../application/use-cases/update-marca.use-case';
import { DeleteMarcaUseCase } from '../../application/use-cases/delete-marca.use-case';
import { RestoreMarcaUseCase } from '../../application/use-cases/restore-marca.use-case';
export declare class MarcasController {
    private readonly createMarcaUseCase;
    private readonly getAllMarcasUseCase;
    private readonly getMarcaByIdUseCase;
    private readonly updateMarcaUseCase;
    private readonly deleteMarcaUseCase;
    private readonly restoreMarcaUseCase;
    constructor(createMarcaUseCase: CreateMarcaUseCase, getAllMarcasUseCase: GetAllMarcasUseCase, getMarcaByIdUseCase: GetMarcaByIdUseCase, updateMarcaUseCase: UpdateMarcaUseCase, deleteMarcaUseCase: DeleteMarcaUseCase, restoreMarcaUseCase: RestoreMarcaUseCase);
    create(createMarcaDto: CreateMarcaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
    findAll(query: GetMarcasQueryDto): Promise<import("../../domain/marcas.repository.interface").PaginatedMarcas>;
    findOne(id: string): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
    update(id: string, updateMarcaDto: UpdateMarcaDto): Promise<{
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
