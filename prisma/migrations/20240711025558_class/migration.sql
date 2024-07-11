/*
  Warnings:

  - The `class` column on the `Tuition` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tuition" DROP COLUMN "class",
ADD COLUMN     "class" INTEGER[];

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "class" INTEGER[];
