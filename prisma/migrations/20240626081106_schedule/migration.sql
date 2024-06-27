/*
  Warnings:

  - You are about to drop the column `StartDate` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "StartDate",
DROP COLUMN "endDate",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorSchedule" ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "student_id" TEXT;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Profile"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
