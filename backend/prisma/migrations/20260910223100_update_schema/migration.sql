-- DropForeignKey
ALTER TABLE `CotizacionDetalle` DROP FOREIGN KEY `CotizacionDetalle_productoId_fkey`;

-- DropIndex
DROP INDEX `CotizacionDetalle_productoId_fkey` ON `CotizacionDetalle`;

-- DropIndex
DROP INDEX `Producto_sku_key` ON `Producto`;

-- AlterTable
ALTER TABLE `Categoria` ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('PROSPECTO', 'ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'PROSPECTO';

-- AlterTable
ALTER TABLE `Cotizacion` DROP COLUMN `notas`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `observaciones` TEXT NULL,
    MODIFY `estado` ENUM('BORRADOR', 'ENVIADA', 'APROBADA', 'RECHAZADA', 'VENCIDA') NOT NULL DEFAULT 'BORRADOR';

-- AlterTable
ALTER TABLE `CotizacionDetalle` DROP COLUMN `descuento`,
    ADD COLUMN `descripcion` TEXT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `orden` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tipo` ENUM('PRODUCTO', 'SERVICIO') NOT NULL DEFAULT 'PRODUCTO',
    MODIFY `productoId` VARCHAR(191) NULL,
    MODIFY `cantidad` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Marca` ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Producto` DROP COLUMN `precioCosto`,
    DROP COLUMN `sku`,
    DROP COLUMN `stock`,
    DROP COLUMN `stockMinimo`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `alimentacion` VARCHAR(191) NULL,
    ADD COLUMN `audio` VARCHAR(191) NULL,
    ADD COLUMN `codigoInterno` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdFrom` ENUM('CATALOG', 'MANUAL') NOT NULL DEFAULT 'MANUAL',
    ADD COLUMN `datasheet` TEXT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `especificaciones` JSON NULL,
    ADD COLUMN `garantiaMeses` INTEGER NOT NULL DEFAULT 12,
    ADD COLUMN `imagenUrl` TEXT NULL,
    ADD COLUMN `isOfficial` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lente` VARCHAR(191) NULL,
    ADD COLUMN `manual` TEXT NULL,
    ADD COLUMN `margenPorcentaje` DECIMAL(5, 2) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(191) NULL,
    ADD COLUMN `nombreOficial` VARCHAR(191) NULL,
    ADD COLUMN `precioCompra` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `proteccionIP` VARCHAR(191) NULL,
    ADD COLUMN `proveedorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `referencia` VARCHAR(191) NULL,
    ADD COLUMN `resolucion` VARCHAR(191) NULL,
    ADD COLUMN `tecnologia` VARCHAR(191) NULL,
    ADD COLUMN `tipo` VARCHAR(191) NULL,
    ADD COLUMN `visionNocturna` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Proveedor` DROP COLUMN `contactoNombre`,
    DROP COLUMN `email`,
    DROP COLUMN `notas`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `ciudad` VARCHAR(191) NULL,
    ADD COLUMN `contacto` VARCHAR(191) NULL,
    ADD COLUMN `correo` VARCHAR(191) NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `observaciones` TEXT NULL,
    ADD COLUMN `whatsapp` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `OrdenTrabajo` (
    `id` VARCHAR(191) NOT NULL,
    `folio` VARCHAR(191) NOT NULL,
    `cotizacionId` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `fechaProgramada` DATETIME(3) NULL,
    `horaProgramada` VARCHAR(191) NULL,
    `estado` ENUM('PENDIENTE', 'PROGRAMADA', 'EN_PROCESO', 'FINALIZADA', 'CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
    `prioridad` ENUM('BAJA', 'MEDIA', 'ALTA', 'URGENTE') NOT NULL DEFAULT 'MEDIA',
    `observaciones` TEXT NULL,
    `direccion` VARCHAR(191) NULL,
    `observacionesTecnicas` TEXT NULL,
    `serialesEquipos` TEXT NULL,
    `usuarioDvr` VARCHAR(191) NULL,
    `passwordDvrEncrypted` VARCHAR(191) NULL,
    `direccionIp` VARCHAR(191) NULL,
    `garantiaMeses` INTEGER NOT NULL DEFAULT 12,
    `fechaEntrega` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OrdenTrabajo_folio_key`(`folio`),
    UNIQUE INDEX `OrdenTrabajo_cotizacionId_key`(`cotizacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenTrabajoEvidencia` (
    `id` VARCHAR(191) NOT NULL,
    `ordenTrabajoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('ANTES', 'DESPUES', 'ACTA_ENTREGA', 'OTRO') NOT NULL DEFAULT 'ANTES',
    `url` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Producto_codigoInterno_key` ON `Producto`(`codigoInterno`);

-- CreateIndex
CREATE UNIQUE INDEX `Producto_referencia_key` ON `Producto`(`referencia`);

-- CreateIndex
CREATE UNIQUE INDEX `Producto_nombre_marcaId_modelo_key` ON `Producto`(`nombre`, `marcaId`, `modelo`);

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionDetalle` ADD CONSTRAINT `CotizacionDetalle_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajoEvidencia` ADD CONSTRAINT `OrdenTrabajoEvidencia_ordenTrabajoId_fkey` FOREIGN KEY (`ordenTrabajoId`) REFERENCES `OrdenTrabajo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
