import { IMarcasRepository } from '../../domain/marcas.repository.interface';
import { CreateMarcaDto } from '../dtos/create-marca.dto';
export declare class CreateMarcaUseCase {
    private readonly marcasRepository;
    constructor(marcasRepository: IMarcasRepository);
    execute(dto: CreateMarcaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
}
