import { IMarcasRepository } from '../../domain/marcas.repository.interface';
import { GetMarcasQueryDto } from '../dtos/get-marcas-query.dto';
export declare class GetAllMarcasUseCase {
    private readonly marcasRepository;
    constructor(marcasRepository: IMarcasRepository);
    execute(query: GetMarcasQueryDto): Promise<import("../../domain/marcas.repository.interface").PaginatedMarcas>;
}
