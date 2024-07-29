import prisma from "../../utils/prisma"

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


export const profileServices = {
    updateDetails,
}