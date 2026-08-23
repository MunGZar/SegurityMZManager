import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
export declare class RestoreCategoriaUseCase {
    private readonly categoriasRepository;
    constructor(categoriasRepository: ICategoriasRepository);
    execute(id: string): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
}
