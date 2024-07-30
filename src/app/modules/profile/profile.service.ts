import prisma from "../../utils/prisma"
import { setAddress } from "../../utils/setAddress";
import { TAddress, TPersonalInfo } from "./profile.interface";

const updateDetails = async (userId: string, details: string) => {

    const result = await prisma.tutor.update({
        where: {
            user_id: userId,
        },
        data: {
            details: details,
        }
    });

    return result;
};

const updatePersonalInfo = async (userId: string, personalInfo: TPersonalInfo) => {


    const result = await prisma.$transaction(async (trxClient) => {
        const profile = await trxClient.profile.update({
            where: {
                user_id: userId,
            },
            data: {
                name: personalInfo.name,
                email: personalInfo.email,
                contactNo: personalInfo.contactNo,
                gender: personalInfo.gender,
                dateOfBirth: personalInfo.dateOfBirth,
            }
        });

        if (personalInfo?.email) {
            await trxClient.user.update({
                where: {
                    user_id: userId,
                },
                data: {
                    email: personalInfo?.email,
                }
            })
        };

        return profile
    })

    return result;
};


const updateAddress = async (userId: string, address: TAddress) => {
    const result = await prisma.$transaction(async (trxClient) => {
        if (address?.permanentAddress) {
            const permanentAddress = await setAddress(address.permanentAddress, trxClient);

            await trxClient.profile.update({
                where: {
                    user_id: userId
                },
                data: {
                    permanentAddressId: permanentAddress.address_id
                }
            })

        }

        if (address?.presentAddress) {
            const presentAddress = await setAddress(address.presentAddress, trxClient);

            await trxClient.profile.update({
                where: {
                    user_id: userId
                },
                data: {
                    presentAddressId: presentAddress.address_id
                }
            })
        }

    });

    return result;
};

export const profileServices = {
    updateDetails,
    updatePersonalInfo,
    updateAddress
}