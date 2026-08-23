import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';
export declare class UpdateCategoriaUseCase {
    private readonly categoriasRepository;
    constructor(categoriasRepository: ICategoriasRepository);
    execute(id: string, dto: UpdateCategoriaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
}
