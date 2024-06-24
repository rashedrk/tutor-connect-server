/*
  Warnings:

  - You are about to drop the column `instiTuition` on the `Qualification` table. All the data in the column will be lost.
  - Added the required column `instituition` to the `Qualification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Qualification" DROP COLUMN "instiTuition",
ADD COLUMN     "instituition" TEXT NOT NULL;
