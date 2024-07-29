import { GENDER } from "@prisma/client"

export type TPersonalInfo = {
    name?: string,
    email?: string,
    contactNo?: string,
    gender?: GENDER,
    dateOfBirth?: string,
}