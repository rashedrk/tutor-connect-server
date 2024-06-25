import prisma from "../../utils/prisma"

const getAllTutors = async () => {
    // TODO: add pagination, search and filtering
    const result = prisma.tutor.findMany({
        include: {
            profile: {
                include: {
                    presentAddress: true,
                    permanentAddress: true,
                }
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

const getATutorById = async (tutorId: string) => {
    const result = await prisma.tutor.findUnique({
        where: {
            id: tutorId
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
