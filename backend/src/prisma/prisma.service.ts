import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }

    try {
      const url = new URL(databaseUrl);
      const adapter = new PrismaMariaDb({
        host: url.hostname || 'localhost',
        port: url.port ? Number(url.port) : 3306,
        user: url.username || 'root',
        password: decodeURIComponent(url.password || ''),
        database: url.pathname.substring(1) || 'seguritymz_db',
      });

      super({ adapter });
    } catch (error) {
      throw new Error(`Failed to parse DATABASE_URL: ${(error as Error).message}`);
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
