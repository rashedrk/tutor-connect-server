import { FullAddress, GENDER, Qualification, User } from "@prisma/client";

export type TUser = {
  user_id: string;
  name: string;
  email: string;
  gender: GENDER;
  dateOfBirth: Date;
  contactNo: string;
  presentAddress: FullAddress;
  permanentAddress: FullAddress;
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
    presentAddress: FullAddress;
    permanentAddress: FullAddress;
    profileImage: string;
    expertise: string[];
    medium: string[];
    class: number[];
    yearOfExperience: string;
    fee: string;
    details: string;
    qualification: Qualification,
}