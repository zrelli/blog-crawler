/*
  Warnings:

  - Made the column `description` on table `pages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `pages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pages` MODIFY `description` TEXT NOT NULL,
    MODIFY `content` TEXT NOT NULL;
