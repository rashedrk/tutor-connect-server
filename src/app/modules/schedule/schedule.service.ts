import { Schedule } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createSchedule = async(payload: Schedule, userId: string) => {

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
                schedule_id: schedule.id,
                tutor_id: tutor.id
            }
        })

        return schedule
    });

    return result
};

export const scheduleServices = {
    createSchedule,
}