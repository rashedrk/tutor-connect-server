import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from 'http-status';
import { TAuthUser } from "../../types/global";

const createTutor = catchAsync(async (req, res) => {
    const result = await userServices.createTutor(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Tutor created successfully!',
        data: result
    })
});

const createStudent = catchAsync(async (req, res) => {
    const result = await userServices.createStudent(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Student created successfully!',
        data: result
    })
});



export const userController = {
    createStudent,
    createTutor,
}