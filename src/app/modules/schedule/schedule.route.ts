import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";

const router = Router();

router.post(
    '/create',
    auth(ROLE.tutor),
    scheduleControllers.createSchedule
);
router.get(
    '/',
    auth(ROLE.tutor),
    scheduleControllers.getAllSchedule
);
router.get(
    '/:scheduleId',
    auth(ROLE.tutor, ROLE.admin, ROLE.student, ROLE.super_admin), scheduleControllers.getAScheduleById
);
router.put(
    '/:scheduleId',
    auth(ROLE.tutor, ROLE.admin, ROLE.student, ROLE.super_admin), scheduleControllers.updateSchedule
)


export const scheduleRoutes = router;