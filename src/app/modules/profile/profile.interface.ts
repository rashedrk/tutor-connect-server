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

export type TOthersInfo = {
    experties: string[],
    yearOfExperience: string,
    medium: string[],
    class: number[],
    fee: string,
}