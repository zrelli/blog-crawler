/*
  Warnings:

  - Made the column `categoryId` on table `pages` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `pages` DROP FOREIGN KEY `pages_categoryId_fkey`;

-- AlterTable
ALTER TABLE `pages` MODIFY `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categoreies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
