import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tutorServices } from "./tutor.services";
import pick from "../../utils/pick";
import { tutorFilterableFields } from "./tutor.constant";
import { paginationOptions } from "../../constant";

const getAllTutors = catchAsync(async (req, res) => {
    const filters = pick(req.query, tutorFilterableFields);
    const options = pick(req.query, paginationOptions);

    const result = await tutorServices.getAllTutors(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All tutors were successfully retrieved',
        meta: result.meta,
        data: result.data
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