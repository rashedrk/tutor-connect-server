import { Schedule } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createSchedule = async (payload: Schedule, userId: string) => {

    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id: userId,
        }
    })
    if (!tutor) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const result = await prisma.$transaction(async (trxClient) => {
        const schedule = await trxClient.schedule.create({
            data: payload
        });

        await trxClient.tutorSchedule.create({
            data: {
                schedule_id: schedule.schedule_id,
                tutor_id: tutor.tutor_id
            }
        })

        return schedule
    });

    return result
};

const getAllSchedule = async (userId: string) => {
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id: userId
        }
    });

    if (!tutor) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    const result = await prisma.tutorSchedule.findMany({
        where: {
            tutor_id: tutor.tutor_id
        },
        select: {
            schedule: true
        }
    });

    return result;
}

const getAScheduleById = async (scheduleId: string) => {
    const result = await prisma.schedule.findUniqueOrThrow({
        where: {
            schedule_id: scheduleId
        }
    });

    return result;
}

const updateSchedule = async (payload: Partial<Schedule>, scheduleId: string) => {
    const result = await prisma.schedule.update({
        where: {
            schedule_id: scheduleId
        },
        data: payload
    });

    return result;
};

const deleteSchedule = async (scheduleId: string) => {
    const result = await prisma.$transaction(async (trxClient) => {

        await trxClient.tutorSchedule.deleteMany({
            where: {
                schedule_id: scheduleId
            }
        })

        const schedule = await trxClient.schedule.delete({
            where: {
                schedule_id: scheduleId
            }
        });

        return schedule
    })

    return result
}

export const scheduleServices = {
    createSchedule,
    getAllSchedule,
    getAScheduleById,
    updateSchedule,
    deleteSchedule
}