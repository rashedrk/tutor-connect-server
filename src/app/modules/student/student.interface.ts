

export type TName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TAddress = {
    areaName: string;
    policeStation: string;
    postOfficeName: string;
    postalCode: number;
    subDistrict: string;
    district: string;
    country: string;
}

export type TGuardian = {
    fatherName: string;
    motherName: string;
    fatherContact: string;
    motherContact: string;
}

export type TStudent = {
    // user: Types.ObjectId;
    name: TName;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    contactNo: string;
    presentAddress: TAddress;
    permanentAddress: TAddress;
    guardian: TGuardian;
    profileImage?: string;
    isDeleted: boolean;
}