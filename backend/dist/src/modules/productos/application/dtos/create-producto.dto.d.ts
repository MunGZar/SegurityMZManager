export declare class CreateProductoDto {
    codigoInterno: string;
    nombre: string;
    modelo?: string;
    descripcion?: string;
    imagenUrl?: string;
    activo?: boolean;
    marcaId: string;
    categoriaId: string;
    proveedorId: string;
    precioCompra: number;
    margenPorcentaje: number;
    garantiaMeses?: number;
    resolucion?: string;
    tecnologia?: string;
    tipo?: string;
    lente?: string;
    audio?: string;
    visionNocturna?: string;
    alimentacion?: string;
    proteccionIP?: string;
}
