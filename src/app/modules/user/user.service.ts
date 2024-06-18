import { User } from "@prisma/client"
import prisma from "../../utils/prisma"
import bcrypt from "bcrypt"
import config from "../../config/config";



const createUser = async (payload: User) => {
    // const result = await prisma.$transaction(async (trxClient) => {
    //     const newUser = await trxClient.user.create({
    //         data: {
    //             email: payload.email,
    //             password: payload.password,
    //             role: payload.role
    //         }
    //     });

    // const presentAddress = await trxClient.address.create({
    //     data: payload.presentAddress
    // });
    // const permanentAddress = await trxClient.address.create({
    //     data: payload.permanentAddress
    // });

    // const newProfile = await trxClient.profile.create({
    //     data: {
    //         user_id: newUser.id,
    //         name: payload.name,
    //         email: payload.email,
    //         gender: payload.gender,
    //         dateOfBirth: payload.dateOfBirth,
    //         contactNo: payload.contactNo,
    //         presentAddress: presentAddress.id,
    //         permanentAddress: permanentAddress.id,
    //         profileImage: payload.profileImage,
    //     }
    // });

    //     return newProfile
    // });


    //hashing password using bcrypt 
    const hashedPassword = bcrypt.hashSync(payload.password, Number(config.salt_rounds as string));

    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword //storing the hashed password
        },
        select: {
            id: true,
            email: true,
            role: true,
            is_deleted: true,
            status: true,
            created_at: true,
            updated_at: true
        },
    });

    return result
}

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
    createUser,
    getMyProfile
}
