import { ROLE, User } from "@prisma/client"
import prisma from "../../utils/prisma"
import bcrypt from "bcrypt"
import config from "../../config/config";
import { TTutor, TUser } from "./user.interface";


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


        let presentAddress, permanentAddress;
        const isPresentAddressAvailable = await prisma.fullAddress.findFirst({
            where: {
                ...payload.presentAddress
            }
        });

        if (isPresentAddressAvailable) {
            presentAddress = isPresentAddressAvailable
        }
        else {
            presentAddress = await trxClient.fullAddress.create({
                data: payload.presentAddress
            });
        }

        const isPermanentAddressAvailable = await prisma.fullAddress.findFirst({
            where: {
                ...payload.presentAddress
            }
        });

        if (isPermanentAddressAvailable) {
            permanentAddress = isPermanentAddressAvailable
        }
        else {
            permanentAddress = await trxClient.fullAddress.create({
                data: payload.permanentAddress
            });
        }

        await trxClient.profile.create({
            data: {
                user_id: user.id,
                name: payload.name,
                email: payload.email,
                gender: payload.gender,
                dateOfBirth: payload.dateOfBirth,
                contactNo: payload.contactNo,
                presentAddressId: presentAddress.id,
                permanentAddressId: permanentAddress.id,
                profileImage: payload.profileImage,
            }
        });

        //find the user information that is created and send it 
        const student = await trxClient.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
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

        let presentAddress, permanentAddress;

        const isPresentAddressAvailable = await prisma.fullAddress.findFirst({
            where: {
                ...payload.presentAddress
            }
        });

        if (isPresentAddressAvailable) {
            presentAddress = isPresentAddressAvailable
        }
        else {
            presentAddress = await trxClient.fullAddress.create({
                data: payload.presentAddress
            });
        }

        const isPermanentAddressAvailable = await prisma.fullAddress.findFirst({
            where: {
                ...payload.presentAddress
            }
        });

        if (isPermanentAddressAvailable) {
            permanentAddress = isPermanentAddressAvailable
        }
        else {
            permanentAddress = await trxClient.fullAddress.create({
                data: payload.permanentAddress
            });
        }

        const newProfile = await trxClient.profile.create({
            data: {
                user_id: user.id,
                name: payload.name,
                email: payload.email,
                gender: payload.gender,
                dateOfBirth: payload.dateOfBirth,
                contactNo: payload.contactNo,
                presentAddressId: presentAddress.id,
                permanentAddressId: permanentAddress.id,
                profileImage: payload.profileImage,
            }
        });

        const newTutor = await trxClient.tutor.create({
            data: {
                user_id: user.id,
                experties: payload.expertise,
                yearOfExperience: payload.yearOfExperience,
                fee: payload.fee,
                details: payload.details,
                location: payload.location,
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
                tutor_id: newTutor.id,
                qualification_id: qualification.id
            }
        })

        //find the user information that is created and send it 
        const tutor = await trxClient.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
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

const getMyProfile = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        select: {
            id: true,
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
    });

    return user
}



export const userServices = {
    createStudent,
    createTutor,
    getMyProfile
}
