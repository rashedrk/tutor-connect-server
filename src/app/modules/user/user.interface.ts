import { Address, GENDER, User } from "@prisma/client";

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