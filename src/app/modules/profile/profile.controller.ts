import { Request } from "express";
import { TAuthUser } from "../../types/global";
import catchAsync from "../../utils/catchAsync";
import { profileServices } from "./profile.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

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

export const profileControllers = {
    updateDetails
}