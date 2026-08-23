"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCategory = seedCategory;
async function seedCategory(prisma, nombre) {
    const category = await prisma.categoria.upsert({
        where: { nombre },
        update: {},
        create: {
            nombre,
            descripcion: `Categoría oficial de ${nombre}`,
            activo: true,
        },
    });
    return category.id;
}
//# sourceMappingURL=category.seed.js.map