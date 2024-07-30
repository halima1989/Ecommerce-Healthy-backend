/*
  Warnings:

  - You are about to alter the column `name` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Role` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Role_name_key` ON `Role`(`name`);
