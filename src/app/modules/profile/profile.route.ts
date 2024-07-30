import { Router } from "express";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";
import { profileControllers } from "./profile.controller";

const router = Router();

router.get('/', auth(ROLE.admin, ROLE.super_admin, ROLE.student, ROLE.tutor), profileControllers.getMyProfile);
router.put('/details', auth(ROLE.student, ROLE.tutor), profileControllers.updateDetails);
router.put('/personalInfo', auth(ROLE.student, ROLE.tutor), profileControllers.updatePersonalInfo);
router.put('/address', auth(ROLE.student, ROLE.tutor), profileControllers.updateAddress);
router.put('/academicInfo', auth(ROLE.tutor), profileControllers.updateAcademicInfo);
router.put('/othersInfo', auth(ROLE.tutor), profileControllers.updateOthersInfo);

export const profileRoutes = router;