/*
  Warnings:

  - The primary key for the `FullAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FullAddress` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Profile` table. All the data in the column will be lost.
  - The primary key for the `Qualification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Qualification` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Review` table. All the data in the column will be lost.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Schedule` table. All the data in the column will be lost.
  - The primary key for the `Tuition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tuition` table. All the data in the column will be lost.
  - The primary key for the `TuitionRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TuitionRequest` table. All the data in the column will be lost.
  - The primary key for the `Tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tutor` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `address_id` was added to the `FullAddress` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `profile_id` was added to the `Profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `qualification_id` was added to the `Qualification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `review_id` was added to the `Review` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `schedule_id` was added to the `Schedule` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `tuition_id` was added to the `Tuition` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `tuition_request_id` was added to the `TuitionRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `tutor_id` was added to the `Tutor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "AppliedTuition" DROP CONSTRAINT "AppliedTuition_tuition_id_fkey";

-- DropForeignKey
ALTER TABLE "AppliedTuition" DROP CONSTRAINT "AppliedTuition_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_permanentAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_presentAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "Tuition" DROP CONSTRAINT "Tuition_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Tuition" DROP CONSTRAINT "Tuition_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "Tuition" DROP CONSTRAINT "Tuition_selected_tutor_fkey";

-- DropForeignKey
ALTER TABLE "TuitionRequest" DROP CONSTRAINT "TuitionRequest_address_id_fkey";

-- DropForeignKey
ALTER TABLE "TuitionRequest" DROP CONSTRAINT "TuitionRequest_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "TuitionRequest" DROP CONSTRAINT "TuitionRequest_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "TutorQualification" DROP CONSTRAINT "TutorQualification_qualification_id_fkey";

-- DropForeignKey
ALTER TABLE "TutorQualification" DROP CONSTRAINT "TutorQualification_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "TutorSchedule" DROP CONSTRAINT "TutorSchedule_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "TutorSchedule" DROP CONSTRAINT "TutorSchedule_tutor_id_fkey";

-- AlterTable
ALTER TABLE "FullAddress" DROP CONSTRAINT "FullAddress_pkey",
DROP COLUMN "id",
ADD COLUMN     "address_id" TEXT NOT NULL,
ADD CONSTRAINT "FullAddress_pkey" PRIMARY KEY ("address_id");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "profile_id" TEXT NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("profile_id");

-- AlterTable
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_pkey",
DROP COLUMN "id",
ADD COLUMN     "qualification_id" TEXT NOT NULL,
ADD CONSTRAINT "Qualification_pkey" PRIMARY KEY ("qualification_id");

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "id",
ADD COLUMN     "review_id" TEXT NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id");

-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
DROP COLUMN "id",
ADD COLUMN     "schedule_id" TEXT NOT NULL,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("schedule_id");

-- AlterTable
ALTER TABLE "Tuition" DROP CONSTRAINT "Tuition_pkey",
DROP COLUMN "id",
ADD COLUMN     "tuition_id" TEXT NOT NULL,
ADD CONSTRAINT "Tuition_pkey" PRIMARY KEY ("tuition_id");

-- AlterTable
ALTER TABLE "TuitionRequest" DROP CONSTRAINT "TuitionRequest_pkey",
DROP COLUMN "id",
ADD COLUMN     "tuition_request_id" TEXT NOT NULL,
ADD CONSTRAINT "TuitionRequest_pkey" PRIMARY KEY ("tuition_request_id");

-- AlterTable
ALTER TABLE "Tutor" DROP CONSTRAINT "Tutor_pkey",
DROP COLUMN "id",
ADD COLUMN     "tutor_id" TEXT NOT NULL,
ADD CONSTRAINT "Tutor_pkey" PRIMARY KEY ("tutor_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "FullAddress"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "FullAddress"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorQualification" ADD CONSTRAINT "TutorQualification_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorQualification" ADD CONSTRAINT "TutorQualification_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "Qualification"("qualification_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "FullAddress"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_selected_tutor_fkey" FOREIGN KEY ("selected_tutor") REFERENCES "Tutor"("tutor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedTuition" ADD CONSTRAINT "AppliedTuition_tuition_id_fkey" FOREIGN KEY ("tuition_id") REFERENCES "Tuition"("tuition_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedTuition" ADD CONSTRAINT "AppliedTuition_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "FullAddress"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionRequest" ADD CONSTRAINT "TuitionRequest_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;
