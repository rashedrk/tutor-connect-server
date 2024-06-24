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
})

export const tuitionControllers = {
    createTuition
}