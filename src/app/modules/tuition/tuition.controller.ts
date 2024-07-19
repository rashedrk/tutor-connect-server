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

const getAllTuitions = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;
    const result = await tuitionServices.getAllTuitions(userId);

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
    const userId = req?.user?.user_id as string;

    const result = await tuitionServices.applyTuition(userId, tuitionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully applied for tuition!",
        data: result
    })
});


const getMyAppliedTuition = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;

    const result = await tuitionServices.getMyAppliedTuition(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All applied tuitions retrieved successfully",
        data: result
    })
});

//for student
const getMyPostedTuition = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;

    const result = await tuitionServices.getMyPostedTuition(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All posted tuitions retrieved successfully",
        data: result
    })
});

const requestToTutor = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const studentId = req?.user?.user_id as string;
    const tutorId = req.params.tutorId;
    const payload = req.body

    const result = await tuitionServices.requestToTutor(payload, tutorId, studentId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Request send successfully",
        data: result
    })

});

const getMyTutorRequest = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const studentId = req?.user?.user_id as string;

    const result = await tuitionServices.getMyTutorRequest(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All requested tutors retrieved successfully",
        data: result
    })

});

const getAllTuitionRequest = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;

    const result = await tuitionServices.getAllTuitionRequest(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All tuition requests retrieved successfully",
        data: result
    })

});

const changeTuitionRequestStatus = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const userId = req?.user?.user_id as string;
    const tuitionId = req.params.tuitionId;
    const status = req.body.status

    const result = await tuitionServices.changeTuitionRequestStatus(status, userId, tuitionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Request status updated successfully",
        data: result
    })

});

const getMyCurrentTuitions = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const user = req?.user as TAuthUser;

    const result = await tuitionServices.getMyCurrentTuitions(user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All current tuitions retrieved successfully",
        data: result
    })

});

const selectTutor = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const studentId = req?.user?.user_id as string;
    const tutorId = req.params.tutorId;
    const tuitionId = req.body.tuitionId

    const result = await tuitionServices.selectTutor(tuitionId, tutorId, studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tutor successfully selected",
        data: result
    })

});

const getAppliedTutors = catchAsync(async (req, res) => {
    const tuitionId = req.params.tuitionId;

    const result = await tuitionServices.getAppliedTutors(tuitionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Applied Tutors retrieved successfully",
        data: result
    })
});

const cancelTuitionRequest = catchAsync(async (req: Request & { user?: TAuthUser }, res) => {
    const studentId = req?.user?.user_id as string;
    const tuitionRequestId = req.params.tuitionRequestId;

    const result = await tuitionServices.cancelTuitionRequest(tuitionRequestId, studentId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tuition request successfully cancelled",
        data: result
    })

});


export const tuitionControllers = {
    createTuition,
    getAllTuitions,
    applyTuition,
    getMyAppliedTuition,
    getATuitionById,
    getMyPostedTuition,
    requestToTutor,
    getMyTutorRequest,
    getAllTuitionRequest,
    changeTuitionRequestStatus,
    getMyCurrentTuitions,
    selectTutor,
    getAppliedTutors,
    cancelTuitionRequest
}