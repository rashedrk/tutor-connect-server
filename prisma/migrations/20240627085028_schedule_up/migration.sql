/*
  Warnings:

  - A unique constraint covering the columns `[schedule_id]` on the table `Tuition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schedule_id` to the `Tuition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tuition" ADD COLUMN     "schedule_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tuition_schedule_id_key" ON "Tuition"("schedule_id");

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
