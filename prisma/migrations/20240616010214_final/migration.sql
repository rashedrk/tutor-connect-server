/*
  Warnings:

  - You are about to drop the column `qualification` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Tutor` table. All the data in the column will be lost.
  - The primary key for the `TutorQualification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `TutorQualification` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `TutorQualification` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TutorQualification` table. All the data in the column will be lost.
  - You are about to drop the column `institution` on the `TutorQualification` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TutorQualification` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `TutorQualification` table. All the data in the column will be lost.
  - The primary key for the `TutorSchedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `StartDate` on the `TutorSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `TutorSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `days` on the `TutorSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `TutorSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TutorSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TutorSchedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Tutor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification_id` to the `TutorQualification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutor_id` to the `TutorQualification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_id` to the `TutorSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutor_id` to the `TutorSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "Tutor" DROP CONSTRAINT "Tutor_qualification_fkey";

-- DropForeignKey
ALTER TABLE "Tutor" DROP CONSTRAINT "Tutor_schedule_fkey";

-- DropIndex
DROP INDEX "Tution_selected_tutor_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rating" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "qualification",
DROP COLUMN "schedule",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorQualification" DROP CONSTRAINT "TutorQualification_pkey",
DROP COLUMN "created_at",
DROP COLUMN "degree",
DROP COLUMN "id",
DROP COLUMN "institution",
DROP COLUMN "updated_at",
DROP COLUMN "year",
ADD COLUMN     "qualification_id" TEXT NOT NULL,
ADD COLUMN     "tutor_id" TEXT NOT NULL,
ADD CONSTRAINT "TutorQualification_pkey" PRIMARY KEY ("tutor_id", "qualification_id");

-- AlterTable
ALTER TABLE "TutorSchedule" DROP CONSTRAINT "TutorSchedule_pkey",
DROP COLUMN "StartDate",
DROP COLUMN "created_at",
DROP COLUMN "days",
DROP COLUMN "endDate",
DROP COLUMN "id",
DROP COLUMN "updated_at",
ADD COLUMN     "schedule_id" TEXT NOT NULL,
ADD COLUMN     "tutor_id" TEXT NOT NULL,
ADD CONSTRAINT "TutorSchedule_pkey" PRIMARY KEY ("tutor_id", "schedule_id");

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "days" TEXT[],
    "StartDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_user_id_key" ON "Tutor"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorQualification" ADD CONSTRAINT "TutorQualification_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorQualification" ADD CONSTRAINT "TutorQualification_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tution" ADD CONSTRAINT "Tution_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
