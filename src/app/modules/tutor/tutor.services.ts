import { Prisma } from "@prisma/client";
import { TPaginationOptions } from "../../types/global";
import { calculatePagination } from "../../utils/calculatePagination";
import prisma from "../../utils/prisma"
import { TTutorFilterRequest } from "./tutor.interface";
import { addArrayFieldFilter } from "../../utils/SearchFilter";

const getAllTutors = async (filters: TTutorFilterRequest, options: TPaginationOptions) => {
    const { page, limit, skip } = calculatePagination(options);
    const { searchTerm, area, district, gender, class: studentClass, experties, medium } = filters;

    const andConditions: Prisma.TutorWhereInput[] = [];

    //search
    if (searchTerm) {
        andConditions.push({
            OR: [
                { // Searching in name , email field
                    profile: {
                        OR: [
                            {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                email: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            }
                        ]
                    },
                },
                { // Searching in expertise array
                    experties: {
                        hasSome: searchTerm.split(" "),
                    },
                },

                { // Searching in tutorQualification
                    tutorQualification: {
                        some: {
                            qualification: {
                                OR: [
                                    { // Searching in degree field
                                        degree: {
                                            contains: searchTerm,
                                            mode: 'insensitive',
                                        },
                                    },
                                    { // Searching in institution field
                                        institution: {
                                            contains: searchTerm,
                                            mode: 'insensitive',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                }
            ]
        });
    }

    // --------------filter ------------------- 
    if (area) {
        andConditions.push({
            profile: {
                presentAddress: {
                    area: {
                        equals: area,
                    },
                },
            },
        });
    }

    if (district) {
        andConditions.push({
            profile: {
                presentAddress: {
                    district: {
                        equals: district,
                    },
                },
            },
        });
    }

    if (gender) {
        andConditions.push({
            profile: {
                gender: {
                    equals: gender,
                },
            },
        });
    }

    addArrayFieldFilter(andConditions, 'medium', medium);
    addArrayFieldFilter(andConditions, 'class', Number(studentClass));
    addArrayFieldFilter(andConditions, 'experties', experties);
    
    // ---------------filter end --------------------------

    const whereConditions: Prisma.TutorWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.tutor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { rating: 'desc' },
        select: {
            tutor_id: true,
            user_id: true,
            experties: true,
            details: true,
            fee: true,
            profile: {
                select: {
                    name: true,
                    email: true,
                    profileImage: true,
                }
            },
            review: true,
            tutorQualification: {
                select: {
                    qualification: true
                }
            },
            rating: true
        },
    });

    const total = await prisma.tutor.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    }
}

const getATutorById = async (tutorId: string) => {
    const result = await prisma.tutor.findUnique({
        where: {
            tutor_id: tutorId
        },
        include: {
            profile: {
                include: {
                    presentAddress: true,
                    permanentAddress: true,
                }
            },
            tutorSchedule: {
                include: { schedule: true }
            },
            review: true,
            tutorQualification: {
                select: {
                    qualification: true
                }

            }
        }
    });

    return result
}



export const tutorServices = {
    getAllTutors,
    getATutorById
}
