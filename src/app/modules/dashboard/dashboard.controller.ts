import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { TAuthUser } from "../../types/global";
import { dashboardServices } from "./dashboard.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getDashboardOverview = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const user = req?.user as TAuthUser;

    const result = await dashboardServices.getDashboardOverview(user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Dashboard overview retrieved successfully",
        data: result
    })
});

export const dashboardControllers = {
    getDashboardOverview
}