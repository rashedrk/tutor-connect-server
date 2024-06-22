import { Address, GENDER, Qualification, User } from "@prisma/client";

export type TUser = {
  user_id: string;
  name: string;
  email: string;
  gender: GENDER;
  dateOfBirth: Date;
  contactNo: string;
  presentAddress: Address;
  permanentAddress: Address;
  profileImage?: string;
  isDeleted?: boolean;
} & User

export type TTutor = {
    id: string;
    name: string;
    email: string;
    password: string;
    gender: GENDER;
    dateOfBirth: string;
    contactNo: string;
    presentAddress: Address;
    permanentAddress: Address;
    profileImage: string;
    expertise: string[];
    yearOfExperience: string;
    fee: string;
    details: string;
    location: string;
    qualification: Qualification,
}