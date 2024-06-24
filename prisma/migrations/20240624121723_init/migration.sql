-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('super_admin', 'admin', 'tutor', 'student');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('in_progress', 'blocked');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "MEDIUM" AS ENUM ('bangla', 'english');

-- CreateEnum
CREATE TYPE "Tuition_STATUS" AS ENUM ('available', 'booked');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'in_progress',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "contactNo" TEXT NOT NULL,
    "presentAddressId" TEXT NOT NULL,
    "permanentAddressId" TEXT NOT NULL,
    "profileImage" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "postOffice" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "policeStaion" TEXT NOT NULL,
    "upozila" TEXT NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "experties" TEXT[],
    "yearOfExperience" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "TutorSchedule" (
    "tutor_id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "TutorSchedule_pkey" PRIMARY KEY ("tutor_id","schedule_id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "instiTuition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorQualification" (
    "tutor_id" TEXT NOT NULL,
    "qualification_id" TEXT NOT NULL,

    CONSTRAINT "TutorQualification_pkey" PRIMARY KEY ("tutor_id","qualification_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tuition" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "medium" "MEDIUM" NOT NULL,
    "address_id" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "status" "Tuition_STATUS" NOT NULL DEFAULT 'available',
    "selected_tutor" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tuition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appliedTuition" (
    "Tuition_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,

    CONSTRAINT "appliedTuition_pkey" PRIMARY KEY ("Tuition_id","tutor_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_user_id_key" ON "Tutor"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorQualification" ADD CONSTRAINT "TutorQualification_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorQualification" ADD CONSTRAINT "TutorQualification_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_selected_tutor_fkey" FOREIGN KEY ("selected_tutor") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appliedTuition" ADD CONSTRAINT "appliedTuition_Tuition_id_fkey" FOREIGN KEY ("Tuition_id") REFERENCES "Tuition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appliedTuition" ADD CONSTRAINT "appliedTuition_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
