import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tuitionServices } from "./tuition.service";
import { Request } from "express";
import { TAuthUser } from "../../types/global";

const createTuition = catchAsync(async (req, res) => {
    const result = await tuitionServices.createTuition(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Tuition created successfully",
        data: result
    })
});

const getAllTuitions = catchAsync(async (req, res) => {
    const result = await tuitionServices.getAllTuitions();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Tuitions retrieved successfully",
        data: result
    })
});


const applyTuition = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const tuitionId = req.params.tuitionId;
    const userId = req?.user?.id as string;

    const result = await tuitionServices.applyTuition(userId, tuitionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully applied for tuition!",
        data: result
    })
});

export const tuitionControllers = {
    createTuition,
    getAllTuitions,
    applyTuition
}