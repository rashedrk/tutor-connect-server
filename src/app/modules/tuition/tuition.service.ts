import prisma from "../../utils/prisma";

const createTuition = (payload: any) => {

    const result = prisma.$transaction(async (trxClient) => {
        const address = await trxClient.address.create({
            data: payload.address
        });

        delete payload.address;

        const tuition = await trxClient.tuition.create({
            data: {
                ...payload,
                address_id: address.id,
            }
        })

        return tuition

    })



    return result;
};

const getAllTuitions = () => {
    const result = prisma.tuition.findMany({});

    return result;
} 

export const tuitionServices = {
    createTuition,
    getAllTuitions
}