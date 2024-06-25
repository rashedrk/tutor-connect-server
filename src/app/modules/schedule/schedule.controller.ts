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

const getAllSchedule = catchAsync(async(req: Request & {user?: TAuthUser},res) => {
    const userId = req?.user?.id as string;
    const result = await scheduleServices.getAllSchedule(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All schedules retrieved successfully",
        data: result
    })
});

const getAScheduleById = catchAsync(async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const result = await scheduleServices.getAScheduleById(scheduleId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule retrieved successfully",
        data: result
    })
});

const updateSchedule = catchAsync( async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const result = await scheduleServices.updateSchedule(req.body, scheduleId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule updated successfully",
        data: result
    })
})

export const scheduleControllers = {
    createSchedule,
    getAllSchedule,
    getAScheduleById,
    updateSchedule
}