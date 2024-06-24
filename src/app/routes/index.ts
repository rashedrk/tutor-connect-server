import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { tutorRoutes } from "../modules/tutor/tutor.route";
import { tuitionRoutes } from "../modules/tuition/tuition.route";

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;