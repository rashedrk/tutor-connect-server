import prisma from "../../utils/prisma"

const getAllTutors = async () => {
    // TODO: add pagination, search and filtering
    const result = prisma.tutor.findMany({
        select: {
            id: true,
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
