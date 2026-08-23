import { PrismaClient } from '@prisma/client';

export async function seedCategory(prisma: PrismaClient, nombre: string): Promise<string> {
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
