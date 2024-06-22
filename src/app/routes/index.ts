import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { tutorRoutes } from "../modules/tutor/tutor.route";

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
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;