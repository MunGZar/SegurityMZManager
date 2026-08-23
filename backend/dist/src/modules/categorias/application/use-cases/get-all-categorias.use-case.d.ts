import { ICategoriasRepository } from '../../domain/categorias.repository.interface';
import { GetCategoriasQueryDto } from '../dtos/get-categorias-query.dto';
export declare class GetAllCategoriasUseCase {
    private readonly categoriasRepository;
    constructor(categoriasRepository: ICategoriasRepository);
    execute(query: GetCategoriasQueryDto): Promise<import("../../domain/categorias.repository.interface").PaginatedCategorias>;
}
