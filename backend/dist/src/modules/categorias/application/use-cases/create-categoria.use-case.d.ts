import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
export declare class CreateCategoriaUseCase {
    private readonly categoriasRepository;
    constructor(categoriasRepository: ICategoriasRepository);
    execute(dto: CreateCategoriaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
}
