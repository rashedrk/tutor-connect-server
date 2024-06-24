import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tuitionServices } from "./tuition.service";

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

export const tuitionControllers = {
    createTuition,
    getAllTuitions
}