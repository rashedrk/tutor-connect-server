import { User } from "@prisma/client"
import prisma from "../../utils/prisma"




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

    const result = await prisma.user.create({
        data: payload
    });

    return result
}


export const userServices = {
    createUser
}
