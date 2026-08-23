"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const admin_seed_1 = require("./seeds/admin.seed");
const catalog_seed_1 = require("./seeds/catalog.seed");
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined');
}
const url = new URL(databaseUrl);
const adapter = new adapter_mariadb_1.PrismaMariaDb({
    host: url.hostname || 'localhost',
    port: url.port ? Number(url.port) : 3306,
    user: url.username || 'root',
    password: decodeURIComponent(url.password || ''),
    database: url.pathname.substring(1) || 'seguritymz_db',
});
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Ejecutando Orquestador de Seeders...');
    await (0, admin_seed_1.seedAdmin)(prisma);
    await (0, catalog_seed_1.seedCatalog)(prisma);
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
//# sourceMappingURL=seed.js.map