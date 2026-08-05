import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientesModule } from './modules/clientes/infrastructure/clientes.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';
import { ProveedoresModule } from './modules/proveedores/infrastructure/proveedores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ClientesModule,
    AuthModule,
    ProveedoresModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
