import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientesModule } from './modules/clientes/infrastructure/clientes.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';
import { ProveedoresModule } from './modules/proveedores/infrastructure/proveedores.module';
import { MarcasModule } from './modules/marcas/infrastructure/marcas.module';
import { CategoriasModule } from './modules/categorias/infrastructure/categorias.module';
import { ProductosModule } from './modules/productos/infrastructure/productos.module';
import { CotizacionesModule } from './modules/cotizaciones/infrastructure/cotizaciones.module';
import { OrdenesTrabajoModule } from './modules/ordenes-trabajo/infrastructure/ordenes-trabajo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ClientesModule,
    AuthModule,
    ProveedoresModule,
    MarcasModule,
    CategoriasModule,
    ProductosModule,
    CotizacionesModule,
    OrdenesTrabajoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
