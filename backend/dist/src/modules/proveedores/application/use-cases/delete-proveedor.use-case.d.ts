import { IProveedoresRepository } from '../../domain/proveedores.repository.interface';
export declare class DeleteProveedorUseCase {
    private readonly proveedoresRepository;
    constructor(proveedoresRepository: IProveedoresRepository);
    execute(id: string): Promise<void>;
}
