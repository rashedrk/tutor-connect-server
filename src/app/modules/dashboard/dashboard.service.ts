import { TAuthUser } from "../../types/global";
import prisma from "../../utils/prisma";

const getDashboardOverview = async (user: TAuthUser) => {
    if (user?.role === "tutor") {
        const tutor = await prisma.tutor.findUnique({
            where: {
                user_id: user.user_id
            }
        })
        const tuitions = await prisma.tuition.count({
            where: {
                selected_tutor: tutor?.tutor_id,
            }
        })

        const tuitionRequest = await prisma.tuitionRequest.count({
            where: {
                tutor_id: tutor?.tutor_id,
                status: 'accepted'
            }
        });

        const activeTuitions = tuitions + tuitionRequest;

        const pendingRequests = await prisma.tuitionRequest.count({
            where: {
                tutor_id: tutor?.tutor_id,
                status: 'pending'
            }
        });

        // TODO:change total hours
        const totalHours = activeTuitions * 4;

        //tuition per day chart data
        const schedules = await prisma.schedule.findMany({
            include: {
                Tuition: {
                    where: {
                        isDeleted: false,
                        selected_tutor: tutor?.tutor_id
                    }
                },
                TuitionRequest: {
                    where: {
                        tutor_id: tutor?.tutor_id,
                        status: "accepted"
                    }
                }
            },
        });

        // return schedules

        // Initialize an object to store the count of tuitions and requests per day
        const tuitionsPerDay: { [key: string]: { tuitions: number, requests: number } } = {};

        schedules.forEach(schedule => {
            schedule.days.forEach(day => {
                if (!tuitionsPerDay[day]) {
                    tuitionsPerDay[day] = { tuitions: 0, requests: 0 };
                }

                if (schedule.Tuition) {
                    tuitionsPerDay[day].tuitions++;
                }

                if (schedule.TuitionRequest) {
                    tuitionsPerDay[day].requests++;
                }
            });
        });

        const tuitionByDay = Object.keys(tuitionsPerDay).map(day => ({
            name: day,
            tuitions: tuitionsPerDay[day].tuitions + tuitionsPerDay[day].requests,
        }));

        //Upcoming tuitions
        const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
        const today = new Date();
        const currentDay = days[today.getDay()]; // Get current day in your specified format
        const currentTime = today.toTimeString().split(' ')[0]; // Get current time in HH:MM:SS format

        // Query to find the next upcoming tuitions
        const upcomingTuitions = await prisma.tuition.findMany({
            where: {
                AND: [
                    {
                        // schedule: {
                        //     days: {
                        //         has: currentDay, // Check if the current day is in the days array
                        //     },
                        // },
                    },
                    {
                        schedule: {
                            startTime: {
                                gt: currentTime, // Only consider tuitions that start after the current time
                            },
                        },
                    },
                    {
                        isDeleted: false, // Ensure the tuition is not deleted
                    },
                    {
                        selected_tutor: tutor?.tutor_id
                    }
                ],
            },
            orderBy: {
                schedule: {
                    startTime: 'asc', // Sort by start time
                },
            },
            select: {
                schedule: true,
                address: true,
                student: {
                    select: {
                        name: true,
                    }
                }
            },
        });

        // Query to find the next upcoming tuition requests
        const upcomingRequests = await prisma.tuitionRequest.findMany({
            where: {
                schedule: {
                    // days: {
                    //     has: currentDay, // Check if the current day is in the days array
                    // },
                    startTime: {
                        gt: currentTime, // Only consider requests that start after the current time
                    },
                },
                tutor_id: tutor?.tutor_id,
                status: 'accepted'
            },
            orderBy: {
                schedule: {
                    startTime: 'asc', // Sort by start time
                },
            },
            select: {
                schedule: true,
                address: true,
                student: {
                    select: {
                        name: true,
                    }
                }
            },
        });

        // Combine the results and sort them by start time
        const combinedResults = [...upcomingTuitions, ...upcomingRequests].sort((a, b) => {
            const aStartTime = a.schedule.startTime;
            const bStartTime = b.schedule.startTime;

            return aStartTime.localeCompare(bStartTime);
        });

        // Limit to the next three entries
        const nextThree = combinedResults.slice(0, 3);


        return {
            overview: {
                activeTuitions,
                pendingRequests,
                totalHours,
                tuitionByDay,
                upcomingTuition: nextThree
            }
        }
    }

};

export const dashboardServices = {
    getDashboardOverview
}