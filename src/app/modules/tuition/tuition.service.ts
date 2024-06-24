import prisma from "../../utils/prisma";

const createTuition = (payload) => {

    const result = prisma.$transaction(async (trxClient) => {
        const address = await trxClient.address.create({
            data: payload.address
        });

        delete payload.address;

        const tuition = await trxClient.tuition.create({
            data: {
                ...payload,
                address_id: address.id,
                // student: {
                //     connect: { id: payload.student_id }
                // },
                // address: {
                //     connect: {id: address.id}
                // }
            }
        })

        return tuition

    })



    return result;
};

export const tuitionServices = {
    createTuition
}