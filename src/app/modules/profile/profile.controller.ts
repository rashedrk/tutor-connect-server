import { Request } from "express";
import { TAuthUser } from "../../types/global";
import catchAsync from "../../utils/catchAsync";
import { profileServices } from "./profile.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getMyProfile = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {


    const result = await profileServices.getMyProfile(req?.user as TAuthUser);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User profile retrieved successfully!',
        data: result
    })
});

const updateDetails = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;
    const details = req.body.details;

    const result = await profileServices.updateDetails(userId, details);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tutor details updated successfully",
        data: result
    })
});

const updatePersonalInfo = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;

    const result = await profileServices.updatePersonalInfo(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Personal Information updated successfully",
        data: result
    })
});

const updateAddress = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;

    const result = await profileServices.updateAddress(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Address updated successfully",
        data: result
    })
});

const updateAcademicInfo = catchAsync(async (req, res) => {
    const tutorQualification = req.body.tutorQualification

    const result = await profileServices.updateAcademicInfo(tutorQualification);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic info updated successfully",
        data: result
    })
});

const updateOthersInfo = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;

    const result = await profileServices.updateOthersInfo(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Others info updated successfully",
        data: result
    })
});

export const profileControllers = {
    getMyProfile,
    updateDetails,
    updatePersonalInfo,
    updateAddress,
    updateAcademicInfo,
    updateOthersInfo
}