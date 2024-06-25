import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tutorServices } from "./tutor.services";

const getAllTutors = catchAsync(async (req, res) => {
    const result = await tutorServices.getAllTutors();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All tutors were successfully retrieved',
        data: result
    })
});

const getATutorById = catchAsync(async (req, res) => {
    const tutorId = req.params.tutorId;
    const result = await tutorServices.getATutorById(tutorId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tutor  successfully retrieved',
        data: result
    })
})

export const tutorControllers = {
    getAllTutors,
    getATutorById
}