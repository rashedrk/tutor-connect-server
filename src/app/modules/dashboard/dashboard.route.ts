import { Router } from "express";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";
import { dashboardControllers } from "./dashboard.controller";

const router = Router();

router.get('/', auth(ROLE.admin, ROLE.super_admin, ROLE.student, ROLE.tutor), dashboardControllers.getDashboardOverview);

export const dashboardRoutes = router;