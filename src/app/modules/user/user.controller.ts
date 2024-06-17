import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
const result = await userServices.createUser(req.body);

sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully!',
    data: result
})
});

export const userController = {
    createUser
}