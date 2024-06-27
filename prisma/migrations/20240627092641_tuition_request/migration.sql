/*
  Warnings:

  - You are about to drop the `appliedTuition` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "REQUEST_STATUS" AS ENUM ('accepted', 'pending', 'rejected');

-- DropForeignKey
ALTER TABLE "appliedTuition" DROP CONSTRAINT "appliedTuition_tuition_id_fkey";

-- DropForeignKey
ALTER TABLE "appliedTuition" DROP CONSTRAINT "appliedTuition_tutor_id_fkey";

-- DropTable
DROP TABLE "appliedTuition";

-- CreateTable
CREATE TABLE "AppliedTuition" (
    "tuition_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,

    CONSTRAINT "AppliedTuition_pkey" PRIMARY KEY ("tuition_id","tutor_id")
);

-- CreateTable
CREATE TABLE "TuitionRequest" (
    "id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "medium" "MEDIUM" NOT NULL,
    "address_id" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "status" "REQUEST_STATUS" NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "TuitionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TuitionRequest_schedule_id_key" ON "TuitionRequest"("schedule_id");

-- AddForeignKey
ALTER TABLE "AppliedTuition" ADD CONSTRAINT "AppliedTuition_tuition_id_fkey" FOREIGN KEY ("tuition_id") REFERENCES "Tuition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedTuition" ADD CONSTRAINT "AppliedTuition_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
