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





export const tutorServices = {
    getAllTutors
}
