import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const url = new URL(databaseUrl);
const adapter = new PrismaMariaDb({
  host: url.hostname || 'localhost',
  port: url.port ? Number(url.port) : 3306,
  user: url.username || 'root',
  password: decodeURIComponent(url.password || ''),
  database: url.pathname.substring(1) || 'seguritymz_db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
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
    console.log('Usuario administrador semilla creado exitosamente.');
  } else {
    console.log('El usuario administrador ya existe.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
