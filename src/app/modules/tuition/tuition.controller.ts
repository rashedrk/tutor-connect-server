import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tuitionServices } from "./tuition.service";
import { Request } from "express";
import { TAuthUser } from "../../types/global";

const createTuition = catchAsync(async (req, res) => {
    const result = await tuitionServices.createTuition(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Tuition created successfully",
        data: result
    })
});

const getAllTuitions = catchAsync(async (req, res) => {
    const result = await tuitionServices.getAllTuitions();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Tuitions retrieved successfully",
        data: result
    })
});

const getATuitionById = catchAsync(async (req, res) => {
    const tuitionId = req.params.tuitionId;

    const result = await tuitionServices.getATuitionById(tuitionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tuition retrieved successfully",
        data: result
    })
});


const applyTuition = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const tuitionId = req.params.tuitionId;
    const userId = req?.user?.id as string;

    const result = await tuitionServices.applyTuition(userId, tuitionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully applied for tuition!",
        data: result
    })
});

const getMyAppliedTuition = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.id as string;

    const result = await tuitionServices.getMyAppliedTuition(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All applied tuitions retrieved successfully",
        data: result
    })
});

const getMyPostedTuition = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.id as string;

    const result = await tuitionServices.getMyPostedTuition(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All posted tuitions retrieved successfully",
        data: result
    }) 
});

const requestToTutor = catchAsync(async (req: Request & { user?: TAuthUser},res) => {
    const studentId = req?.user?.id as string;
    const tutorId = req.params.tutorId;
    const payload = req.body

    const result = await tuitionServices.requestToTutor(payload,tutorId,studentId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Request send successfully",
        data: result
    })

});

const getAllRequestedTutor = catchAsync(async (req: Request & { user?: TAuthUser},res) => {
    const studentId = req?.user?.id as string;

    const result = await tuitionServices.getAllRequestedTutor(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All requested tutors retrieved successfully",
        data: result
    })

})


export const tuitionControllers = {
    createTuition,
    getAllTuitions,
    applyTuition,
    getMyAppliedTuition,
    getATuitionById,
    getMyPostedTuition,
    requestToTutor,
    getAllRequestedTutor
}