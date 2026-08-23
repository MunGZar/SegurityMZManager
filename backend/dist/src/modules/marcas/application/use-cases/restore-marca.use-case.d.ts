import { IMarcasRepository } from '../../domain/marcas.repository.interface';
export declare class RestoreMarcaUseCase {
    private readonly marcasRepository;
    constructor(marcasRepository: IMarcasRepository);
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
