import { Address, GENDER, MEDIUM } from "@prisma/client"

export type TTuition = {
    student_id: string
    subject: string
    class: string
    medium: MEDIUM
    address?: Address
    contactNo: string
    salary: string
    gender: GENDER
}