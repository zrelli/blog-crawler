/*
  Warnings:

  - You are about to drop the column `title` on the `pages` table. All the data in the column will be lost.
  - Added the required column `titleId` to the `pages` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_title` ON `pages`;

-- DropIndex
DROP INDEX `pages_title_key` ON `pages`;

-- AlterTable
ALTER TABLE `pages` DROP COLUMN `title`,
    ADD COLUMN `titleId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `titles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `titles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `titles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
