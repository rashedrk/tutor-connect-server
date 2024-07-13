/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_permanentAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_presentAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Tuition" DROP CONSTRAINT "Tuition_address_id_fkey";

-- DropForeignKey
ALTER TABLE "TuitionRequest" DROP CONSTRAINT "TuitionRequest_address_id_fkey";

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "FullAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "FullAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "FullAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "FullAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "FullAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "FullAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
