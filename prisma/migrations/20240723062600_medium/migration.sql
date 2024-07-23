/*
  Warnings:

  - The `medium` column on the `Tutor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "medium",
ADD COLUMN     "medium" TEXT[];
