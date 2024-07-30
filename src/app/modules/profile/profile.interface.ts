import { FullAddress, GENDER } from "@prisma/client"

export type TPersonalInfo = {
    name?: string,
    email?: string,
    contactNo?: string,
    gender?: GENDER,
    dateOfBirth?: string,
};

export type TAddress = {
    presentAddress?: FullAddress,
    permanentAddress?: FullAddress
}