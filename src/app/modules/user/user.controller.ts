import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from 'http-status';
import { TAuthUser } from "../../types/global";

const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'User created successfully!',
        data: result
    })
});

const getMyProfile = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {

    const id = req?.user?.id as string
    const result = await userServices.getMyProfile(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'User profile retrieved successfully!',
        data: result
    })
});

export const userController = {
    createUser,
    getMyProfile
}