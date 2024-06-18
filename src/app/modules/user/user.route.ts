import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "@prisma/client";

const router = Router();

router.post('/create', userController.createUser);
router.get('/profile', auth(ROLE.admin, ROLE.super_admin, ROLE.student, ROLE.tutor), userController.getMyProfile)

export const userRoutes = router