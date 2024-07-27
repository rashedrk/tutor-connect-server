import { ROLE, User } from "@prisma/client"
import prisma from "../../utils/prisma"
import bcrypt from "bcrypt"
import config from "../../config/config";
import { TTutor, TUser } from "./user.interface";
import { setAddress } from "../../utils/setAddress";
import { TAuthUser } from "../../types/global";


const createStudent = async (payload: TUser) => {
    const result = await prisma.$transaction(async (trxClient) => {
        //hashing password using bcrypt 
        const hashedPassword = bcrypt.hashSync(payload.password, Number(config.salt_rounds as string));
        const user = await trxClient.user.create({
            data: {
                email: payload.email,
                password: hashedPassword,
                role: ROLE.student,
            }
        })



        const presentAddress = await setAddress(payload.presentAddress, trxClient);

        const permanentAddress = await setAddress(payload.presentAddress, trxClient);

        await trxClient.profile.create({
            data: {
                user_id: user.user_id,
                name: payload.name,
                email: payload.email,
                gender: payload.gender,
                dateOfBirth: payload.dateOfBirth,
                contactNo: payload.contactNo,
                presentAddressId: presentAddress.address_id,
                permanentAddressId: permanentAddress.address_id,
                profileImage: payload.profileImage,
            }
        });

        //find the user information that is created and send it 
        const student = await trxClient.user.findUnique({
            where: {
                user_id: user.user_id
            },
            select: {
                user_id: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
                profile: {
                    include: {
                        presentAddress: true,
                        permanentAddress: true,
                    }
                }
            }
        })

        return student
    });

    return result
};
const createTutor = async (payload: TTutor) => {
    const result = await prisma.$transaction(async (trxClient) => {
        //hashing password using bcrypt 
        const hashedPassword = bcrypt.hashSync(payload.password, Number(config.salt_rounds as string));
        const user = await trxClient.user.create({
            data: {
                email: payload.email,
                password: hashedPassword,
                role: ROLE.tutor,
            }
        })

        const presentAddress = await setAddress(payload.presentAddress, trxClient);
        const permanentAddress = await setAddress(payload.presentAddress, trxClient);

        const newProfile = await trxClient.profile.create({
            data: {
                user_id: user.user_id,
                name: payload.name,
                email: payload.email,
                gender: payload.gender,
                dateOfBirth: payload.dateOfBirth,
                contactNo: payload.contactNo,
                presentAddressId: presentAddress.address_id,
                permanentAddressId: permanentAddress.address_id,
                profileImage: payload.profileImage,
            }
        });

        const newTutor = await trxClient.tutor.create({
            data: {
                user_id: user.user_id,
                experties: payload.expertise,
                yearOfExperience: payload.yearOfExperience,
                fee: payload.fee,
                details: payload.details,
                class: payload.class,
                medium: payload.medium,
            }
        });

        const qualification = await trxClient.qualification.create({
            data: {
                degree: payload.qualification.degree,
                year: payload.qualification.year,
                institution: payload.qualification.institution
            }
        })

        await trxClient.tutorQualification.create({
            data: {
                tutor_id: newTutor.tutor_id,
                qualification_id: qualification.qualification_id
            }
        })

        //find the user information that is created and send it 
        const tutor = await trxClient.user.findUnique({
            where: {
                user_id: user.user_id
            },
            select: {
                user_id: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
                profile: {
                    include: {
                        presentAddress: true,
                        permanentAddress: true,
                    }
                },

            }
        });

        return {
            ...tutor,
            qualification: qualification
        }
    });

    return result
};

const getMyProfile = async (user: TAuthUser) => {
    const role = user.role;
    if (role === ROLE.student) {
        const userInfo = await prisma.user.findUniqueOrThrow({
            where: {
                user_id: user.user_id
            },
            select: {
                user_id: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
                profile: {
                    include: {
                        presentAddress: true,
                        permanentAddress: true,
                    },

                }
            }
        });

        return userInfo
    } else {
        const userInfo = await prisma.user.findUniqueOrThrow({
            where: {
                user_id: user.user_id
            },
            select: {
                user_id: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
                profile: {
                    include: {
                        presentAddress: true,
                        permanentAddress: true,
                    },

                },


            }
        });

        const tutorInfo = await prisma.tutor.findUniqueOrThrow({
            where: {
                user_id: user.user_id
            },
            include: {
                tutorQualification: {
                    include: {
                        qualification: true,
                    }
                },
            }

        })

        return {...userInfo, ...tutorInfo}
    }


}



export const userServices = {
    createStudent,
    createTutor,
    getMyProfile
}
