/*
  Warnings:

  - You are about to drop the column `permanentAddress` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `permanentAddressId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentAddressId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_permanentAddress_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_presentAddress_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
ADD COLUMN     "permanentAddressId" TEXT NOT NULL,
ADD COLUMN     "presentAddressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
