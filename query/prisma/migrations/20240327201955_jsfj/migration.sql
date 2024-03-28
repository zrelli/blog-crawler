/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `pages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domainId` to the `pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pages` ADD COLUMN `categoryId` INTEGER NULL,
    ADD COLUMN `domainId` INTEGER NOT NULL,
    ADD COLUMN `path` VARCHAR(255) NOT NULL DEFAULT '/';

-- CreateTable
CREATE TABLE `domains` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `domains_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoreies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `categoreies_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `pages_title_key` ON `pages`(`title`);

-- CreateIndex
CREATE INDEX `idx_title` ON `pages`(`title`);

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_domainId_fkey` FOREIGN KEY (`domainId`) REFERENCES `domains`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categoreies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
