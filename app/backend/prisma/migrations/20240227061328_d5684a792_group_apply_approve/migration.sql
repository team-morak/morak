/*
  Warnings:

  - You are about to alter the column `created_at` on the `membership_request` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date` on the `mogaco` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `mogaco` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[group_id,user_id]` on the table `membership_request` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `group` ADD COLUMN `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `membership_request` MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `mogaco` MODIFY `date` DATETIME NOT NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `membership_request_group_id_user_id_key` ON `membership_request`(`group_id`, `user_id`);
