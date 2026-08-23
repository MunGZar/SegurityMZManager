import { IMarcasRepository } from '../../domain/marcas.repository.interface';
import { UpdateMarcaDto } from '../dtos/update-marca.dto';
export declare class UpdateMarcaUseCase {
    private readonly marcasRepository;
    constructor(marcasRepository: IMarcasRepository);
    execute(id: string, dto: UpdateMarcaDto): Promise<{
        id: string;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        activo: boolean;
        deletedAt: Date | null;
    }>;
}
