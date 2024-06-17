import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import config from "../../config/config";

const login = catchAsync(async (req, res) => {
    const result = await authServices.login(req.body);

    res.cookie("refreshToken",result.refreshToken, {
        secure : config.node_env === "production",
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user login successful',
        data: {
            accessToken: result.accessToken
        }
    })
});

export const authControllers = {
    login
}