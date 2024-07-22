import { Schedule } from "@prisma/client";
import prisma from "./prisma";

export const setSchedule = async (schedule: Schedule, trxClient: any) => {

    //TODO: implement findSchedule
    // const isScheduleAvailable = await prisma.schedule.findFirst({
    //     where: {
    //        days: schedule.days,
    //        startTime: schedule.startTime,
    //        endTime: schedule.endTime,
    //     }
    // });

    // if (isScheduleAvailable) {
    //     return isScheduleAvailable
    // }
    // else {
        return await trxClient.schedule.create({
            data: schedule
        });
    // }
}