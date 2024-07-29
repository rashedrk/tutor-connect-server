import { Router } from "express";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";
import { profileControllers } from "./profile.controller";

const router = Router();

router.put('/details', auth(ROLE.student, ROLE.tutor), profileControllers.updateDetails);
router.put('/personalInfo', auth(ROLE.student, ROLE.tutor), profileControllers.updatePersonalInfo);

export const profileRoutes = router;