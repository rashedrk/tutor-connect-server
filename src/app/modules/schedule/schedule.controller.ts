import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { TAuthUser } from "../../types/global";
import { scheduleServices } from "./schedule.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSchedule = catchAsync(async (req: Request & {user?: TAuthUser}, res) => {
    const userId = req?.user?.id as string;

    const result = await scheduleServices.createSchedule(req.body, userId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Schedule created successfully",
        data: result
    })
});

export const scheduleControllers = {
    createSchedule
}