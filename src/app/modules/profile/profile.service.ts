import { Qualification } from "@prisma/client";
import prisma from "../../utils/prisma"
import { setAddress } from "../../utils/setAddress";
import { TAddress,  TOthersInfo, TPersonalInfo } from "./profile.interface";

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

const updateAcademicInfo = async (academicInfo: Qualification[]) => {
    const result = await prisma.$transaction(async (trxClient) => {
        for (const qualification of academicInfo) {
            const { qualification_id, degree, institution, year } = qualification;

            await trxClient.qualification.update({
                where: { qualification_id },
                data: { degree, institution, year }
            });
        }
    });

    return result;
};

const updateOthersInfo = async (userId: string, otherInfo: TOthersInfo) => {
    const { experties, fee, medium, yearOfExperience } = otherInfo;
    const result = await prisma.tutor.update({
        where: {
            user_id: userId
        },
        data: {
            experties,
            fee,
            medium,
            yearOfExperience,
            class: otherInfo.class
        }
    })
    return result;
}

export const profileServices = {
    updateDetails,
    updatePersonalInfo,
    updateAddress,
    updateAcademicInfo,
    updateOthersInfo
}