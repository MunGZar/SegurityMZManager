"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const bcrypt = __importStar(require("bcrypt"));
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
    }
    else {
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
//# sourceMappingURL=seed.js.map