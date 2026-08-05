-- DropIndex
DROP INDEX `Usuario_username_key` ON `Usuario`;

-- AlterTable
ALTER TABLE `Usuario` 
    DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` TEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);
