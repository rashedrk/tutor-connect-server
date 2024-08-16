import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { tutorRoutes } from "../modules/tutor/tutor.route";
import { tuitionRoutes } from "../modules/tuition/tuition.route";
import { scheduleRoutes } from "../modules/schedule/schedule.route";
import { profileRoutes } from "../modules/profile/profile.route";
import { dashboardRoutes } from "../modules/dashboard/dashboard.route";

const router = Router();

//add all the routes here
const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/tutor',
        route: tutorRoutes
    },
    {
        path: '/tuition',
        route: tuitionRoutes
    },
    {
        path: '/schedule',
        route: scheduleRoutes
    },
    {
        path: '/profile',
        route: profileRoutes
    },
    {
        path: '/dashboard',
        route: dashboardRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;