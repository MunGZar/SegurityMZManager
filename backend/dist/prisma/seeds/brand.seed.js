"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBrand = seedBrand;
async function seedBrand(prisma, nombre) {
    const brand = await prisma.marca.upsert({
        where: { nombre },
        update: {},
        create: {
            nombre,
            descripcion: `Marca oficial ${nombre}`,
            activo: true,
        },
    });
    return brand.id;
}
//# sourceMappingURL=brand.seed.js.map