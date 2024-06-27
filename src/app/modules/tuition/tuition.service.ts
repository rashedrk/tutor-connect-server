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
        },
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

const getMyPostedTuition = async (userId: string) => {
    const result = await prisma.tuition.findMany({
        where: {
            student_id: userId
        },
        include: {
            appliedTuition: {
                include: {
                    tutor: {
                        include: {
                            profile: true,
                            review: true,
                        }
                    }
                }
            },
            selectedTutor: true
        }
    });

    return result
};

const requestToTutor = async (payload: any, tutorId: string, studentId: string) => {
    const result = await prisma.$transaction(async (trxClient) => {
        const address = await trxClient.address.create({
            data: payload.address
        });

        const schedule = await trxClient.schedule.create({
            data: payload.schedule
        });

        const request = await trxClient.tuitionRequest.create({
            data: {
                student_id: studentId,
                tutor_id: tutorId,
                subject: payload.subject,
                class: payload.class,
                medium: payload.medium,
                contactNo: payload.contactNo,
                address_id: address.id,
                salary: payload.salary,
                schedule_id: schedule.id
            }
        })

        return request
    });

    return result
};

const getAllRequestedTutor = async (studentId: string) => {
    const result = await prisma.tuitionRequest.findMany({
        where: {
            student_id: studentId
        }
    });

    return result
};

const getAllTuitionRequest = async (userId: string) => {
    const tutor = await prisma.tutor.findUniqueOrThrow({
        where: {
            user_id: userId
        }
    })

    
    const result = await prisma.tuitionRequest.findMany({
        where: {
            tutor_id: tutor.id
        },
        include: {
            student: true,
            address: true,
            schedule: true
        }
    });

    return result
};

export const tuitionServices = {
    createTuition,
    getAllTuitions,
    getATuitionById,
    applyTuition,
    getMyAppliedTuition,
    getMyPostedTuition,
    requestToTutor,
    getAllRequestedTutor,
    getAllTuitionRequest
}