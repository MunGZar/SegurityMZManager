import { PrismaClient } from '@prisma/client';

export async function seedSupplier(prisma: PrismaClient, marcaNombre: string): Promise<string> {
  const nombreProveedor = `${marcaNombre} Distribución Oficial`;

  let supplier = await prisma.proveedor.findFirst({
    where: { nombre: nombreProveedor },
  });

  if (!supplier) {
    supplier = await prisma.proveedor.create({
      data: {
        nombre: nombreProveedor,
        contacto: `Contacto Oficial ${marcaNombre}`,
        telefono: '+56900000000',
        correo: `soporte@${marcaNombre.toLowerCase().replace(/\s+/g, '')}.com`,
        direccion: 'Distribuidor Mayorista Autorizado',
        activo: true,
      },
    });
  }
  return supplier.id;
}
