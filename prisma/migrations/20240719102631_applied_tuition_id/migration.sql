/*
  Warnings:

  - The primary key for the `AppliedTuition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `applied_tuition_id` was added to the `AppliedTuition` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "AppliedTuition" DROP CONSTRAINT "AppliedTuition_pkey",
ADD COLUMN     "applied_tuition_id" TEXT NOT NULL,
ADD CONSTRAINT "AppliedTuition_pkey" PRIMARY KEY ("applied_tuition_id");
