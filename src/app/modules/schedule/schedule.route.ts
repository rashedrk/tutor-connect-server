import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";

const router = Router();

router.post('/create', auth(ROLE.tutor), scheduleControllers.createSchedule)


export const scheduleRoutes = router;