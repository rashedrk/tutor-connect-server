import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";

const createTuition = async (payload: any) => {

    const result = await prisma.$transaction(async (trxClient) => {
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

const getAllTuitions = async () => {
    const result = await prisma.tuition.findMany({});

    //TODO: add pagination , search and filtering
    return result;
};

const getATuitionById = async (tuitionId: string) => {
    const result = await prisma.tuition.findUnique({
        where: {
            id: tuitionId
        }
    });

    return result;
}

const applyTuition = async (userId: string, tuitionId: string) => {
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id: userId
        }
    });

    // console.log("tutor",tutor);


    if (!tutor) {
        throw new AppError(httpStatus.NOT_FOUND, "tutor not found")
    }

    await prisma.appliedTuition.create({
        data: {
            tutor_id: tutor.id,
            tuition_id: tuitionId
        }
    });

    const result = await prisma.tuition.findUnique({
        where: {
            id: tuitionId
        }
    })

    return result;
};

const getMyAppliedTuition = async (userId: string) => {
    //TODO: add pagination , search and filtering
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id: userId
        }
    });

    if (!tutor) {
        throw new AppError(httpStatus.NOT_FOUND, "tutor not found")
    }

    const result = await prisma.appliedTuition.findMany({
        where: {
            tutor_id: tutor.id
        },
        include: {
            tuition: true
        }
    });

    return result;
}

export const tuitionServices = {
    createTuition,
    getAllTuitions,
    getATuitionById,
    applyTuition,
    getMyAppliedTuition
}