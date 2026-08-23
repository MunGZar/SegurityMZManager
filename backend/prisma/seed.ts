import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { seedAdmin } from './seeds/admin.seed';
import { seedCatalog } from './seeds/catalog.seed';

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
  console.log('🌱 Ejecutando Orquestador de Seeders...');
  
  // 1. Crear usuario administrador
  await seedAdmin(prisma);

  // 2. Importar Catálogo Maestro (Dahua, Imou, Genéricos)
  await seedCatalog(prisma);

  console.log('🏁 Proceso de Seeder finalizado.');
}

main()
  .catch((e) => {
    console.error('❌ Error fatal en proceso de seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
