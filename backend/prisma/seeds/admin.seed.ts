import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(prisma: PrismaClient) {
  const adminEmail = 'admin@seguritymz.com';
  const existingUser = await prisma.usuario.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    await prisma.usuario.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        nombre: 'Administrador',
      },
    });
    console.log('✅ Usuario administrador semilla creado exitosamente.');
  } else {
    console.log('ℹ️ El usuario administrador ya existe.');
  }
}
