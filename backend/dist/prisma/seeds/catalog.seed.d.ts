import { PrismaClient } from '@prisma/client';
export interface CatalogProductJson {
    reference?: string;
    referencia?: string;
    officialName?: string;
    nombreOficial?: string;
    brand?: string;
    marca?: string;
    category?: string;
    categoria?: string;
    family?: string;
    model?: string;
    modelo?: string;
    description?: string;
    descripcion?: string;
    specifications?: Record<string, any>;
    especificaciones?: Record<string, any>;
    resources?: {
        productPage?: string;
        datasheet?: string;
        manual?: string;
        image?: string;
    };
    datasheet?: string;
    manual?: string;
    imagenUrl?: string;
    commercial?: {
        purchasePrice?: number | null;
        marginPercentage?: number | null;
        salePrice?: number | null;
    };
    createdFrom?: string;
    isOfficial?: boolean;
    status?: string;
    tecnologia?: string;
    resolucion?: string;
    lente?: string;
    audio?: string;
    visionNocturna?: string;
    alimentacion?: string;
    proteccionIP?: string;
}
export declare function seedCatalog(prisma: PrismaClient): Promise<void>;
