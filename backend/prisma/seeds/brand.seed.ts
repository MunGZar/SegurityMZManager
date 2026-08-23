import { PrismaClient } from '@prisma/client';

export async function seedBrand(prisma: PrismaClient, nombre: string): Promise<string> {
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
