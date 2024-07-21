import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { REQUEST_STATUS } from "@prisma/client";
import { TAuthUser } from "../../types/global";

//create a tuition - student
const createTuition = async (payload: any) => {

    const result = await prisma.$transaction(async (trxClient) => {
        const address = await trxClient.fullAddress.create({
            data: payload.fullAddress
        });

        const schedule = await trxClient.schedule.create({
            data: payload.schedule
        })

        delete payload.fullAddress;
        delete payload.schedule;

        const tuition = await trxClient.tuition.create({
            data: {
                ...payload,
                address_id: address.address_id,
                schedule_id: schedule.schedule_id
            }
        })

        return tuition

    })



    return result;
};

//retrieve all the available tuitions - tutor, students, tutors
const getAllTuitions = async (user_id: string) => {
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id
        }
    })
    const tuition = await prisma.tuition.findMany({
        include: {
            schedule: true,
            appliedTuition: true,
            address: true,
        }
    });

    const result = tuition.map(tuitionItem => ({
        ...tuitionItem,
        isApplied: tuitionItem.appliedTuition.find(item => item.tutor_id === tutor?.tutor_id) ? true : false
    }));

    // console.log(result);


    //TODO: add pagination , search and filtering
    return result;
};


//get specific tuition by id - tutor, students, tutors
const getATuitionById = async (tuitionId: string) => {
    const result = await prisma.tuition.findUnique({
        where: {
            tuition_id: tuitionId
        },
    });

    return result;
}

//Tutors will apply to a tuition
const applyTuition = async (userId: string, tuitionId: string) => {
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id: userId
        }
    });

    // console.log("tutor",tutor);


    if (!tutor) {
        throw new AppError(httpStatus.NOT_FOUND, "tutor not found")
    }

    await prisma.appliedTuition.create({
        data: {
            tutor_id: tutor.tutor_id,
            tuition_id: tuitionId
        }
    });

    const result = await prisma.tuition.findUnique({
        where: {
            tuition_id: tuitionId
        }
    })

    return result;
};

//tutor can see all the tuitions that he/she applied
const getMyAppliedTuition = async (userId: string) => {
    //TODO: add pagination , search and filtering
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id: userId
        }
    });

    if (!tutor) {
        throw new AppError(httpStatus.NOT_FOUND, "tutor not found")
    }

    const result = await prisma.appliedTuition.findMany({
        where: {
            tutor_id: tutor.tutor_id
        },
        include: {
            tuition: {
                include: {
                    address: true,
                    schedule: true,
                }
            },

        }
    });

    return result;
}

//students can see all the tuitions that they have posted
const getMyPostedTuition = async (userId: string) => {
    const result = await prisma.tuition.findMany({
        where: {
            student_id: userId
        },
        include: {
            appliedTuition: {
                include: {
                    tutor: {
                        include: {
                            profile: true,
                            review: true,
                        }
                    }
                }
            },
            selectedTutor: true
        }
    });

    return result
};

//student can request to a tutor for tuition
const requestToTutor = async (payload: any, tutorId: string, studentId: string) => {
    const result = await prisma.$transaction(async (trxClient) => {
        const address = await trxClient.fullAddress.create({
            data: payload.fullAddress
        });

        const schedule = await trxClient.schedule.create({
            data: payload.schedule
        });

        const request = await trxClient.tuitionRequest.create({
            data: {
                student_id: studentId,
                tutor_id: tutorId,
                subject: payload.subject,
                class: payload.class,
                medium: payload.medium,
                contactNo: payload.contactNo,
                address_id: address.address_id,
                salary: payload.salary,
                schedule_id: schedule.schedule_id
            }
        })

        return request
    });

    return result
};

//student can see all the tuition request that they have made to tutors
const getMyTutorRequest = async (studentId: string) => {
    const result = await prisma.tuitionRequest.findMany({
        where: {
            student_id: studentId
        },
        include: {
            address: true,
            schedule: true,
            tutor: {
                select: {
                    profile: {
                        select: {
                            name: true,
                            contactNo: true,
                            email: true
                        }
                    }
                }
            },
        }
    });

    return result
};


//tutors can see all the requested tuitions from the students
const getAllTuitionRequest = async (userId: string) => {
    const tutor = await prisma.tutor.findUniqueOrThrow({
        where: {
            user_id: userId,

        }
    })


    const result = await prisma.tuitionRequest.findMany({
        where: {
            tutor_id: tutor.tutor_id,
            status: {
                not: 'cancelled'
            }
        },
        include: {
            student: true,
            address: true,
            schedule: true
        }
    });

    return result
};

//tutors can change the status of the tuition request
//they can accept, reject
const changeTuitionRequestStatus = async (status: REQUEST_STATUS, userId: string, tuitionRequestId: string) => {

    const tutor = await prisma.tutor.findUniqueOrThrow({
        where: {
            user_id: userId
        }
    })

    const result = await prisma.tuitionRequest.update({
        where: {
            tuition_request_id: tuitionRequestId,
            tutor_id: tutor.tutor_id
        },
        data: {
            status: status
        }
    });

    return result;
};

//students can see the list of tuitions they are doing,
//tutors can see the list of tuitions they are doing
const getMyCurrentTuitions = async (user: TAuthUser) => {
    const role = user.role;

    if (role === 'student') {
        const tuitions = await prisma.tuition.findMany({
            where: {
                student_id: user.user_id,
                status: 'booked'
            },
            include: {
                schedule: true,
                selectedTutor: {
                    select: {
                        tutor_id: true,
                        profile: {
                            select: {
                                name: true,
                                email: true,
                                contactNo: true,
                                profileImage: true,
                            }
                        },
                    }
                }
            }
        })

        const requestedTuition = await prisma.tuitionRequest.findMany({
            where: {
                student_id: user.user_id,
                status: 'accepted'
            },
            include: {
                schedule: true,
                tutor: {
                    select: {
                        profile: {
                            select: {
                                name: true,
                                email: true,
                                contactNo: true,
                                profileImage: true,
                            }
                        }
                    }
                }
            }
        })

        return [...tuitions, ...requestedTuition]
    }
    else if (role === 'tutor') {
        const tutor = await prisma.tutor.findUnique({
            where: {
                user_id: user.user_id
            }
        })
        const tuitions = await prisma.tuition.findMany({
            where: {
                selected_tutor: tutor?.tutor_id,
            },
            include: {
                address: true,
                schedule: true,
                student: {
                    select: {
                        name: true,
                        email: true,
                        contactNo: true,
                        profileImage: true,
                    }
                }
            }

        });

        const requestedTuition = await prisma.tuitionRequest.findMany({
            where: {
                tutor_id: tutor?.tutor_id,
                status: 'accepted'
            },
            include: {
                address: true,
                schedule: true,
                student: {
                    select: {
                        name: true,
                        email: true,
                        contactNo: true,
                        profileImage: true,
                    }
                }
            }
        })

        return [...tuitions, ...requestedTuition]
    }
}

//students can assign/select a tutor for a specific tuition that they have posted
const selectTutor = async (studentId: string, appliedTuitionId: string) => {


    const result = await prisma.$transaction(async (trxClient) => {

        const tuitionRequest = await trxClient.appliedTuition.update({
            where: {
                applied_tuition_id: appliedTuitionId
            },
            data: {
                status: 'accepted'
            }
        })

        const tuition = await trxClient.tuition.update({
            where: {
                tuition_id: tuitionRequest.tuition_id,
                student_id: studentId
            },
            data: {
                status: "booked",
                selected_tutor: tuitionRequest.tutor_id
            }
        });


        return tuition

    })

    return result;
}


const getAppliedTutors = async (tuitionId: string) => {
    const result = await prisma.appliedTuition.findMany({
        where: {
            tuition_id: tuitionId
        },
        select: {
            tuition_id: true,
            tutor: {
                include: {
                    profile: {
                        select: {
                            name: true,
                            email: true,
                            contactNo: true,
                            gender: true,
                        }
                    },
                    tutorQualification: {
                        select: {
                            qualification: true
                        }
                    }
                }
            },
            applied_tuition_id: true,
        }
    });

    return result;
}

//for student
const cancelTuitionRequest = async (tuition_request_id: string, student_id: string) => {
    const result = await prisma.tuitionRequest.update({
        where: {
            tuition_request_id,
            student_id
        },
        data: {
            status: 'cancelled'
        }
    });

    return result;
}

//for tutor
const cancelAppliedTuition = async (applied_tuition_id: string, user_id: string) => {
    const tutor = await prisma.tutor.findUnique({
        where: {
            user_id
        }
    });

    if (!tutor) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authenticated")
    }
    const result = await prisma.appliedTuition.update({
        where: {
            applied_tuition_id,
            tutor_id: tutor.tutor_id
        },
        data: {
            status: 'cancelled'
        }
    });

    return result
};

export const tuitionServices = {
    createTuition,
    getAllTuitions,
    getATuitionById,
    applyTuition,
    getMyAppliedTuition,
    getMyPostedTuition,
    requestToTutor,
    getMyTutorRequest,
    getAllTuitionRequest,
    changeTuitionRequestStatus,
    getMyCurrentTuitions,
    selectTutor,
    getAppliedTutors,
    cancelTuitionRequest,
    cancelAppliedTuition
}